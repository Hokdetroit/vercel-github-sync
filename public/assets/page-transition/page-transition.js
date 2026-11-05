/*
 * Page transition curtain, modelled on prismscience.org's "sticks curtain":
 * a WebGL ribbon field (flowing gradient strands + engraved line plate),
 * softened by a watercolour blur pass, wiped diagonally from the top-left over
 * the page on exit and erased in the same direction on the next page's load.
 */
(function () {
  if (window.__sePageTransition) return;
  window.__sePageTransition = true;

  var STORAGE_KEY = 'se-pt';
  var HOLD_CLASS = 'se-pt-hold';
  var COVER_MS = 900;
  var REVEAL_MS = 1050;
  var MARK_IN_DELAY = COVER_MS * 0.35;
  var MARK_FADE_MS = COVER_MS * 0.45;
  var MIN_MARK_MS = 350;
  var WIPE_START = -0.4;
  var WIPE_END = 1.06;
  var FEATHER = 0.16;
  var LEAD = 0.14;
  var DRIFT_START = 0.45;
  var MAX_WIDTH = 1600;

  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var root = document.documentElement;

  function easeInOut(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  var VERT = '#version 300 es\nvoid main(){vec2 p=vec2(float((gl_VertexID<<1)&2),float(gl_VertexID&2))*2.0-1.0;gl_Position=vec4(p,0.0,1.0);}';

  var NOISE = [
    'vec2 hash2(vec2 p){p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3)));return -1.0+2.0*fract(sin(p)*43758.5453123);}',
    'float gnoise(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.0-2.0*f);',
    'return mix(mix(dot(hash2(i),f),dot(hash2(i+vec2(1,0)),f-vec2(1,0)),u.x),mix(dot(hash2(i+vec2(0,1)),f-vec2(0,1)),dot(hash2(i+vec2(1,1)),f-vec2(1,1)),u.x),u.y);}'
  ].join('\n');

  var OKLAB = [
    'vec3 srgbToLinear(vec3 c){return mix(c/12.92,pow((c+0.055)/1.055,vec3(2.4)),step(vec3(0.04045),c));}',
    'vec3 linearToSrgb(vec3 c){c=max(c,0.0);return mix(c*12.92,1.055*pow(c,vec3(1.0/2.4))-0.055,step(vec3(0.0031308),c));}',
    'vec3 toLab(vec3 c){float l=0.4122214708*c.r+0.5363325363*c.g+0.0514459929*c.b;float m=0.2119034982*c.r+0.6806995451*c.g+0.1073969566*c.b;float s=0.0883024619*c.r+0.2817188376*c.g+0.6299787005*c.b;',
    'vec3 q=pow(max(vec3(l,m,s),0.0),vec3(1.0/3.0));return vec3(0.2104542553*q.x+0.7936177850*q.y-0.0040720468*q.z,1.9779984951*q.x-2.4285922050*q.y+0.4505937099*q.z,0.0259040371*q.x+0.7827717662*q.y-0.8086757660*q.z);}',
    'vec3 fromLab(vec3 lab){float l_=lab.x+0.3963377774*lab.y+0.2158037573*lab.z;float m_=lab.x-0.1055613458*lab.y-0.0638541728*lab.z;float s_=lab.x-0.0894841775*lab.y-1.2914855480*lab.z;',
    'vec3 q=vec3(l_*l_*l_,m_*m_*m_,s_*s_*s_);return vec3(4.0767416621*q.x-3.3077115913*q.y+0.2309699292*q.z,-1.2684380046*q.x+2.6097574011*q.y-0.3413193965*q.z,-0.0041960863*q.x-0.7034186147*q.y+1.7076147010*q.z);}'
  ].join('\n');

  // Studio Escrow palette: ink ground, deep navy -> brand blue -> pale sky ribbons.
  var SCENE = [
    '#version 300 es',
    'precision highp float;',
    'out vec4 outColor;',
    'uniform vec2 uRes;',
    'uniform float uWaveT,uColorT,uDrift;',
    'const float TAU=6.28318530718;',
    'const vec2 START=vec2(0.0,0.8957);',
    'const vec2 END=vec2(1.0286,1.2224);',
    'const float SPREAD=0.45,SOFTNESS=1.5,AMPLITUDE=3.2,FREQUENCY=0.2,LINE_COUNT=7.0;',
    'const float ENG_ANGLE=8.0,ENG_FREQ=90.0,ENG_RELIEF=0.6,ENG_WAVINESS=0.35,ENG_CONTRAST=1.4,ENG_OPACITY=0.08;',
    'const vec3 GROUND=vec3(0.043,0.051,0.071);',
    'const vec3 C0=vec3(0.118,0.227,0.541);',
    'const vec3 C1=vec3(0.145,0.388,0.922);',
    'const vec3 C2=vec3(0.576,0.773,0.992);',
    OKLAB,
    NOISE,
    'vec3 gradient(float t){t=clamp(t,0.0,1.0);vec3 a0=toLab(srgbToLinear(C0)),a1=toLab(srgbToLinear(C1)),a2=toLab(srgbToLinear(C2));',
    'vec3 lab=t<0.5?mix(a0,a1,t/0.5):mix(a1,a2,(t-0.5)/0.5);return linearToSrgb(fromLab(lab));}',
    'vec4 strands(vec2 uv){',
    '  float aspect=uRes.x/max(uRes.y,1e-6);',
    '  vec2 sp=vec2(START.x*aspect,1.0-START.y),ep=vec2(END.x*aspect,1.0-END.y);',
    '  vec2 auv=vec2(uv.x*aspect,uv.y);',
    '  vec2 dir=ep-sp;float len=max(length(dir),1e-6);vec2 nd=dir/len;vec2 perp=vec2(-nd.y,nd.x);',
    '  vec2 rel=auv-sp;float progress=dot(rel,nd)/len;float perpDist=dot(rel,perp);',
    '  float softness=SOFTNESS*0.08+0.0008;',
    '  vec3 acc=vec3(0.0);float accW=0.0;',
    '  float waveBase=progress*TAU*FREQUENCY,shimBase=progress*8.0+uWaveT*2.0,colorBase=progress+uColorT;',
    '  for(int idx=0;idx<7;idx++){',
    '    float fi=float(idx),norm=fi/(LINE_COUNT-1.0),phase=fi*0.9;',
    '    float strandT=uWaveT*(norm*0.6+0.7);',
    '    float wave=sin(waveBase+strandT+phase)+sin(waveBase*2.1-strandT*0.7+phase)*0.5;',
    '    float centre=(norm-0.5)*SPREAD+wave*AMPLITUDE*0.06+uDrift*(1.0+norm*0.35);',
    '    float line=1.0-smoothstep(0.0,softness,abs(perpDist-centre));',
    '    float shimmer=sin(shimBase+fi)*0.15+0.85;',
    '    float coord=1.0-abs(fract((colorBase+norm)*0.5)*2.0-1.0);',
    '    float w=line*shimmer;acc+=gradient(coord)*w;accW+=w;',
    '  }',
    '  return vec4(acc/max(accW,1e-4),clamp(accW,0.0,1.0));',
    '}',
    'float plate(vec2 p,float level,float aa){float a=radians(ENG_ANGLE);float w=p.x*-sin(a)+p.y*cos(a);',
    '  float v=cos(w*ENG_FREQ*TAU+ENG_RELIEF*level*9.42);float thr=mix(-1.15,1.15,clamp(level,0.0,1.0));return smoothstep(thr-aa,thr+aa,v);}',
    'vec3 overlay(vec3 b,vec3 s){return mix(2.0*b*s,1.0-2.0*(1.0-b)*(1.0-s),step(vec3(0.5),b));}',
    'void main(){',
    '  vec2 uv=vec2(1.0-gl_FragCoord.x/uRes.x,gl_FragCoord.y/uRes.y);',
    '  float aspect=uRes.x/max(uRes.y,1e-6);',
    '  vec4 st=strands(uv);',
    '  vec3 col=mix(GROUND,st.rgb,st.a);',
    '  float lum=dot(col,vec3(0.299,0.587,0.114));',
    '  float level=clamp(0.5+(lum-0.5)*ENG_CONTRAST,0.0,1.0);',
    '  vec2 pa=vec2(uv.x*aspect,uv.y);',
    '  vec2 p=pa+vec2(gnoise(pa*3.1),gnoise(pa*3.1+vec2(7.31,3.77)))*(ENG_WAVINESS*0.06);',
    '  float aa=clamp(ENG_FREQ*TAU/max(uRes.y,1.0),0.02,1.0);',
    '  float cover=plate(p,level,aa);',
    '  col=mix(col,overlay(col,mix(vec3(1.0),vec3(0.0),cover)),ENG_OPACITY);',
    '  outColor=vec4(col,1.0);',
    '}'
  ].join('\n');

  var WATER = [
    '#version 300 es',
    'precision highp float;',
    'out vec4 outColor;',
    'uniform sampler2D uTex;',
    'uniform vec2 uRes;',
    'uniform float uWipe,uFeather,uLead,uErase;',
    'const float RADIUS=3.0,PAPER=0.05;',
    NOISE,
    'void main(){',
    '  vec2 frag=gl_FragCoord.xy;vec2 uv=frag/uRes;',
    '  vec2 base=frag+vec2(gnoise(uv*12.0),gnoise(uv*12.0+vec2(4.7,9.1)))*RADIUS;',
    '  vec3 sum=vec3(0.0);float wsum=0.0;',
    '  for(int i=0;i<12;i++){float a=6.28318530718*float(i)/12.0;',
    '    for(int r=1;r<=2;r++){float rad=RADIUS*float(r)/2.0;float w=1.0/(1.0+rad);',
    '      sum+=texture(uTex,(base+vec2(cos(a),sin(a))*rad)/uRes).rgb*w;wsum+=w;}}',
    '  vec3 col=sum/wsum;',
    '  float grain=gnoise(frag*0.9)*0.5+0.5;',
    '  col=mix(col,col*(0.85+0.3*grain),PAPER);',
    '  float d=(uv.x+(1.0-uv.y))*0.5;',
    '  float lum=clamp((dot(col,vec3(0.299,0.587,0.114))-0.12)/0.5,0.0,1.0);',
    '  float edge=uWipe+lum*uLead;',
    '  float behind=1.0-smoothstep(edge,edge+uFeather,d);',
    '  float alpha=mix(behind,1.0-behind,uErase);',
    '  outColor=vec4(col*alpha,alpha);',
    '}'
  ].join('\n');

  function compile(gl, type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn('[page-transition] shader error', gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }

  function program(gl, frag) {
    var v = compile(gl, gl.VERTEX_SHADER, VERT);
    var f = compile(gl, gl.FRAGMENT_SHADER, frag);
    if (!v || !f) return null;
    var p = gl.createProgram();
    gl.attachShader(p, v);
    gl.attachShader(p, f);
    gl.linkProgram(p);
    gl.deleteShader(v);
    gl.deleteShader(f);
    return gl.getProgramParameter(p, gl.LINK_STATUS) ? p : null;
  }

  var el = document.createElement('div');
  el.className = 'se-pt';
  el.setAttribute('aria-hidden', 'true');
  el.innerHTML =
    '<canvas class="se-pt__canvas"></canvas>' +
    '<div class="se-pt__mark" role="status" aria-label="Loading"><span class="se-pt__word">Studio Escrow</span><span class="se-pt__bar"></span></div>';
  var canvas = el.querySelector('canvas');
  var mark = el.querySelector('.se-pt__mark');

  var gl = null;
  var scene = null;
  var water = null;
  var tex = null;
  var fbo = null;
  var u = {};
  var size = { w: 0, h: 0 };
  var state = { wipe: WIPE_START, drift: DRIFT_START, erase: 0 };
  var waveT = 0;
  var colorT = 0;
  var lastFrame = 0;
  var rafId = 0;
  var tween = null;

  function initGL() {
    gl = canvas.getContext('webgl2', { antialias: false, alpha: true, premultipliedAlpha: true });
    if (!gl) return false;
    scene = program(gl, SCENE);
    water = program(gl, WATER);
    if (!scene || !water) {
      gl = null;
      return false;
    }
    tex = gl.createTexture();
    fbo = gl.createFramebuffer();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    u = {
      sRes: gl.getUniformLocation(scene, 'uRes'),
      sWave: gl.getUniformLocation(scene, 'uWaveT'),
      sColor: gl.getUniformLocation(scene, 'uColorT'),
      sDrift: gl.getUniformLocation(scene, 'uDrift'),
      wTex: gl.getUniformLocation(water, 'uTex'),
      wRes: gl.getUniformLocation(water, 'uRes'),
      wWipe: gl.getUniformLocation(water, 'uWipe'),
      wFeather: gl.getUniformLocation(water, 'uFeather'),
      wLead: gl.getUniformLocation(water, 'uLead'),
      wErase: gl.getUniformLocation(water, 'uErase')
    };
    canvas.addEventListener('webglcontextlost', function (e) {
      e.preventDefault();
      gl = null;
    });
    resize();
    return true;
  }

  function resize() {
    if (!gl) return;
    var vw = Math.max(1, window.innerWidth);
    var vh = Math.max(1, window.innerHeight);
    var scale = Math.min(1, MAX_WIDTH / vw);
    var w = Math.ceil(vw * scale);
    var h = Math.ceil(vh * scale);
    if (w === size.w && h === size.h) return;
    size = { w: w, h: h };
    canvas.width = w;
    canvas.height = h;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  }

  function draw() {
    if (!gl) return;
    gl.viewport(0, 0, size.w, size.h);
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.useProgram(scene);
    gl.uniform2f(u.sRes, size.w, size.h);
    gl.uniform1f(u.sWave, waveT);
    gl.uniform1f(u.sColor, colorT);
    gl.uniform1f(u.sDrift, state.drift);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(water);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.uniform1i(u.wTex, 0);
    gl.uniform2f(u.wRes, size.w, size.h);
    gl.uniform1f(u.wWipe, state.wipe);
    gl.uniform1f(u.wFeather, FEATHER);
    gl.uniform1f(u.wLead, LEAD);
    gl.uniform1f(u.wErase, state.erase);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function frame(now) {
    var dt = Math.min((now - (lastFrame || now)) / 1000, 1 / 30);
    lastFrame = now;
    waveT += dt * 0.28;
    colorT += dt * 0.55;
    if (tween) {
      var t = Math.min(1, (now - tween.start) / tween.duration);
      var k = easeInOut(t);
      state.wipe = tween.from.wipe + (tween.to.wipe - tween.from.wipe) * k;
      state.drift = tween.from.drift + (tween.to.drift - tween.from.drift) * k;
      if (t >= 1) {
        var done = tween.done;
        tween = null;
        done();
      }
    }
    draw();
    rafId = requestAnimationFrame(frame);
  }

  function startLoop() {
    if (rafId) return;
    lastFrame = 0;
    rafId = requestAnimationFrame(frame);
  }

  function stopLoop() {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }

  function animate(to, duration) {
    return new Promise(function (resolve) {
      tween = {
        start: performance.now(),
        duration: duration,
        from: { wipe: state.wipe, drift: state.drift },
        to: to,
        done: resolve
      };
    });
  }

  function fadeMark(opacity, delay, duration) {
    mark.style.transition = 'opacity ' + duration + 'ms cubic-bezier(0.65, 0, 0.35, 1) ' + delay + 'ms';
    mark.style.opacity = String(opacity);
  }

  function wait(ms) {
    return new Promise(function (r) {
      setTimeout(r, ms);
    });
  }

  var covering = false;

  function cover() {
    covering = true;
    el.classList.add('is-active');
    if (!gl) {
      el.classList.add('is-fallback');
      requestAnimationFrame(function () {
        el.classList.add('is-covered');
      });
      fadeMark(1, 150, 250);
      return wait(450);
    }
    state.wipe = WIPE_START;
    state.drift = DRIFT_START;
    state.erase = 0;
    resize();
    startLoop();
    fadeMark(1, MARK_IN_DELAY, MARK_FADE_MS);
    return animate({ wipe: WIPE_END, drift: 0 }, COVER_MS).then(function () {
      return wait(Math.max(0, MARK_IN_DELAY + MARK_FADE_MS + MIN_MARK_MS - COVER_MS));
    });
  }

  function reveal() {
    el.classList.add('is-active');
    root.classList.remove(HOLD_CLASS);
    if (!gl) {
      el.classList.add('is-fallback', 'is-covered');
      mark.style.opacity = '1';
      requestAnimationFrame(function () {
        el.classList.remove('is-covered');
        fadeMark(0, 0, 250);
      });
      return wait(500).then(hide);
    }
    state.wipe = WIPE_START;
    state.drift = 0;
    state.erase = 1;
    mark.style.transition = 'none';
    mark.style.opacity = '1';
    resize();
    draw();
    startLoop();
    return wait(MIN_MARK_MS).then(function () {
      fadeMark(0, 0, MARK_FADE_MS);
      return animate({ wipe: WIPE_END, drift: -DRIFT_START }, REVEAL_MS);
    }).then(hide);
  }

  function hide() {
    stopLoop();
    tween = null;
    covering = false;
    el.classList.remove('is-active', 'is-covered', 'is-fallback');
    mark.style.transition = 'none';
    mark.style.opacity = '0';
    root.classList.remove(HOLD_CLASS);
  }

  function shouldIntercept(e, a) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false;
    if (!a || !a.href || a.hasAttribute('download') || a.hasAttribute('data-no-transition')) return false;
    var target = a.getAttribute('target');
    if (target && target !== '_self') return false;
    var url;
    try {
      url = new URL(a.href, location.href);
    } catch (err) {
      return false;
    }
    if (url.origin !== location.origin) return false;
    if (url.pathname === location.pathname && url.search === location.search) return false;
    if (offsitePaths[url.pathname.replace(/\/+$/, '') || '/']) return false;
    if (/\.(pdf|zip|png|jpe?g|webp|svg|mp4|webm)$/i.test(url.pathname)) return false;
    return url;
  }

  function onClick(e) {
    if (covering) {
      e.preventDefault();
      return;
    }
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    var url = shouldIntercept(e, a);
    if (!url) return;
    e.preventDefault();
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch (err) {}
    cover().then(function () {
      location.href = url.href;
    });
  }

  // Paths that redirect to another site can't play the reveal, so they navigate without the curtain.
  var offsitePaths = {};
  fetch('/assets/page-transition/offsite-paths.json')
    .then(function (r) {
      return r.ok ? r.json() : [];
    })
    .then(function (list) {
      list.forEach(function (p) {
        offsitePaths[p] = true;
      });
    })
    .catch(function () {});

  function mount() {
    document.body.appendChild(el);
    if (!reducedMotion) initGL();

    var pending = false;
    try {
      pending = sessionStorage.getItem(STORAGE_KEY) === '1';
      sessionStorage.removeItem(STORAGE_KEY);
    } catch (err) {}

    if (pending && !reducedMotion) {
      reveal();
    } else {
      root.classList.remove(HOLD_CLASS);
    }

    if (!reducedMotion) document.addEventListener('click', onClick);
    window.addEventListener('resize', resize);
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) hide();
    });
  }

  if (document.body) mount();
  else document.addEventListener('DOMContentLoaded', mount, { once: true });
})();

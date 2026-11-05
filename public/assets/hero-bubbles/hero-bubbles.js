/*
 * Hero bubbles: a dependency-free WebGL port of the raymarched metaball
 * "clouds" from the clearwater.london hero. Five spheres (three top-left,
 * two bottom-right) are smooth-unioned and shaded with a matcap texture.
 */
(function () {
  var MATCAP_URL = "/assets/hero-bubbles/matcap.png";
  var FOV = 27.5;
  var CAMERA_Z = 6;
  var Y_OFFSET = -0.8;

  var VERT =
    "attribute vec2 aPos;varying vec2 vUv;" +
    "void main(){vUv=aPos*0.5+0.5;gl_Position=vec4(aPos,0.0,1.0);}";

  var FRAG = [
    "precision highp float;",
    "varying vec2 vUv;",
    "uniform sampler2D tMatcap;",
    "uniform float uAspect;",
    "uniform float uTanFov;",
    "uniform vec2 uCamRot;",
    "uniform vec4 uLA;uniform vec4 uLB;uniform vec4 uLC;",
    "uniform vec4 uRA;uniform vec4 uRB;uniform vec4 uCur;",
    "float smin(float a,float b,float k){return -k*log2(exp2(-a/k)+exp2(-b/k));}",
    "float sph(vec3 p,vec4 s){return length(p-s.xyz)-s.w;}",
    "float scene(vec3 p){",
    "  float l=smin(smin(sph(p,uLA),sph(p,uLB),0.1),sph(p,uLC),0.1);",
    "  float r=smin(sph(p,uRA),sph(p,uRB),0.1);",
    "  return smin(sph(p,uCur),smin(l,r,0.1),0.1);",
    "}",
    "vec3 nrm(vec3 p){vec2 e=vec2(0.001,0.0);return normalize(vec3(",
    "  scene(p+e.xyy)-scene(p-e.xyy),scene(p+e.yxy)-scene(p-e.yxy),scene(p+e.yyx)-scene(p-e.yyx)));}",
    "vec2 matcap(vec3 eye,vec3 n){vec3 r=reflect(eye,n);float m=2.8284271247461903*sqrt(r.z+1.0);return r.xy/m+0.5;}",
    "mat3 rotY(float a){float c=cos(a),s=sin(a);return mat3(c,0.,-s,0.,1.,0.,s,0.,c);}",
    "mat3 rotX(float a){float c=cos(a),s=sin(a);return mat3(1.,0.,0.,0.,c,s,0.,-s,c);}",
    "void main(){",
    "  vec2 uv=vUv*2.0-1.0;uv.x*=uAspect;",
    "  vec3 ro=vec3(0.0,0.0," + CAMERA_Z.toFixed(1) + ");",
    "  vec3 rd=normalize(rotY(uCamRot.x)*rotX(uCamRot.y)*vec3(uv*uTanFov,-1.0));",
    "  float t=0.0;",
    "  for(int i=0;i<50;i++){",
    "    vec3 p=ro+t*rd;float d=scene(p);",
    "    if(d<0.01){",
    "      vec3 col=texture2D(tMatcap,matcap(rd,nrm(p))).rgb;",
    "      float depth=clamp((1.0-pow(t,1.1)/45.0)*1.2,0.0,1.0);",
    "      gl_FragColor=vec4(col*depth,1.0);return;",
    "    }",
    "    if(t>10.0)break;",
    "    t+=d;",
    "  }",
    "  gl_FragColor=vec4(0.0);",
    "}",
  ].join("\n");

  function compile(gl, type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn("[hero-bubbles] shader error:", gl.getShaderInfoLog(s));
      return null;
    }
    return s;
  }

  function damp(a, b, lambda, dt) {
    return a + (b - a) * (1 - Math.exp(-lambda * dt));
  }

  function easeOutExpo(x) {
    return x >= 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }

  function init(host) {
    if (host.querySelector(".hero-bubbles")) return;
    var canvas = document.createElement("canvas");
    canvas.className = "hero-bubbles";
    canvas.setAttribute("aria-hidden", "true");
    host.insertBefore(canvas, host.firstChild);

    var gl = canvas.getContext("webgl", { alpha: true, antialias: false, premultipliedAlpha: false });
    if (!gl) {
      canvas.remove();
      return;
    }

    var vs = compile(gl, gl.VERTEX_SHADER, VERT);
    var fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return canvas.remove();
    var prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    var u = {};
    ["tMatcap", "uAspect", "uTanFov", "uCamRot", "uLA", "uLB", "uLC", "uRA", "uRB", "uCur"].forEach(function (n) {
      u[n] = gl.getUniformLocation(prog, n);
    });

    var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([230, 178, 120, 255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.uniform1i(u.tMatcap, 0);

    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var visible = true;
    var raf = 0;
    var start = performance.now();
    var last = start;
    var mouse = { x: 0, y: 0, inside: false };
    var eased = { x: 0, y: 0, cur: 0 };

    var img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () {
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      canvas.classList.add("is-ready");
      if (reduced) frame(start + 4000);
    };
    img.src = MATCAP_URL;

    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 1.25, 1400 / Math.max(1, canvas.clientWidth));
      var w = Math.max(1, Math.round(canvas.clientWidth * dpr));
      var h = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      var aspect = w / h;
      var vfov = 2 * Math.atan(Math.tan((FOV * Math.PI) / 360) / aspect);
      gl.uniform1f(u.uAspect, aspect);
      gl.uniform1f(u.uTanFov, Math.tan(vfov / 2));
      return aspect;
    }

    function reveal(t, delay) {
      return 1 - easeOutExpo(Math.max(0, Math.min(1, (t - delay) / 2.2)));
    }

    function sphere(loc, x, y, z, r, transition, parallax) {
      gl.uniform4f(loc, x, y - transition * parallax, z, r * (1 - Math.abs(transition)));
    }

    function frame(now) {
      var dt = Math.min(0.1, (now - last) / 1000);
      last = now;
      var t = (now - start) / 1000;
      var aspect = resize();

      eased.x = damp(eased.x, mouse.x, 2.5, dt);
      eased.y = damp(eased.y, mouse.y, 2.5, dt);
      eased.cur = damp(eased.cur, mouse.inside && !reduced ? 1 : 0, 4, dt);
      gl.uniform2f(u.uCamRot, eased.x * 0.035, -eased.y * 0.025);

      var sA = 0.05 + 0.05 * Math.cos(t);
      var sR = 0.05 + 0.05 * Math.sin(t);
      var o = Y_OFFSET;
      sphere(u.uLA, -1.7, 1.1 + o - 0.05 * Math.sin(t), -0.1 * Math.cos(t), 0.7 + sA, reveal(t, 0.1), -0.6);
      sphere(u.uLB, -0.75, 1.8 + o - 0.05 * Math.cos(t), 0, 0.4, reveal(t, 0.25), -0.6);
      sphere(u.uLC, -1.2, 1.65 + o - 0.05 * Math.sin(1.5 * t), -2 - 0.25 * Math.cos(t), 0.5, reveal(t, 0.4), -0.6);
      sphere(u.uRA, 2.1, 0.125 + o - 0.05 * Math.sin(t), -0.15 * Math.cos(t), 0.7 + sR, reveal(t, 0.2), 0.6);
      sphere(u.uRB, 0.975 - (0.15 * Math.sin(t) - 0.15), -0.05 + o, -0.15 * Math.sin(t), 0.4, reveal(t, 0.35), 0.6);

      var halfW = Math.tan((FOV * Math.PI) / 360) * CAMERA_Z;
      gl.uniform4f(u.uCur, mouse.x * halfW, (mouse.y * halfW) / aspect, 0, 0.12 * eased.cur);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced && visible) raf = requestAnimationFrame(frame);
    }

    function play() {
      if (reduced || raf) return;
      last = performance.now();
      raf = requestAnimationFrame(function (n) {
        raf = 0;
        frame(n);
      });
    }

    function stop() {
      cancelAnimationFrame(raf);
      raf = 0;
    }

    host.addEventListener("pointermove", function (e) {
      var r = host.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouse.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
      mouse.inside = e.pointerType === "mouse";
    });
    host.addEventListener("pointerleave", function () {
      mouse.inside = false;
    });

    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      visible ? play() : stop();
    }).observe(host);

    document.addEventListener("visibilitychange", function () {
      document.hidden ? stop() : visible && play();
    });

    if (reduced) {
      window.addEventListener("resize", function () {
        frame(start + 4000);
      });
    }
    play();
  }

  function boot() {
    document.querySelectorAll("[data-hero-bubbles], .wrapper_home-hero").forEach(init);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();

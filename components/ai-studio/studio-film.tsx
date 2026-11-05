'use client'

import { useRef, useState } from 'react'
import s from './studio.module.css'

export function StudioFilm() {
  const video = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const [error, setError] = useState(false)
  async function play() {
    setStarted(true)
    try { await video.current?.play() } catch { setError(true) }
  }
  return <div className={s.film}>
    <video ref={video} controls={started} playsInline preload="none" poster="/ai-studio/studio-poster.jpg" aria-label="Original AI Studio promotional film" onError={() => setError(true)}><source src="/ai-studio/studio-film.mp4" type="video/mp4" />Your browser does not support embedded video.</video>
    {!started && <button type="button" className={s.playButton} onClick={play}>Watch the film <small>00:20</small></button>}
    {error && <p className={s.videoError}>Unable to start playback. Use the player controls or <a href="/ai-studio/studio-film.mp4">open the video directly</a>.</p>}
  </div>
}

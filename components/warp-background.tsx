"use client"

import { useEffect, useRef } from "react"

export function WarpBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let stars: Star[] = []
    let width = 0
    let height = 0

    class Star {
      x: number
      y: number
      length: number
      speed: number
      opacity: number

      constructor() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.length = Math.random() * 100 + 30
        this.speed = Math.random() * 5 + 2
        this.opacity = Math.random() * 0.5 + 0.1
      }

      update() {
        this.x += this.speed
        this.y -= this.speed

        if (this.x - this.length > width || this.y + this.length < 0) {
          if (Math.random() > 0.5) {
            this.x = Math.random() * width
            this.y = height + this.length
          } else {
            this.x = -this.length
            this.y = Math.random() * height
          }
          this.length = Math.random() * 100 + 30
          this.speed = Math.random() * 5 + 2
        }
      }

      draw() {
        if (!ctx) return
        ctx.beginPath()
        ctx.moveTo(this.x, this.y)
        ctx.lineTo(this.x - this.length, this.y + this.length)
        ctx.strokeStyle = `rgba(168, 85, 247, ${this.opacity})`
        ctx.lineWidth = 2
        ctx.stroke()
      }
    }

    const initStars = () => {
      stars = []
      const numStars = Math.floor((width * height) / 15000)
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star())
      }
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        width = entry.contentRect.width
        height = entry.contentRect.height
        canvas.width = width
        canvas.height = height
        initStars()
      }
    })

    resizeObserver.observe(canvas)

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      stars.forEach((star) => {
        star.update()
        star.draw()
      })
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      resizeObserver.disconnect()
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
    />
  )
}

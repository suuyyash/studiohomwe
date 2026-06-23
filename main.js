import './style.css'
import './pdp.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

document.addEventListener('DOMContentLoaded', () => {

  // Master Load Sequence and Page Transition
  const overlay = document.querySelector('.page-transition-overlay')
  if (overlay) {
    const tl = gsap.timeline()
    
    // 1. Fade out black screen
    tl.to(overlay, {
      opacity: 0,
      duration: 1.0,
      ease: 'power2.inOut',
      onComplete: () => { overlay.style.pointerEvents = 'none' }
    }, 0)

    // 2. Dramatic Image Zoom Out
    const heroImg = document.querySelector('.hero-bg-img')
    if (heroImg) {
      tl.to(heroImg, {
        scale: 1,
        duration: 2.5,
        ease: 'power3.out'
      }, 0)
      
      // Dedicated Hero Parallax
      gsap.to(heroImg, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })
    }

    // 3. Stagger Text Reveal
    const heroLines = document.querySelectorAll('.hero-text-line')
    if (heroLines.length > 0) {
      tl.to(heroLines, {
        y: '0%',
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out'
      }, 0.5)
    }

    // 4. Fade Up UI Elements
    tl.to(['.hero-subtext', '.hero-btns', '.scroll-indicator'], {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power2.out'
    }, 1.5)
  }

  // Page Transition Fade Out on Click
  const links = document.querySelectorAll('a[href]:not([href^="#"])')
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.target === '_blank' || link.ctrlKey || link.metaKey) return
      
      e.preventDefault()
      const targetUrl = link.href
      const overlay = document.querySelector('.page-transition-overlay')

      if (overlay) {
        // Unblock pointer events immediately to block further clicks
        overlay.style.pointerEvents = 'auto'
        gsap.to(overlay, {
          opacity: 1,
          duration: 0.8,
          ease: 'power3.inOut',
          onComplete: () => {
            window.location.href = targetUrl
          }
        })
      } else {
        // Fallback if overlay is missing
        window.location.href = targetUrl
      }
    })
  })

  // Theme Toggle Logic
  const themeToggle = document.getElementById('theme-toggle')
  if (themeToggle) {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark'
    
    // Set initial icon
    themeToggle.innerHTML = currentTheme === 'light' 
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'

    themeToggle.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme') || 'dark'
      let newTheme = theme === 'dark' ? 'light' : 'dark'
      
      document.documentElement.setAttribute('data-theme', newTheme)
      localStorage.setItem('theme', newTheme)
      
      themeToggle.innerHTML = newTheme === 'light' 
        ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>'
        : '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>'
    })
  }

  // Initialize Lenis Smooth Scroll
  const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  })

  lenis.on('scroll', ScrollTrigger.update)

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  gsap.ticker.lagSmoothing(0)

  // Custom Cursor
  const cursorDot = document.querySelector('.cursor-dot')
  const cursorRing = document.querySelector('.cursor-ring')
  const hoverTargets = document.querySelectorAll('.hover-target, .btn, a, .category-card')

  if (cursorDot && cursorRing) {
    let xToDot = gsap.quickTo(cursorDot, "left", {duration: 0.1, ease: "power3"})
    let yToDot = gsap.quickTo(cursorDot, "top", {duration: 0.1, ease: "power3"})
    let xToRing = gsap.quickTo(cursorRing, "left", {duration: 0.3, ease: "power3"})
    let yToRing = gsap.quickTo(cursorRing, "top", {duration: 0.3, ease: "power3"})

    window.addEventListener('mousemove', (e) => {
      xToDot(e.clientX)
      yToDot(e.clientY)
      xToRing(e.clientX)
      yToRing(e.clientY)
    })

    hoverTargets.forEach(target => {
      target.addEventListener('mouseenter', () => {
        cursorRing.classList.add('active')
        cursorDot.style.opacity = '0'
      })
      target.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('active')
        cursorDot.style.opacity = '1'
      })
    })
  }

  // Navbar background on scroll
  const navbar = document.querySelector('.navbar')
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled')
      } else {
        navbar.classList.remove('scrolled')
      }
    })
  }

  // Cinematic Parallax (Images with data-speed)
  const parallaxImages = document.querySelectorAll('[data-speed]')
  parallaxImages.forEach(img => {
    const speed = parseFloat(img.getAttribute('data-speed')) || 1.1
    gsap.to(img, {
      yPercent: (speed - 1) * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: img.parentElement,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
  })

  // Horizontal Scroll for Showcase Collections
  const horizontalSection = document.querySelector('.showcase')
  const horizontalWrapper = document.querySelector('.horizontal-scroll-wrapper')
  
  if (horizontalSection && horizontalWrapper) {
    gsap.to(horizontalWrapper, {
      x: () => -(horizontalWrapper.scrollWidth - window.innerWidth) + "px",
      ease: "none",
      scrollTrigger: {
        trigger: horizontalSection,
        pin: true,
        scrub: 1,
        start: "top top",
        end: () => "+=" + (horizontalWrapper.scrollWidth - window.innerWidth),
        invalidateOnRefresh: true
      }
    })
  }

  // Fade up sections
  const sections = document.querySelectorAll('section:not(.hero)')
  sections.forEach(sec => {
    gsap.fromTo(sec, 
      { opacity: 0, y: 50 },
      {
        opacity: 1, 
        y: 0,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sec,
          start: 'top 85%'
        }
      }
    )
  })

  // Intro Counters
  const counters = document.querySelectorAll('.counter-item h4')
  counters.forEach(counter => {
    const targetText = counter.innerText
    const isPlus = targetText.includes('+')
    const isK = targetText.includes('k')
    const targetNum = parseInt(targetText.replace(/[^0-9]/g, ''))
    
    gsap.fromTo(counter, 
      { innerText: 0 },
      {
        innerText: targetNum,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: counter,
          start: 'top 85%'
        },
        snap: { innerText: 1 },
        onUpdate: function() {
          counter.innerHTML = Math.round(this.targets()[0].innerText) + (isPlus ? '+' : '') + (isK ? 'k' : '')
        }
      }
    )
  })

})

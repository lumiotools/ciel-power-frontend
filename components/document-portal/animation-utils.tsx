"use client"

import { useEffect } from "react"

export function useHighlightAnimation() {
  // Update the useEffect that handles scrolling and animations to apply animations only to the main container
  useEffect(() => {
    // Check if there's a hash in the URL
    if (typeof window !== "undefined") {
      const hash = window.location.hash
      if (hash) {
        // Remove the # character
        const id = hash.substring(1)
        // Find the element with the ID
        const element = document.getElementById(id)
        // If the element exists, scroll to it
        if (element) {
          setTimeout(() => {
            // Center the element in the viewport
            element.scrollIntoView({ behavior: "smooth", block: "center" })

            // Store original styles to restore later
            const originalBorder = element.style.border
            const originalBoxShadow = element.style.boxShadow
            const originalPosition = element.style.position
            const originalZIndex = element.style.zIndex

            // Set position to relative to ensure z-index works properly
            element.style.position = "relative"
            element.style.zIndex = "10"

            // Add highlight and animation effects to the main container only
            element.classList.add("highlight-section")
            element.classList.add("flash-stroke")
            element.classList.add("card-click-animation")

            // Ensure the element has a border that can be animated
            element.style.border = "2px solid rgba(139, 195, 74, 0.3)"

            // Remove classes after animations complete
            setTimeout(() => {
              element.classList.remove("highlight-section")
              element.classList.remove("flash-stroke")
              element.classList.remove("card-click-animation")

              // Restore original styles
              element.style.border = originalBorder
              element.style.boxShadow = originalBoxShadow
              element.style.position = originalPosition
              element.style.zIndex = originalZIndex
            }, 3000)
          }, 300)
        }
      }
    }
  }, [])

  // Update the animation styles to ensure the flash stroke is prominent
  useEffect(() => {
    // Add a style tag for the animations if it doesn't exist
    if (typeof window !== "undefined" && !document.getElementById("highlight-style")) {
      const style = document.createElement("style")
      style.id = "highlight-style"
      style.innerHTML = `
    @keyframes highlight {
      0% { background-color: rgba(139, 195, 74, 0.1); }
      50% { background-color: rgba(139, 195, 74, 0.2); }
      100% { background-color: rgba(139, 195, 74, 0.1); }
    }
    
    @keyframes flashStroke {
      0% { 
        box-shadow: 0 0 0 0 rgba(139, 195, 74, 0.7), 
                    0 0 0 0 rgba(139, 195, 74, 0.4),
                    inset 0 0 0 0 rgba(139, 195, 74, 0.4); 
      }
      50% { 
        box-shadow: 0 0 0 10px rgba(139, 195, 74, 0.3), 
                    0 0 0 20px rgba(139, 195, 74, 0.1),
                    inset 0 0 10px 0 rgba(139, 195, 74, 0.2); 
      }
      100% { 
        box-shadow: 0 0 0 0 rgba(139, 195, 74, 0), 
                    0 0 0 0 rgba(139, 195, 74, 0),
                    inset 0 0 0 0 rgba(139, 195, 74, 0); 
      }
    }
    
    @keyframes cardClick {
      0% { transform: scale(1); }
      50% { transform: scale(0.98); }
      100% { transform: scale(1); }
    }
    
    @keyframes visibleStroke {
      0% { border-color: rgba(139, 195, 74, 0.5); border-width: 2px; }
      50% { border-color: rgba(139, 195, 74, 1); border-width: 4px; }
      100% { border-color: rgba(139, 195, 74, 0.5); border-width: 2px; }
    }
    
    .highlight-section {
      animation: highlight 3s ease-out;
    }
    
    .flash-stroke {
      animation: flashStroke 1s ease-out, visibleStroke 1s ease-out;
      animation-iteration-count: 3;
      filter: drop-shadow(0 0 8px rgba(139, 195, 74, 0.5));
    }
    
    .card-click-animation {
      animation: cardClick 0.5s ease-out;
      animation-iteration-count: 2;
      transform-origin: center;
    }
  `
      document.head.appendChild(style)
    }
  }, [])
}

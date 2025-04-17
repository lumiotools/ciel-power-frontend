import jsPDF from "jspdf"
import html2canvas from "html2canvas"

// Define page configuration
const PAGE_CONFIG = {
  format: "a4",
  orientation: "portrait",
  unit: "mm",
  margins: {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5,
  },
}

// Helper function to wait for a specified time
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Helper function to switch to a specific tab
const switchToTab = async (tabName: string): Promise<void> => {
  console.log(`Attempting to switch to tab: ${tabName}`)
  const tabButtons = document.querySelectorAll("button[class*='relative py-4 px-6']")

  console.log(`Found ${tabButtons.length} tab buttons`)

  for (const button of tabButtons) {
    const buttonText = button.textContent?.trim() || ""
    console.log(`Button text: "${buttonText}"`)

    if (buttonText.toLowerCase().includes(tabName.toLowerCase())) {
      console.log(`Found matching tab: ${buttonText}`)
      // Click the button to switch to this tab
      button.click()
      // Wait for the tab content to render
      await wait(1000) // Increased wait time for content to fully render
      return
    }
  }

  console.warn(`Tab "${tabName}" not found`)
}

// Helper function to scroll to an element
const scrollToElement = async (elementId: string): Promise<void> => {
  const element = document.getElementById(elementId)
  if (!element) {
    console.warn(`Element with ID "${elementId}" not found for scrolling`)
    return
  }

  // Scroll the element into view
  element.scrollIntoView({ behavior: "auto", block: "start" })

  // Wait for the scroll to complete
  await wait(500)
}

// Helper function to capture an element as an image
const captureElement = async (elementId: string, waitTime = 500): Promise<HTMLCanvasElement | null> => {
  console.log(`Attempting to capture element with ID: ${elementId}`)

  // Wait for animations to complete
  await wait(waitTime)

  // Scroll to the element to ensure it's in view
  await scrollToElement(elementId)

  const element = document.getElementById(elementId)
  if (!element) {
    console.warn(`Element with ID "${elementId}" not found`)
    return null
  }

  try {
    // Make sure the element is visible for capture
    const originalDisplay = element.style.display
    if (originalDisplay === "none") {
      element.style.display = "block"
    }

    // Ensure animations are complete
    if (elementId === "summary-of-concerns" || elementId.includes("motion")) {
      console.log(`Waiting extra time for animated element: ${elementId}`)
      await wait(2000) // Extra wait for animated elements
    }

    console.log(`Capturing element: ${elementId}`)
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Enable CORS for images
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
    })

    // Restore original display
    if (originalDisplay === "none") {
      element.style.display = "none"
    }

    console.log(`Successfully captured element: ${elementId}`)
    return canvas
  } catch (error) {
    console.error(`Error capturing element with ID "${elementId}":`, error)
    return null
  }
}

// Helper function to capture the Home component inside air-changes-per-hour
const captureAirChangesHome = async (): Promise<HTMLCanvasElement | null> => {
  console.log("Attempting to capture Home component inside air-changes-per-hour")

  // Make sure we're on the Air Leakage tab
  await switchToTab("Air Leakage Reports")
  await wait(1000)

  // Find the air-changes-per-hour element
  const airChangesElement = document.getElementById("air-changes-per-hour")
  if (!airChangesElement) {
    console.warn("air-changes-per-hour element not found")
    return null
  }

  try {
    // Create a new canvas element
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    // Set canvas dimensions to match the element
    const rect = airChangesElement.getBoundingClientRect()
    canvas.width = rect.width * 2 // Higher resolution
    canvas.height = rect.height * 2

    if (!ctx) {
      console.error("Could not get canvas context")
      return null
    }

    // Fill with white background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // First, capture the text content without the SVG
    const textCanvas = await html2canvas(airChangesElement, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      ignoreElements: (element) => element.tagName.toLowerCase() === "svg",
    })

    // Draw the text content onto our canvas
    ctx.drawImage(textCanvas, 0, 0)

    // Find the position where the house icon should be
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2

    // Draw a house icon manually
    // This is a simplified version of a house with up/down arrows
    ctx.save()

    // Draw house outline - using dark blue color
    ctx.strokeStyle = "#0033A0" // Dark blue color
    ctx.lineWidth = 6 // Thicker lines to match the image

    // House outline
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - 30) // Top point
    ctx.lineTo(centerX - 30, centerY) // Left corner
    ctx.lineTo(centerX - 30, centerY + 30) // Left bottom
    ctx.lineTo(centerX + 30, centerY + 30) // Right bottom
    ctx.lineTo(centerX + 30, centerY) // Right corner
    ctx.lineTo(centerX, centerY - 30) // Back to top
    ctx.stroke()

    // Door
    ctx.beginPath()
    ctx.rect(centerX - 10, centerY + 10, 20, 20) // Door positioned in the lower part of the house
    ctx.stroke()

    // Up arrow - red
    ctx.strokeStyle = "#FF0000" // Red color
    ctx.fillStyle = "#FF0000"
    ctx.lineWidth = 3
    // Arrow stick
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - 45) // Start point (below the arrowhead)
    ctx.lineTo(centerX, centerY - 70) // End point (above the house)
    ctx.stroke()
    // Arrow head
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - 70) // Arrow tip
    ctx.lineTo(centerX - 8, centerY - 60) // Left corner
    ctx.lineTo(centerX + 8, centerY - 60) // Right corner
    ctx.closePath()
    ctx.fill()

    // Down arrow - green
    ctx.strokeStyle = "#00CC00" // Green color
    ctx.fillStyle = "#00CC00"
    ctx.lineWidth = 3
    // Arrow stick
    ctx.beginPath()
    ctx.moveTo(centerX, centerY + 45) // Start point (above the arrowhead)
    ctx.lineTo(centerX, centerY + 70) // End point (below the house)
    ctx.stroke()
    // Arrow head
    ctx.beginPath()
    ctx.moveTo(centerX, centerY + 70) // Arrow tip
    ctx.lineTo(centerX - 8, centerY + 60) // Left corner
    ctx.lineTo(centerX + 8, centerY + 60) // Right corner
    ctx.closePath()
    ctx.fill()

    ctx.restore()

    // Draw the gauge
    // Find the gauge element
    const gaugeElement =
      airChangesElement.querySelector(".gauge") ||
      airChangesElement.querySelector("svg:not(.house-icon)") ||
      airChangesElement.querySelectorAll("svg")[1]

    if (gaugeElement) {
      try {
        const gaugeCanvas = await html2canvas(gaugeElement as HTMLElement, {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          backgroundColor: "transparent",
        })

        // Draw the gauge on the right side
        ctx.drawImage(gaugeCanvas, centerX + 50, centerY - gaugeCanvas.height / 2)
      } catch (gaugeError) {
        console.error("Error capturing gauge:", gaugeError)
      }
    }

    console.log("Successfully created air-changes-per-hour canvas with manual house icon")
    return canvas
  } catch (error) {
    console.error("Error creating air-changes-per-hour canvas:", error)

    // Fallback to standard capture as last resort
    try {
      console.log("Falling back to standard capture")
      return await html2canvas(airChangesElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
      })
    } catch (fallbackError) {
      console.error("Fallback capture also failed:", fallbackError)
      return null
    }
  }
}

// Get section color based on section name
const getSectionColor = (section: string): { r: number; g: number; b: number } => {
  switch (section) {
    case "overview":
      return { r: 132, g: 204, b: 22 } // lime-500
    case "airLeakage":
    case "air-leakage":
      return { r: 37, g: 99, b: 235 } // blue-600
    case "insulation":
      return { r: 20, g: 184, b: 166 } // teal-500
    case "heating":
    case "cooling":
      return { r: 245, g: 158, b: 11 } // amber-500
    case "summary":
      return { r: 249, g: 115, b: 22 } // orange-500
    default:
      return { r: 0, g: 0, b: 0 } // black
  }
}

// Helper function to add a section heading to the PDF
const addSectionHeading = (pdf: jsPDF, title: string, section: string): void => {
  const pageWidth = pdf.internal.pageSize.getWidth()

  // Get section color
  const color = getSectionColor(section)

  // Set font style for heading
  pdf.setFont("helvetica", "bold")
  pdf.setFontSize(16)

  // Add heading text
  pdf.setTextColor(color.r, color.g, color.b) // Section color
  pdf.text(title, pageWidth / 2, 15, { align: "center" })

  // Add underline
  pdf.setDrawColor(color.r, color.g, color.b) // Section color
  pdf.line(20, 18, pageWidth - 20, 18)

  // Reset font to normal
  pdf.setFont("helvetica", "normal")
  pdf.setFontSize(12)
  pdf.setTextColor(0, 0, 0) // Reset to black
}

// Helper function to add multiple canvases to a single PDF page with minimal spacing
const addCanvasesToPage = (pdf: jsPDF, canvases: HTMLCanvasElement[], startY = 20): void => {
  if (canvases.length === 0) return

  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()

  // Calculate margins in points
  const margins = {
    top: PAGE_CONFIG.margins.top,
    right: PAGE_CONFIG.margins.right,
    bottom: PAGE_CONFIG.margins.bottom,
    left: PAGE_CONFIG.margins.left,
  }

  // Calculate available width and height
  const availableWidth = pageWidth - margins.left - margins.right

  // Reduced spacing between elements - even smaller now
  const spacing = 2 // Reduced from 5 to 2

  let currentY = startY

  // Add each canvas to the page
  for (let i = 0; i < canvases.length; i++) {
    const canvas = canvases[i]
    const imgWidth = canvas.width
    const imgHeight = canvas.height

    // Calculate scale to fit width while maintaining aspect ratio
    // Slightly smaller scale to fit more content
    const widthRatio = (availableWidth - 5) / imgWidth // Reduced padding from 10 to 5

    // Scale height proportionally but with a slight compression to fit more content
    const scaledWidth = imgWidth * widthRatio
    const scaledHeight = imgHeight * widthRatio * 0.95 // Slight vertical compression

    // Center horizontally - ensure proper margins on both sides
    const x = (pageWidth - scaledWidth) / 2

    // Check if we need to start a new page - more aggressive about fitting content
    if (i > 0 && currentY + scaledHeight > pageHeight - margins.bottom - 2) {
      // Reduced bottom margin buffer
      pdf.addPage()
      currentY = margins.top
    }

    const imgData = canvas.toDataURL("image/png")
    pdf.addImage(imgData, "PNG", x, currentY, scaledWidth, scaledHeight, undefined, "FAST")

    // Update Y position for next canvas with minimal spacing
    currentY += scaledHeight + spacing
  }
}

// Format section name for display
const formatSectionName = (section: string): string => {
  switch (section) {
    case "overview":
      return "Overview"
    case "airLeakage":
    case "air-leakage":
      return "Air Leakage"
    case "insulation":
      return "Insulation"
    case "heating":
      return "Heating Systems"
    case "cooling":
      return "Cooling Systems"
    case "summary":
      return "Report Summary"
    default:
      return section.charAt(0).toUpperCase() + section.slice(1)
  }
}

// Get the actual tab name as it appears in the UI
const getTabDisplayName = (section: string): string => {
  switch (section) {
    case "overview":
      return "Overview"
    case "airLeakage":
    case "air-leakage":
      return "Air Leakage Reports"
    case "insulation":
      return "Insulation Reports"
    case "heating":
      return "Heating Reports"
    case "cooling":
      return "Cooling Reports"
    case "summary":
      return "Report Summary"
    default:
      return section.charAt(0).toUpperCase() + section.slice(1)
  }
}

// Main function to generate the PDF report
const handleDownloadReport = async (): Promise<void> => {
  // Store the current active tab to return to it later
  const currentActiveTab =
    document.querySelector("button[class*='relative py-4 px-6'][class*='text-']")?.textContent || "Overview"

  try {
    // Create loading indicator
    const loadingDiv = document.createElement("div")
    loadingDiv.style.position = "fixed"
    loadingDiv.style.top = "0"
    loadingDiv.style.left = "0"
    loadingDiv.style.width = "100%"
    loadingDiv.style.height = "100%"
    loadingDiv.style.backgroundColor = "rgba(255, 255, 255, 0.8)"
    loadingDiv.style.display = "flex"
    loadingDiv.style.justifyContent = "center"
    loadingDiv.style.alignItems = "center"
    loadingDiv.style.zIndex = "9999"
    loadingDiv.innerHTML = `
      <div style="text-align: center;">
        <div style="border: 4px solid #f3f3f3; border-top: 4px solid #5cb85c; border-radius: 50%; width: 50px; height: 50px; animation: spin 2s linear infinite; margin: 0 auto;"></div>
        <p style="margin-top: 10px; font-family: sans-serif;">Generating PDF report...</p>
        <p style="font-family: sans-serif;" id="pdf-progress">Processing page 1...</p>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `
    document.body.appendChild(loadingDiv)

    // Initialize PDF
    const pdf = new jsPDF({
      orientation: PAGE_CONFIG.orientation as any,
      unit: PAGE_CONFIG.unit,
      format: PAGE_CONFIG.format,
    })

    // Set PDF properties
    pdf.setProperties({
      title: "Home Energy Audit Report",
      subject: "Energy Audit Report",
      author: "Ciel Power",
      creator: "Ciel Power Report Generator",
    })

    // Define the report structure based on the specified requirements
    // Updated section names to match actual tab names and reorganized pages to fit more content per page
    const reportStructure = [
      // Overview - Combined more elements per page
      {
        section: "overview",
        pages: [
          { ids: ["about-ciel-power", "goals-of-the-audit", "about-new-whole-home-energy-solutions-program"] },
          { ids: ["house-system"] },
        ],
      },

      // Air Leakage - Combined introduction with air-flow-rates
      {
        section: "airLeakage",
        pages: [
          { ids: ["introduction", "air-flow-rates", "air-changes-per-hour"] }, // Combined all three
          { ids: ["common-air-leak-points"] },
        ],
      },

      // Insulation - Combined more elements per page
      {
        section: "insulation",
        pages: [
          { ids: ["insulation-overview", "technical-aspects", "insulation-benefits"] },
          { ids: ["insulation-kneewall", "insulation-exterior-wall", "insulation-crawlspace"] }, // Combined three elements
          { ids: ["insulation-rim-joist", "insulation-overhang"] }, // Combined two elements
        ],
      },

      // Heating - Include header with system-1 only
      {
        section: "heating",
        pages: [
          { ids: ["heating-header", "heating-system-1"] }, // Only include heating-system-1 after header
        ],
      },

      // Cooling - Include header with first cooling system
      {
        section: "cooling",
        pages: [
          { ids: ["cooling-header", "cooling-system-1"] }, // Include cooling-header with first cooling system
        ],
      },

      // Report Summary - Combined more elements and put project-costs and tax-credits on the same page
      {
        section: "summary",
        pages: [
          { ids: ["summary-of-concerns", "solutions-and-recommendations"] }, // Combined these two
          { ids: ["future-solutions", "environmental-impact"] }, // Combined these two
          { ids: ["project-costs", "tax-credits"] }, // Combined project-costs and tax-credits on the same page
        ],
      },
    ]

    let pageCount = 0

    // Process each section in the report structure
    for (const section of reportStructure) {
      // Update progress indicator
      const progressElement = document.getElementById("pdf-progress")
      if (progressElement) {
        progressElement.textContent = `Processing ${formatSectionName(section.section)} section...`
      }

      // Switch to the section tab using the display name
      console.log(`Switching to section: ${section.section}`)
      await switchToTab(getTabDisplayName(section.section))

      // Wait for content to render
      await wait(1500) // Increased wait time

      // Add section heading only once at the beginning of the section
      if (pageCount > 0) {
        pdf.addPage()
      }

      // Add the section heading
      addSectionHeading(pdf, formatSectionName(section.section), section.section)

      // Process each page in the section
      for (let pageIndex = 0; pageIndex < section.pages.length; pageIndex++) {
        const page = section.pages[pageIndex]

        // Update progress
        if (progressElement) {
          progressElement.textContent = `Processing ${formatSectionName(section.section)} page ${pageIndex + 1}...`
        }

        // If this isn't the first page in the section, add a new page
        if (pageIndex > 0) {
          pdf.addPage()

          // Don't add section heading for subsequent pages
        }

        // Capture elements for this page
        const pageCanvases: HTMLCanvasElement[] = []

        for (const id of page.ids) {
          console.log(`Processing element with ID: ${id}`)

          // Special handling for air-changes-per-hour
          if (id === "air-changes-per-hour") {
            console.log("Special handling for air-changes-per-hour")

            // Use the specialized function to capture the Home component
            const airChangesCanvas = await captureAirChangesHome()

            if (airChangesCanvas) {
              pageCanvases.push(airChangesCanvas)
              console.log("Successfully added air-changes-per-hour to PDF")
            } else {
              console.error("Failed to capture air-changes-per-hour")
            }

            continue
          }

          // Use longer wait time for summary section elements
          const waitTime = section.section === "summary" ? 2000 : 500
          const canvas = await captureElement(id, waitTime)
          if (canvas) {
            pageCanvases.push(canvas)
          }
        }

        // Add canvases for this page
        if (pageCanvases.length > 0) {
          addCanvasesToPage(pdf, pageCanvases, 22) // Reduced top margin from 25 to 22
          pageCount++
        }
      }

      // Handle special cases for dynamic content
      if (section.section === "insulation") {
        // Handle insulation zones (exactly 3 per page)
        const insulationZoneElements = document.querySelectorAll('[id^="insulation-zone-"]')

        console.log(`Found ${insulationZoneElements.length} insulation zone elements`)

        if (insulationZoneElements.length > 0) {
          // Add a subsection heading
          pdf.addPage()
          addSectionHeading(pdf, "Insulation Zones", section.section)

          // Process zones in groups of exactly 3
          for (let i = 0; i < insulationZoneElements.length; i += 3) {
            const zoneCanvases: HTMLCanvasElement[] = []

            // Capture up to 3 zones for this page
            for (let j = 0; j < 3 && i + j < insulationZoneElements.length; j++) {
              // Update progress
              if (progressElement) {
                progressElement.textContent = `Processing insulation zone ${i + j + 1}...`
              }

              // Capture zone
              const canvas = await captureElement(insulationZoneElements[i + j].id)
              if (canvas) {
                zoneCanvases.push(canvas)
              }
            }

            // Add the zones to the page
            if (zoneCanvases.length > 0) {
              addCanvasesToPage(pdf, zoneCanvases, 22) // Reduced top margin
              pageCount++
            }

            // Add a new page if there are more zones
            if (i + 3 < insulationZoneElements.length) {
              pdf.addPage()
            }
          }
        }
      } else if (section.section === "heating") {
        console.log("Processing heating systems")

        // Find the first heating system after heating-system-1
        const nextHeatingSystem = document.querySelector(
          '[id^="heating-system-"]:not([id="heating-system-1"]):not([id="heating-system-water-heater"])',
        ) as HTMLElement

        if (nextHeatingSystem) {
          // Add a new page for the next heating system
          pdf.addPage()

          // Update progress
          if (progressElement) {
            progressElement.textContent = `Processing additional heating system...`
          }

          // Capture the heating system
          const canvas = await captureElement(nextHeatingSystem.id)
          if (canvas) {
            addCanvasesToPage(pdf, [canvas], 22) // Reduced top margin
            pageCount++
          }
        }

        // Handle water heater separately
        const waterHeater = document.getElementById("heating-system-water-heater")
        if (waterHeater) {
          // Add a new page for the water heater
          pdf.addPage()
          addSectionHeading(pdf, "Water Heating System", section.section)

          // Update progress
          if (progressElement) {
            progressElement.textContent = `Processing water heating system...`
          }

          // Capture the water heater
          const canvas = await captureElement("heating-system-water-heater")
          if (canvas) {
            addCanvasesToPage(pdf, [canvas], 22) // Reduced top margin
            pageCount++
          }
        }
      } else if (section.section === "cooling") {
        console.log("Processing cooling systems")

        // Find additional cooling systems (not the first one)
        const additionalCoolingSystems = document.querySelectorAll(
          '[id^="cooling-system-"]:not([id="cooling-system-1"])',
        )

        console.log(`Found ${additionalCoolingSystems.length} additional cooling systems`)

        if (additionalCoolingSystems.length > 0) {
          // Add a new page for additional cooling systems
          pdf.addPage()
          addSectionHeading(pdf, "Additional Cooling Systems", section.section)

          // Process each additional cooling system
          for (let i = 0; i < additionalCoolingSystems.length; i++) {
            // Update progress
            if (progressElement) {
              progressElement.textContent = `Processing additional cooling system ${i + 1}...`
            }

            // Capture the cooling system
            const canvas = await captureElement(additionalCoolingSystems[i].id)
            if (canvas) {
              addCanvasesToPage(pdf, [canvas], 22) // Reduced top margin
              pageCount++
            }

            // Add a new page if there are more cooling systems
            if (i < additionalCoolingSystems.length - 1) {
              pdf.addPage()
            }
          }
        }
      }
    }

    // Update progress
    const progressElement = document.getElementById("pdf-progress")
    if (progressElement) {
      progressElement.textContent = "Finalizing PDF..."
    }

    // Save the PDF
    const fileName = `Ciel_Power_Energy_Audit_Report_${new Date().toISOString().split("T")[0]}.pdf`
    pdf.save(fileName)

    // Remove loading indicator
    document.body.removeChild(loadingDiv)

    // Return to the overview tab
    await switchToTab("Overview")
  } catch (error) {
    console.error("Error generating PDF:", error)
    alert("An error occurred while generating the PDF. Please try again.")

    // Remove loading indicator if it exists
    const loadingDiv = document.querySelector('div[style*="position: fixed"]')
    if (loadingDiv && loadingDiv.parentNode) {
      loadingDiv.parentNode.removeChild(loadingDiv)
    }

    // Return to the overview tab even if there was an error
    await switchToTab("Overview")
  }
}

export default handleDownloadReport

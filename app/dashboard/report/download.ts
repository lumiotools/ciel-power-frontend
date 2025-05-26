import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Define report section types
export type ReportSection =
  | "overview"
  | "airLeakage"
  | "insulation"
  | "heating"
  | "cooling"
  | "summary";

// Report configuration interface
export interface ReportConfig {
  selectedSections?: ReportSection[];
  customFileName?: string;
  includePageNumbers?: boolean;
  includeBookmarks?: boolean;
}

// Define page configuration with proper TypeScript types
const PAGE_CONFIG: {
  format: string;
  orientation: "portrait" | "landscape";
  unit: "mm" | "cm" | "in" | "px" | "pt" | "pc" | "em" | "ex";
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
} = {
  format: "a4",
  orientation: "portrait",
  unit: "mm",
  margins: {
    top: 8,
    right: 8,
    bottom: 12,
    left: 8,
  },
};

// Helper function to wait for a specified time
const wait = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to switch to a specific tab
const switchToTab = async (tabName: string): Promise<void> => {
  console.log(`Switching to tab: ${tabName}`);
  const tabButtons = document.querySelectorAll(
    "button[class*='relative py-4 px-6']"
  );

  for (const button of tabButtons) {
    const buttonText = button.textContent?.trim() || "";
    if (buttonText.toLowerCase().includes(tabName.toLowerCase())) {
      button.click();
      // Wait for the tab content to render - reduced for better performance
      await wait(800);

      // Add a small additional wait for more complex tabs that might need more time
      if (tabName === "Insulation" || tabName === "Report Summary") {
        await wait(200);
      }

      return;
    }
  }

  console.warn(`Tab "${tabName}" not found`);
};

// Helper function to capture an element as an image with optimized dimensions
const captureElement = async (
  elementId: string
): Promise<HTMLCanvasElement | null> => {
  try {
    // Reduced wait time for better performance
    await wait(300);

    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`Element with ID "${elementId}" not found`);
      return null;
    }

    // Debug element found
    console.log(`Element found: ${elementId}`);

    // Scroll the element into view
    element.scrollIntoView({ behavior: "auto", block: "start" });
    await wait(200);

    // Dynamically adjust scale based on element size for better fit
    let scaleValue = 1.4; // Default scale

    // If element is very tall, reduce scale further to fit more per page
    const elementHeight = element.offsetHeight;
    if (elementHeight > 800) {
      scaleValue = 1.3;
    } else if (elementHeight < 300) {
      // For very small elements, we can maintain a slightly higher resolution
      scaleValue = 1.45;
    }

    console.log(
      `Capturing ${elementId} with height ${elementHeight} and scale ${scaleValue}`
    );

    // Capture the element with optimized scale
    const canvas = await html2canvas(element, {
      scale: scaleValue,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      // Optimize image rendering
      imageTimeout: 0, // Don't timeout on images
      removeContainer: true, // Remove the temporary container to save memory
    });

    console.log(`Successfully captured ${elementId}`);
    return canvas;
  } catch (error) {
    console.error(`Error capturing element with ID "${elementId}":`, error);
    return null;
  }
};

// Replace the existing getSectionColor function with the new one
const getSectionColor = (section: string): string => {
  switch (section.toLowerCase()) {
    case "overview":
      return "#67B502"; // lime-500
    case "airleakage":
      return "#031A82"; // blue-600
    case "insulation":
      return "#256C68"; // teal-500
    case "heating":
    case "cooling":
      return "#B18C2E"; // amber-500
    case "summary":
      return "#FF6700"; // orange-500
    default:
      return "#000000"; // black
  }
};

// Update the addSectionHeading function to use hex colors
const addSectionHeading = (
  pdf: jsPDF,
  title: string,
  section: string,
  includeBookmarks = true
): void => {
  const pageWidth = pdf.internal.pageSize.getWidth();

  // Get section color as hex
  const colorHex = getSectionColor(section);

  // Convert hex to RGB for jsPDF
  const r = Number.parseInt(colorHex.slice(1, 3), 16);
  const g = Number.parseInt(colorHex.slice(3, 5), 16);
  const b = Number.parseInt(colorHex.slice(5, 7), 16);

  // Set font style for heading
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);

  // Add heading text positioned slightly higher
  pdf.setTextColor(r, g, b);
  pdf.text(title, pageWidth / 2, 13, { align: "center" });

  // Add underline closer to the text
  pdf.setDrawColor(r, g, b);
  pdf.line(20, 15.5, pageWidth - 20, 15.5);

  // Add bookmark for the section if bookmarks are enabled
  addBookmark(pdf, title, includeBookmarks);

  // Reset font to normal
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.setTextColor(0, 0, 0);
};

// Helper function to add an image to the PDF
const addImageToPDF = (
  pdf: jsPDF,
  canvas: HTMLCanvasElement,
  startY = 20,
  section?: string
): number => {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margins = PAGE_CONFIG.margins;

  // Calculate available width
  const availableWidth = pageWidth - margins.left - margins.right;

  // Calculate scale to fit width while maintaining aspect ratio
  // Apply a slight reduction factor to ensure better fit
  const widthRatio = (availableWidth / canvas.width) * 0.95;
  const scaledWidth = canvas.width * widthRatio;
  const scaledHeight = canvas.height * widthRatio;

  // Center horizontally
  const x = (pageWidth - scaledWidth) / 2;

  // Check if element would fit on current page with tighter tolerance
  // Use 98% of available height to maximize space usage
  const availableHeight = pageHeight - margins.bottom - startY;
  if (scaledHeight > availableHeight * 0.98) {
    // Only if the element is not too small, start a new page
    // This prevents unnecessary page breaks for small elements
    if (scaledHeight > 15) {
      pdf.addPage();
      startY = margins.top;
      // Add page number to the new page
      addPageNumber(pdf, true);
    }
  }

  // Add the image with compression for smaller file size
  const imgData = canvas.toDataURL("image/jpeg", 0.85); // Use JPEG with 85% quality
  pdf.addImage(
    imgData,
    "JPEG",
    x,
    startY,
    scaledWidth,
    scaledHeight,
    undefined,
    "FAST"
  );

  // Return the new Y position with adjusted gap based on section
  // Remove gap for insulation sections
  if (section === "insulation") {
    return startY + scaledHeight; // No additional gap for insulation
  } else {
    return startY + scaledHeight + 3; // Regular gap for other sections
  }
};

// Replace the existing addPageNumber function with this improved version
const addPageNumber = (pdf: jsPDF, includePageNumbers = true): void => {
  if (!includePageNumbers) return;

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Get current page number
  const pageNum = pdf.getNumberOfPages();

  // Save the current state
  const currentFontSize = pdf.getFontSize();
  const currentTextColor = pdf.getTextColor();
  const currentFont = pdf.getFont();

  // Set font style for page numbers
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(100, 100, 100); // Gray color for page numbers

  // Add page number to the current page
  pdf.setPage(pageNum);
  pdf.text(`Page ${pageNum}`, pageWidth / 2, pageHeight - 5, {
    align: "center",
  });

  // Restore the previous state
  pdf.setFontSize(currentFontSize);
  pdf.setTextColor(currentTextColor);
  pdf.setFont(currentFont.fontName, currentFont.fontStyle);
};
const addBookmark = (
  pdf: jsPDF,
  title: string,
  includeBookmarks = true
): void => {
  if (!includeBookmarks) return;

  try {
    // Get current page number
    const currentPage = pdf.getNumberOfPages();

    // Method 1: Using outline.add (newer versions)
    if (pdf.outline && typeof pdf.outline.add === "function") {
      pdf.outline.add(null, title, { pageNumber: currentPage });
      console.log(`Added bookmark '${title}' using outline.add method`);
      return;
    }

    // Method 2: Using addBookmark (some versions)
    if (typeof (pdf as any).addBookmark === "function") {
      (pdf as any).addBookmark(title, currentPage - 1);
      console.log(`Added bookmark '${title}' using addBookmark method`);
      return;
    }

    // Method 3: Using bookmark plugin (older versions)
    if (typeof (pdf as any).bookmark === "function") {
      (pdf as any).bookmark(title, { pageNumber: currentPage });
      console.log(`Added bookmark '${title}' using bookmark plugin method`);
      return;
    }

    // If we get here, couldn't add bookmark
    console.warn(
      `Could not add bookmark '${title}': No compatible method found`
    );
  } catch (error) {
    console.error(`Error adding bookmark '${title}':`, error);
  }
};

// Format section name for display
const formatSectionName = (section: string): string => {
  switch (section) {
    case "overview":
      return "Overview";
    case "airLeakage":
    case "air-leakage":
      return "Air Leakage";
    case "insulation":
      return "Insulation";
    case "heating":
      return "Heating Systems";
    case "cooling":
      return "Cooling Systems";
    case "summary":
      return "Report Summary";
    default:
      return section.charAt(0).toUpperCase() + section.slice(1);
  }
};

// Main function to generate the PDF report
const handleDownloadReport = async (config?: ReportConfig): Promise<void> => {
  try {
    // Default configuration if none provided
    const reportConfig: Required<ReportConfig> = {
      selectedSections: config?.selectedSections || [
        "overview",
        "airLeakage",
        "insulation",
        "heating",
        "cooling",
        "summary",
      ],
      customFileName:
        config?.customFileName ||
        `Ciel_Power_Energy_Audit_Report_${new Date().toISOString().split("T")[0]}`,
      includePageNumbers: config?.includePageNumbers !== false, // Default to true
      includeBookmarks: config?.includeBookmarks !== false, // Default to true
    };

    // Create loading indicator
    const loadingDiv = document.createElement("div");
    loadingDiv.style.position = "fixed";
    loadingDiv.style.top = "0";
    loadingDiv.style.left = "0";
    loadingDiv.style.width = "100%";
    loadingDiv.style.height = "100%";
    loadingDiv.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
    loadingDiv.style.display = "flex";
    loadingDiv.style.justifyContent = "center";
    loadingDiv.style.alignItems = "center";
    loadingDiv.style.zIndex = "9999";
    loadingDiv.innerHTML = `
      <div style="text-align: center;">
        <div style="border: 4px solid #f3f3f3; border-top: 4px solid #5cb85c; border-radius: 50%; width: 50px; height: 50px; animation: spin 2s linear infinite; margin: 0 auto;"></div>
        <p style="margin-top: 10px; font-family: sans-serif;">Generating PDF report...</p>
        <p style="font-family: sans-serif;" id="pdf-progress">Processing...</p>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
    document.body.appendChild(loadingDiv);

    // Inside handleDownloadReport function:

    // Initialize PDF with proper options
    const pdf = new jsPDF({
      orientation: PAGE_CONFIG.orientation,
      unit: PAGE_CONFIG.unit,
      format: PAGE_CONFIG.format,
      compress: true, // Enable compression for smaller file size
      putOnlyUsedFonts: true, // Optimize font embedding
    });

    // Add this function right after the PDF initialization
    // Helper function to ensure page numbers are added to all pages
    const ensurePageNumbers = (
      pdf: jsPDF,
      includePageNumbers: boolean
    ): void => {
      if (!includePageNumbers) return;

      // Get the total number of pages
      const totalPages = pdf.getNumberOfPages();

      // Add page numbers to each page
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        // Save the current state
        const currentFontSize = pdf.getFontSize();
        const currentTextColor = pdf.getTextColor();
        const currentFont = pdf.getFont();

        // Set font style for page numbers
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.setTextColor(100, 100, 100); // Gray color for page numbers

        // Add page number
        pdf.text(`Page ${i}`, pageWidth / 2, pageHeight - 5, {
          align: "center",
        });

        // Restore the previous state
        pdf.setFontSize(currentFontSize);
        pdf.setTextColor(currentTextColor);
        pdf.setFont(currentFont.fontName, currentFont.fontStyle);
      }
    };

    // Set PDF properties
    pdf.setProperties({
      title: "Home Energy Audit Report",
      subject: "Energy Audit Report",
      author: "Ciel Power",
      creator: "Ciel Power Report Generator",
    });

    // Enable display mode for better viewing
    pdf.setDisplayMode("fullwidth");

    // Explicitly initialize the outline for bookmarks if enabled
    if (reportConfig.includeBookmarks) {
      // Different versions of jsPDF might use different methods
      // Try both common approaches

      // Method 1: For newer jsPDF versions
      if (typeof pdf.outline === "undefined") {
        pdf.outline = { createNamedDestinations: true };
      }

      // Method 2: For some versions that need explicit initialization
      if (typeof pdf.initOutline === "function") {
        pdf.initOutline();
      }

      console.log("PDF bookmarks enabled and initialized");
    }
    // Update progress indicator
    const updateProgress = (message: string): void => {
      const progressElement = document.getElementById("pdf-progress");
      if (progressElement) {
        progressElement.textContent = message;
      }
    };
    // Add this as a separate function

    // Helper function to add bookmarks that works with multiple jsPDF versions

    // Define the report structure based on the specified requirements
    // Using the exact groupings as specified
    const allReportSections = [
      // Overview - Regrouped elements as requested
      {
        section: "overview" as ReportSection,
        tabName: "Introduction",
        pages: [
          { ids: ["about-ciel-power", "goals-of-the-audit"] },
          {
            ids: [
              "about-new-whole-home-energy-solutions-program",
              "house-system",
            ],
          },
        ],
      },

      // Air Leakage - Combined introduction with air-flow-rates
      {
        section: "airLeakage" as ReportSection,
        tabName: "Air Leakage",
        pages: [
          { ids: ["introduction", "air-flow-rates", "air-changes-per-hour"] },
          { ids: ["common-air-leak-points"] },
        ],
      },

      // Insulation - Regrouped elements as requested
      {
        section: "insulation" as ReportSection,
        tabName: "Insulation",
        pages: [
          {
            ids: [
              "insulation-overview",
              "technical-aspects",
              "insulation-benefits",
            ],
          },
          // Removed the commented out lines with the no-longer-needed IDs
        ],
      },

      // Heating - Include header with system-1 only
      {
        section: "heating" as ReportSection,
        tabName: "Heating",
        pages: [{ ids: ["heating-header"] }],
      },

      // Cooling - Include header with first cooling system
      {
        section: "cooling" as ReportSection,
        tabName: "Cooling",
        pages: [{ ids: ["cooling-header"] }],
      },

      // Report Summary - Combined more elements and put project-costs and tax-credits on the same page
      {
        section: "concerns" as ReportSection,
        tabName: "Concerns",
        pages: [
          { ids: ["summary-of-concerns", "solutions-and-recommendations"] },
          { ids: ["future-solutions", "environmental-impact"] },
          { ids: ["project-costs", "tax-credits"] },
        ],
      },
      {
        section: "solutions" as ReportSection,
        tabName: "Solutions",
        pages: [
          { ids: ["summary-of-concerns", "solutions-and-recommendations"] },
          { ids: ["future-solutions", "environmental-impact"] },
          { ids: ["project-costs", "tax-credits"] },
        ],
      },
    ];

    // Filter sections based on configuration
    const reportStructure = allReportSections.filter((section) =>
      reportConfig.selectedSections.includes(section.section)
    );

    let pageCount = 0;

    // Process each section in the report structure with optimized rendering
    for (const section of reportStructure) {
      // Update progress indicator
      updateProgress(
        `Processing ${formatSectionName(section.section)} section...`
      );

      // Switch to the section tab using the display name
      console.log(`Switching to section: ${section.section}`);
      await switchToTab(section.tabName);

      // Wait for content to render - reduced for better performance
      await wait(600);

      // Add section heading only once at the beginning of the section
      if (pageCount > 0) {
        pdf.addPage();
      }
      // Add the section title
      const sectionTitle = formatSectionName(section.section);
      console.log(`Adding section heading and bookmark: ${sectionTitle}`);

      // Add the section heading with bookmark option from config
      addSectionHeading(
        pdf,
        sectionTitle,
        section.section,
        reportConfig.includeBookmarks
      );

      // Add page number to the first page if page numbers are enabled
      if (pageCount === 0 && reportConfig.includePageNumbers) {
        addPageNumber(pdf, reportConfig.includePageNumbers);
      }

      pageCount++;

      // Process each page in the section
      for (let pageIndex = 0; pageIndex < section.pages.length; pageIndex++) {
        const page = section.pages[pageIndex];

        // If this isn't the first page in the section, add a new page
        if (pageIndex > 0) {
          pdf.addPage();
          if (reportConfig.includePageNumbers) {
            addPageNumber(pdf, reportConfig.includePageNumbers);
          }
          pageCount++;
        }

        // Current Y position for adding elements
        // Reduce top margin for insulation sections
        let currentY = section.section === "insulation" ? 16 : 18;

        // Capture and add each element for this page
        for (const id of page.ids) {
          updateProgress(`Processing ${id}...`);

          const canvas = await captureElement(id);
          if (canvas) {
            // Pass the section name to addImageToPDF
            currentY = addImageToPDF(pdf, canvas, currentY, section.section);
          }
        }

        // Handle special cases for dynamic content
        // Updated insulation zone handling code
        if (section.section === "insulation") {
          // Handle insulation zones that use a dynamic ID pattern 'insulation-zone-X'
          const insulationZoneElements = document.querySelectorAll(
            '[id^="insulation-zone-"]'
          );

          console.log(
            `Found ${insulationZoneElements.length} insulation zone elements`
          );

          // Process all insulation zones if they exist
          if (insulationZoneElements.length > 0) {
            // Handle the first insulation zone
            updateProgress(`Processing first insulation zone...`);

            // Capture the first zone
            const firstZoneCanvas = await captureElement(
              insulationZoneElements[0].id
            );
            if (firstZoneCanvas) {
              // Add to the current page with insulation section parameter
              currentY = addImageToPDF(
                pdf,
                firstZoneCanvas,
                currentY,
                "insulation"
              );
            }

            // Process remaining zones
            if (insulationZoneElements.length > 1) {
              // Process zones efficiently
              let i = 1; // Start from the second zone

              while (i < insulationZoneElements.length) {
                // Add a new page
                pdf.addPage();
                if (reportConfig.includePageNumbers) {
                  addPageNumber(pdf, reportConfig.includePageNumbers);
                }
                pageCount++;

                // Start higher on the page for insulation sections
                currentY = 14; // Reduced top margin for insulation zones

                // Check the heights of the zones to determine how many can fit on one page
                const firstZoneElement = insulationZoneElements[i];
                const firstZoneHeight = firstZoneElement
                  ? firstZoneElement.getBoundingClientRect().height
                  : 0;

                // Decide how many zones to put on this page based on height
                let zonesPerPage = 2; // Default

                // If zones are small enough, put 3 on a page
                if (firstZoneHeight < 350) {
                  zonesPerPage = 3;
                } else if (firstZoneHeight > 700) {
                  // If zones are very large, just put 1 on a page
                  zonesPerPage = 1;
                }

                // Capture the zones for this page
                const zoneCanvases: HTMLCanvasElement[] = [];
                for (
                  let j = 0;
                  j < zonesPerPage && i + j < insulationZoneElements.length;
                  j++
                ) {
                  updateProgress(`Processing insulation zone ${i + j + 1}...`);

                  const canvas = await captureElement(
                    insulationZoneElements[i + j].id
                  );
                  if (canvas) {
                    zoneCanvases.push(canvas);
                  }
                }

                // Add the zones to the page with minimal spacing
                for (const canvas of zoneCanvases) {
                  currentY = addImageToPDF(pdf, canvas, currentY, "insulation");
                }

                // Move to the next group of zones
                i += zonesPerPage;
              }
            }
          }
        } else if (section.section === "heating" && pageIndex === 0) {
          // Handle heating systems (ensure heating-system-0 is included)
          const heatingSystemElements = document.querySelectorAll(
            '[id^="heating-system-"]'
          );
          const waterHeater = document.getElementById(
            "heating-system-water-heater"
          );

          // Filter out water heater from regular heating systems
          const regularHeatingElements = Array.from(
            heatingSystemElements
          ).filter((el) => el.id !== "heating-system-water-heater");

          console.log(
            `Found ${regularHeatingElements.length} heating systems and ${waterHeater ? 1 : 0} water heaters`
          );

          // Collect all heating system IDs to ensure we don't miss any
          const heatingSystemIds: string[] = [];
          for (const el of regularHeatingElements) {
            heatingSystemIds.push(el.id);
          }

          console.log("Heating system IDs:", heatingSystemIds);

          // First, check and capture heating-system-0 if it exists
          const system0 = document.getElementById("heating-system-0");
          if (system0) {
            // Update progress
            updateProgress(`Processing primary heating system (system-0)...`);

            // Capture system-0
            const canvas = await captureElement("heating-system-0");
            if (canvas) {
              // Add to the current page
              currentY = addImageToPDF(pdf, canvas, currentY);
            }
          }

          // Next, capture heating-system-1 if it exists
          const system1 = document.getElementById("heating-system-1");
          if (system1) {
            // Update progress
            updateProgress(`Processing heating system 1...`);

            // Capture the system
            const canvas = await captureElement("heating-system-1");
            if (canvas) {
              // Check if we need a new page based on current position
              if (currentY > 180) {
                // If we're already too far down the page
                pdf.addPage();
                if (reportConfig.includePageNumbers) {
                  addPageNumber(pdf, reportConfig.includePageNumbers);
                }
                pageCount++;
                currentY = 16;
              }

              // Add to the page
              currentY = addImageToPDF(pdf, canvas, currentY);
            }
          }

          // Process remaining heating systems
          let currentPageSystems = (system0 ? 1 : 0) + (system1 ? 1 : 0); // Count how many systems we've already added
          const systemsRemaining =
            regularHeatingElements.length - currentPageSystems;

          if (systemsRemaining > 0) {
            for (let i = 0; i < regularHeatingElements.length; i++) {
              const element = regularHeatingElements[i];
              const idMatch = element.id.match(/heating-system-(\d+)/);

              if (!idMatch) continue;

              const systemIndex = Number.parseInt(idMatch[1], 10);

              // Skip system-0 and system-1 as we've already handled them
              if (systemIndex < 2 && (system0 || system1)) continue;

              // Update progress
              updateProgress(`Processing heating system ${systemIndex}...`);

              // If we need to start a new page
              if (currentPageSystems >= 2 || currentY > 200) {
                pdf.addPage();
                if (reportConfig.includePageNumbers) {
                  addPageNumber(pdf, reportConfig.includePageNumbers);
                }
                pageCount++;
                currentY = 16;
                currentPageSystems = 0;
              }

              // Capture the heating system
              const canvas = await captureElement(element.id);
              if (canvas) {
                currentY = addImageToPDF(pdf, canvas, currentY);
                currentPageSystems++;
              }
            }
          }

          // Handle water heater
          if (waterHeater) {
            // Update progress
            updateProgress(`Processing water heating system...`);

            // If we're already at 2 systems on the current page, add a new page
            if (currentPageSystems >= 2 || currentY > 180) {
              pdf.addPage();
              if (reportConfig.includePageNumbers) {
                addPageNumber(pdf, reportConfig.includePageNumbers);
              }
              pageCount++;
              currentY = 16;
              currentPageSystems = 0;
            }

            // Capture the water heater
            const canvas = await captureElement("heating-system-water-heater");
            if (canvas) {
              currentY = addImageToPDF(pdf, canvas, currentY);
            }
          }
        } else if (section.section === "cooling" && pageIndex === 0) {
          // Handle cooling systems
          const coolingSystemElements = document.querySelectorAll(
            '[id^="cooling-system-"]'
          );

          console.log(`Found ${coolingSystemElements.length} cooling systems`);

          // Collect all cooling system IDs to ensure we don't miss any
          const coolingSystemIds: string[] = [];
          for (const el of coolingSystemElements) {
            coolingSystemIds.push(el.id);
          }

          console.log("Cooling system IDs:", coolingSystemIds);

          // First, check for cooling-system-0 and add it
          const system0 = document.getElementById("cooling-system-0");
          if (system0) {
            updateProgress(`Processing primary cooling system (system-0)...`);

            const canvas = await captureElement("cooling-system-0");
            if (canvas) {
              // Add to the current page
              currentY = addImageToPDF(pdf, canvas, currentY);
            }
          }

          // Next, check for cooling-system-1 and add it if it exists
          const system1 = document.getElementById("cooling-system-1");
          if (system1) {
            updateProgress(`Processing cooling system 1...`);

            const canvas = await captureElement("cooling-system-1");
            if (canvas) {
              // Check if we need a new page
              if (currentY > 180) {
                // If we're already too far down the page
                pdf.addPage();
                if (reportConfig.includePageNumbers) {
                  addPageNumber(pdf, reportConfig.includePageNumbers);
                }
                pageCount++;
                currentY = 16;
              }

              currentY = addImageToPDF(pdf, canvas, currentY);
            }
          }

          // Process all remaining cooling systems based on their IDs
          let currentPageSystems = (system0 ? 1 : 0) + (system1 ? 1 : 0); // Count systems already added

          // Process each cooling system by checking all possible IDs
          for (let i = 0; i < coolingSystemElements.length; i++) {
            const element = coolingSystemElements[i];
            const idMatch = element.id.match(/cooling-system-(\d+)/);

            if (!idMatch) continue;

            const systemIndex = Number.parseInt(idMatch[1], 10);

            // Skip system-0 and system-1 as we've already handled them
            if (
              (systemIndex === 0 && system0) ||
              (systemIndex === 1 && system1)
            )
              continue;

            // Update progress
            updateProgress(`Processing cooling system ${systemIndex}...`);

            // If we need to start a new page
            if (currentPageSystems >= 2 || currentY > 200) {
              pdf.addPage();
              if (reportConfig.includePageNumbers) {
                addPageNumber(pdf, reportConfig.includePageNumbers);
              }
              pageCount++;
              currentY = 16;
              currentPageSystems = 0;
            }

            // Capture the cooling system
            const canvas = await captureElement(element.id);
            if (canvas) {
              currentY = addImageToPDF(pdf, canvas, currentY);
              currentPageSystems++;
            }
          }
        }
      }
    }

    // Update progress
    updateProgress("Finalizing PDF...");
    // Finalize bookmarks if enabled
    if (reportConfig.includeBookmarks) {
      try {
        // Method 1: For versions that need to finalize outlines
        if (pdf.outline && typeof pdf.outline.createOutline === "function") {
          pdf.outline.createOutline();
          console.log("Finalized bookmarks using createOutline method");
        }

        // Method 2: For versions that use a different finalization method
        if (typeof (pdf as any).finalizeOutlines === "function") {
          (pdf as any).finalizeOutlines();
          console.log("Finalized bookmarks using finalizeOutlines method");
        }

        console.log("Bookmark processing completed");
      } catch (error) {
        console.error("Error finalizing bookmarks:", error);
        // Continue anyway to ensure the PDF is saved
      }
    }

    // Add this line right after the bookmark finalization and before saving the PDF
    // Ensure all pages have page numbers
    ensurePageNumbers(pdf, reportConfig.includePageNumbers);

    // Save the PDF with custom filename if provided
    const fileName = `${reportConfig.customFileName}.pdf`;
    pdf.save(fileName);

    // Remove loading indicator
    document.body.removeChild(loadingDiv);

    // Return to the overview tab
    await switchToTab("Overview");
  } catch (error) {
    console.error("Error generating PDF:", error);
    alert("An error occurred while generating the PDF. Please try again.");

    // Remove loading indicator if it exists
    const loadingDiv = document.querySelector('div[style*="position: fixed"]');
    if (loadingDiv && loadingDiv.parentNode) {
      loadingDiv.parentNode.removeChild(loadingDiv);
    }

    // Return to the overview tab even if there was an error
    await switchToTab("Overview");
  }
};

export default handleDownloadReport;

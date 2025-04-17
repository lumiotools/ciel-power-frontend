// Helper function to add a section bookmark for subsections
const addSubSectionBookmark = (
  pdf: jsPDF,
  mainSection: string,
  subSection: string,
  mainSectionBookmark: any
): void => {
  // Format subsection title - remove the ">" prefix and clean up the ID
  const formattedTitle = subSection
    .replace(/^insulation-|^heating-|^cooling-/, "") // Remove prefixes
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")
    .trim(); // Ensure no trailing spaces

  // Add bookmark for this subsection (as a child of the main section)
  const currentPage = pdf.internal.getNumberOfPages() - 1;
  addBookmarkToDocument(pdf, formattedTitle, currentPage, mainSectionBookmark);
}; // Helper function for adding bookmarks with compatibility across jsPDF versions
const addBookmarkToDocument = (
  pdf: jsPDF,
  title: string,
  page: number,
  parent: any = null,
  options: any = {}
): any => {
  // Check which bookmark API is supported
  if (typeof pdf.outline?.add === "function") {
    // Modern jsPDF versions use outline.add
    const opts = { ...options, pageNumber: page };
    return pdf.outline.add(parent, title, opts);
  } else if (typeof pdf.addBookmark === "function") {
    // Some versions have direct addBookmark method
    return pdf.addBookmark(title, page, parent);
  } else {
    console.warn("PDF bookmarking not supported in this jsPDF version");
    return null;
  }
};
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Define page configuration
const PAGE_CONFIG = {
  format: "a4",
  orientation: "portrait",
  unit: "mm",
  margins: {
    top: 8, // Reduced from 10
    right: 8, // Reduced from 10
    bottom: 12, // Reduced from 15
    left: 8, // Reduced from 10
  },
};

// Helper function to wait for a specified time
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to switch to a specific tab with optimized wait times
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
      await wait(800); // Reduced from 1000ms

      // Add a small additional wait for more complex tabs that might need more time
      if (tabName === "Insulation Reports" || tabName === "Report Summary") {
        await wait(200); // These tabs might need a bit more time to fully render
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
    await wait(300); // Reduced from 500ms

    const element = document.getElementById(elementId);
    if (!element) {
      console.warn(`Element with ID "${elementId}" not found`);
      return null;
    }

    // Debug element found
    console.log(`Element found: ${elementId}`);

    // Scroll the element into view
    element.scrollIntoView({ behavior: "auto", block: "start" });
    await wait(200); // Reduced from 300ms

    // Dynamically adjust scale based on element size for better fit
    // Smaller elements get a slightly reduced scale to save space
    let scaleValue = 1.4; // Default scale, reduced from 1.5

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

// Get section color based on section name
const getSectionColor = (
  section: string
): { r: number; g: number; b: number } => {
  switch (section.toLowerCase()) {
    case "overview":
      return { r: 132, g: 204, b: 22 }; // lime-500
    case "airleakage":
      return { r: 37, g: 99, b: 235 }; // blue-600
    case "insulation":
      return { r: 20, g: 184, b: 166 }; // teal-500
    case "heating":
    case "cooling":
      return { r: 245, g: 158, b: 11 }; // amber-500
    case "summary":
      return { r: 249, g: 115, b: 22 }; // orange-500
    default:
      return { r: 0, g: 0, b: 0 }; // black
  }
};

// Helper function to add a section heading to the PDF with bookmark
const addSectionHeading = (pdf: jsPDF, title: string, section: string): any => {
  // Return the bookmark object for potential parent-child relationships
  const pageWidth = pdf.internal.pageSize.getWidth();

  // Get section color
  const color = getSectionColor(section);

  // Set font style for heading - slightly smaller for better space usage
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14); // Reduced from 16

  // Add heading text positioned slightly higher
  pdf.setTextColor(color.r, color.g, color.b);
  pdf.text(title, pageWidth / 2, 13, { align: "center" }); // Reduced from 15

  // Add underline closer to the text
  pdf.setDrawColor(color.r, color.g, color.b);
  pdf.line(20, 15.5, pageWidth - 20, 15.5); // Reduced from 18

  // Add a bookmark for this section using our compatibility function
  const currentPage = pdf.internal.getNumberOfPages() - 1;
  const bookmark = addBookmarkToDocument(pdf, title, currentPage);

  // Reset font to normal
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11); // Slightly smaller than original 12
  pdf.setTextColor(0, 0, 0);

  return bookmark; // Return the bookmark for use as a parent
};

// Helper function to add an image to the PDF
const addImageToPDF = (
  pdf: jsPDF,
  canvas: HTMLCanvasElement,
  startY = 20
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
      addPageNumber(pdf);
    }
  }

  // Add the image with compression for smaller file size
  const imgData = canvas.toDataURL("image/jpeg", 0.85); // Use JPEG with 85% quality - balanced for size/quality
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

  // Return the new Y position with minimal gap
  return startY + scaledHeight + 3; // Reduced gap from 5 to 3
};

// Helper function to add page number
const addPageNumber = (pdf: jsPDF): void => {
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const pageNum = pdf.internal.getNumberOfPages();
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.setTextColor(100, 100, 100); // Gray color for page numbers
  pdf.text(`Page ${pageNum}`, pageWidth / 2, pageHeight - 5, {
    align: "center",
  });
};

// Main function to generate the PDF report
const handleDownloadReport = async (): Promise<void> => {
  try {
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

    // Initialize PDF with outlines (bookmarks) enabled
    const pdf = new jsPDF({
      orientation: PAGE_CONFIG.orientation as any,
      unit: PAGE_CONFIG.unit,
      format: PAGE_CONFIG.format,
      compress: true, // Enable compression for smaller file size
    });

    // Enable bookmarking
    pdf.setDisplayMode("fullwidth");

    // Set PDF properties
    pdf.setProperties({
      title: "Home Energy Audit Report",
      subject: "Energy Audit Report",
      author: "Ciel Power",
      creator: "Ciel Power Report Generator",
    });

    // Update progress indicator
    const updateProgress = (message: string) => {
      const progressElement = document.getElementById("pdf-progress");
      if (progressElement) {
        progressElement.textContent = message;
      }
    };

    // Define the report structure based on the specified requirements
    // Using the exact groupings as specified
    const reportStructure = [
      // Overview - Regrouped elements as requested
      {
        section: "overview",
        tabName: "Overview",
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
        section: "airLeakage",
        tabName: "Air Leakage Reports",
        pages: [
          { ids: ["introduction", "air-flow-rates", "air-changes-per-hour"] }, // Combined all three
          { ids: ["common-air-leak-points"] },
        ],
      },

      // Insulation - Regrouped elements as requested
      {
        section: "insulation",
        tabName: "Insulation Reports",
        pages: [
          {
            ids: [
              "insulation-overview",
              "technical-aspects",
              "insulation-benefits",
            ],
          },
          { ids: ["insulation-kneewall", "insulation-exterior-wall"] },
          { ids: ["insulation-crawlspace", "insulation-rim-joist"] },
          { ids: ["insulation-overhang"] }, // The first insulation zone will be added to this page
        ],
      },

      // Heating - Include header with system-1 only
      {
        section: "heating",
        tabName: "Heating Reports",
        pages: [
          { ids: ["heating-header"] }, // The first heating system will be added to this page
        ],
      },

      // Cooling - Include header with first cooling system
      {
        section: "cooling",
        tabName: "Cooling Reports",
        pages: [
          { ids: ["cooling-header"] }, // The first cooling system will be added to this page
        ],
      },

      // Report Summary - Combined more elements and put project-costs and tax-credits on the same page
      {
        section: "summary",
        tabName: "Report Summary",
        pages: [
          { ids: ["summary-of-concerns", "solutions-and-recommendations"] }, // Combined these two
          { ids: ["future-solutions", "environmental-impact"] }, // Combined these two
          { ids: ["project-costs", "tax-credits"] }, // Combined project-costs and tax-credits on the same page
        ],
      },
    ];

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
      await wait(600); // Reduced from 1000ms

      // Add section heading only once at the beginning of the section
      if (pageCount > 0) {
        pdf.addPage();
      }

      // Add the section heading
      const sectionBookmark = addSectionHeading(
        pdf,
        formatSectionName(section.section),
        section.section
      );

      // Add page number to the first page
      if (pageCount === 0) {
        addPageNumber(pdf);
      }

      pageCount++;

      // Process each page in the section
      for (let pageIndex = 0; pageIndex < section.pages.length; pageIndex++) {
        const page = section.pages[pageIndex];

        // If this isn't the first page in the section, add a new page
        if (pageIndex > 0) {
          pdf.addPage();
          addPageNumber(pdf);
          pageCount++;
        }

        // Current Y position for adding elements
        let currentY = 18; // Reduced from 22 to save vertical space

        // Capture and add each element for this page with bookmarks for ALL sections
        for (const id of page.ids) {
          updateProgress(`Processing ${id}...`);

          const canvas = await captureElement(id);
          if (canvas) {
            currentY = addImageToPDF(pdf, canvas, currentY);

            // Add subsection bookmarks for all sections, not just certain ones
            // This ensures Overview and Air Leakage sections also get proper bookmarks
            // Format the element ID into a readable title
            const formattedTitle = id
              .replace(/^about-|^air-|^goals-of-the-/, "") // Remove common prefixes
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ");

            // Add bookmark for this element
            const currentPage = pdf.internal.getNumberOfPages() - 1;
            addBookmarkToDocument(
              pdf,
              formattedTitle,
              currentPage,
              sectionBookmark
            );
          }
        }

        // Handle special cases for dynamic content
        if (section.section === "insulation" && pageIndex === 3) {
          // Handle insulation zones (first one with insulation-overhang, then 2 per page)
          const insulationZoneElements = document.querySelectorAll(
            '[id^="insulation-zone-"]'
          );

          console.log(
            `Found ${insulationZoneElements.length} insulation zone elements`
          );

          if (insulationZoneElements.length > 0) {
            // Handle the first insulation zone - add it to the page with insulation-overhang
            updateProgress(`Processing first insulation zone...`);

            // Capture the first zone
            const firstZoneCanvas = await captureElement(
              insulationZoneElements[0].id
            );
            if (firstZoneCanvas) {
              // Add to the current page (which should be the one with insulation-overhang)
              currentY = addImageToPDF(pdf, firstZoneCanvas, currentY);
            }
          }

          // Process remaining zones in groups of 2 per page
          if (insulationZoneElements.length > 1) {
            // Process zones in groups of 2
            for (let i = 1; i < insulationZoneElements.length; i += 2) {
              // Add a new page
              pdf.addPage();
              addPageNumber(pdf);
              pageCount++;

              currentY = 16; // Reduced from 20 to start elements higher on new pages

              const zoneCanvases: HTMLCanvasElement[] = [];

              // Capture up to 2 zones for this page
              for (
                let j = 0;
                j < 2 && i + j < insulationZoneElements.length;
                j++
              ) {
                // Update progress
                updateProgress(`Processing insulation zone ${i + j + 1}...`);

                // Capture zone
                const canvas = await captureElement(
                  insulationZoneElements[i + j].id
                );
                if (canvas) {
                  zoneCanvases.push(canvas);
                }
              }

              // Add the zones to the page
              for (const canvas of zoneCanvases) {
                currentY = addImageToPDF(pdf, canvas, currentY);
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
          const heatingSystemIds = [];
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
              // Add to the current page (which should have the heating-header)
              currentY = addImageToPDF(pdf, canvas, currentY);

              // Add bookmark for this heating system
              addSubSectionBookmark(
                pdf,
                "Heating Systems",
                "heating-system-0",
                sectionBookmark
              );
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
                addPageNumber(pdf);
                pageCount++;
                currentY = 16;
              }

              // Add to the page
              currentY = addImageToPDF(pdf, canvas, currentY);

              // Add bookmark for this heating system
              addSubSectionBookmark(
                pdf,
                "Heating Systems",
                "heating-system-1",
                sectionBookmark
              );
            }
          }

          // Process remaining heating systems (start from index 2 since we've handled 0 and 1)
          let currentPageSystems = (system0 ? 1 : 0) + (system1 ? 1 : 0); // Count how many systems we've already added
          let systemsRemaining =
            regularHeatingElements.length - currentPageSystems;

          if (systemsRemaining > 0) {
            // Start processing from system-2 or the next available system
            let nextIndex = 2;

            // If we didn't find system-0 or system-1, we might need to start from a different index
            if (!system0 && !system1) {
              const firstSystemId = regularHeatingElements[0]?.id;
              const match = firstSystemId?.match(/heating-system-(\d+)/);
              if (match) {
                nextIndex = parseInt(match[1], 10);
              }
            }

            for (let i = 0; i < regularHeatingElements.length; i++) {
              const element = regularHeatingElements[i];
              const idMatch = element.id.match(/heating-system-(\d+)/);

              if (!idMatch) continue;

              const systemIndex = parseInt(idMatch[1], 10);

              // Skip system-0 and system-1 as we've already handled them
              if (systemIndex < 2 && (system0 || system1)) continue;

              // Update progress
              updateProgress(`Processing heating system ${systemIndex}...`);

              // If we need to start a new page
              if (currentPageSystems >= 2 || currentY > 200) {
                // If we have 2+ systems or we're far down the page
                pdf.addPage();
                addPageNumber(pdf);
                pageCount++;
                currentY = 16;
                currentPageSystems = 0;
              }

              // Capture the heating system
              const canvas = await captureElement(element.id);
              if (canvas) {
                currentY = addImageToPDF(pdf, canvas, currentY);
                currentPageSystems++;

                // Add bookmark for this heating system
                addSubSectionBookmark(
                  pdf,
                  "Heating Systems",
                  element.id,
                  sectionBookmark
                );
              }
            }
          }

          // Handle water heater - add to current page if it has space, otherwise create a new page
          if (waterHeater) {
            // Update progress
            updateProgress(`Processing water heating system...`);

            // If we're already at 2 systems on the current page or far down the page, add a new page
            if (currentPageSystems >= 2 || currentY > 180) {
              pdf.addPage();
              addPageNumber(pdf);
              pageCount++;
              currentY = 16;
              currentPageSystems = 0;
            }

            // Capture the water heater
            const canvas = await captureElement("heating-system-water-heater");
            if (canvas) {
              currentY = addImageToPDF(pdf, canvas, currentY);

              // Add bookmark for water heater
              addSubSectionBookmark(
                pdf,
                "Heating Systems",
                "water-heater",
                sectionBookmark
              );
            }
          }
        } else if (section.section === "cooling" && pageIndex === 0) {
          // Handle cooling systems - ensure we get ALL cooling systems
          const coolingSystemElements = document.querySelectorAll(
            '[id^="cooling-system-"]'
          );

          console.log(`Found ${coolingSystemElements.length} cooling systems`);

          // Collect all cooling system IDs to ensure we don't miss any
          const coolingSystemIds = [];
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
              // Add to the current page (which should have the cooling-header)
              currentY = addImageToPDF(pdf, canvas, currentY);

              // Add bookmark for this cooling system
              addSubSectionBookmark(
                pdf,
                "Cooling Systems",
                "cooling-system-0",
                sectionBookmark
              );
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
                addPageNumber(pdf);
                pageCount++;
                currentY = 16;
              }

              currentY = addImageToPDF(pdf, canvas, currentY);

              // Add bookmark for this cooling system
              addSubSectionBookmark(
                pdf,
                "Cooling Systems",
                "cooling-system-1",
                sectionBookmark
              );
            }
          }

          // Process all remaining cooling systems based on their IDs
          let currentPageSystems = (system0 ? 1 : 0) + (system1 ? 1 : 0); // Count systems already added

          // Process each cooling system by checking all possible IDs
          for (let i = 0; i < coolingSystemElements.length; i++) {
            const element = coolingSystemElements[i];
            const idMatch = element.id.match(/cooling-system-(\d+)/);

            if (!idMatch) continue;

            const systemIndex = parseInt(idMatch[1], 10);

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
              addPageNumber(pdf);
              pageCount++;
              currentY = 16;
              currentPageSystems = 0;
            }

            // Capture the cooling system
            const canvas = await captureElement(element.id);
            if (canvas) {
              currentY = addImageToPDF(pdf, canvas, currentY);
              currentPageSystems++;

              // Add bookmark for this cooling system
              addSubSectionBookmark(
                pdf,
                "Cooling Systems",
                element.id,
                sectionBookmark
              );
            }
          }
        }
      }
    }

    // Update progress
    updateProgress("Finalizing PDF...");

    // Save the PDF
    const fileName = `Ciel_Power_Energy_Audit_Report_${new Date().toISOString().split("T")[0]}.pdf`;
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

export default handleDownloadReport;

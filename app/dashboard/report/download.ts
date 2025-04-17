import jsPDF from "jspdf";
import html2canvas from "html2canvas";

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
};

// Helper function to wait for a specified time
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper function to switch to a specific tab
const switchToTab = async (tabName: string): Promise<void> => {
  const tabButtons = document.querySelectorAll(
    "button[class*='relative py-4 px-6']"
  );

  for (const button of tabButtons) {
    if (button.textContent?.toLowerCase().includes(tabName.toLowerCase())) {
      // Click the button to switch to this tab
      button.click();
      // Wait for the tab content to render
      await wait(300);
      return;
    }
  }

  console.warn(`Tab "${tabName}" not found`);
};

// Helper function to capture an element as an image
const captureElement = async (
  elementId: string
): Promise<HTMLCanvasElement | null> => {
  const element = document.getElementById(elementId);
  if (!element) {
    console.warn(`Element with ID "${elementId}" not found`);
    return null;
  }

  try {
    // Make sure the element is visible for capture
    const originalDisplay = element.style.display;
    if (originalDisplay === "none") {
      element.style.display = "block";
    }

    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Enable CORS for images
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
    });

    // Restore original display
    if (originalDisplay === "none") {
      element.style.display = "none";
    }

    return canvas;
  } catch (error) {
    console.error(`Error capturing element with ID "${elementId}":`, error);
    return null;
  }
};

// Helper function to add a section heading to the PDF
const addSectionHeading = (pdf: jsPDF, title: string): void => {
  const pageWidth = pdf.internal.pageSize.getWidth();

  // Set font style for heading
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(16);

  // Add heading text
  pdf.setTextColor(0, 0, 0); // Black color
  pdf.text(title, pageWidth / 2, 15, { align: "center" });

  // Add underline
  pdf.setDrawColor(0, 0, 0); // Black color
  pdf.line(20, 18, pageWidth - 20, 18);

  // Reset font to normal
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);
};

// Helper function to capture a section of the report
const captureSection = async (
  sectionName: string,
  elementIds: string[]
): Promise<HTMLCanvasElement[]> => {
  // Switch to the appropriate tab
  await switchToTab(sectionName);

  // Wait for content to fully render
  await wait(500);

  // Capture each element
  const canvases: HTMLCanvasElement[] = [];

  for (const id of elementIds) {
    const canvas = await captureElement(id);
    if (canvas) {
      canvases.push(canvas);
    }
  }

  return canvases;
};

// Helper function to add multiple canvases to a single PDF page
const addCanvasesToPage = (
  pdf: jsPDF,
  canvases: HTMLCanvasElement[],
  startY = 20
): void => {
  if (canvases.length === 0) return;

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Calculate margins in points
  const margins = {
    top: PAGE_CONFIG.margins.top,
    right: PAGE_CONFIG.margins.right,
    bottom: PAGE_CONFIG.margins.bottom,
    left: PAGE_CONFIG.margins.left,
  };

  // Calculate available width and height
  const availableWidth = pageWidth - margins.left - margins.right;
  const availableHeight = pageHeight - margins.top - margins.bottom - startY;

  // Calculate height per canvas (divide available height by number of canvases)
  const heightPerCanvas = availableHeight / canvases.length;

  // Add each canvas to the page
  canvases.forEach((canvas, index) => {
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Calculate scale to fit width
    const widthRatio = availableWidth / imgWidth;

    // Calculate maximum height based on available space for this canvas
    const maxHeight = heightPerCanvas;
    const heightRatio = maxHeight / imgHeight;

    // Use the smaller ratio to ensure it fits
    const ratio = Math.min(widthRatio, heightRatio);

    const scaledWidth = imgWidth * ratio;
    const scaledHeight = imgHeight * ratio;

    // Center horizontally
    const x = margins.left + (availableWidth - scaledWidth) / 2;

    // Position vertically based on index
    const y = startY + index * heightPerCanvas;

    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(
      imgData,
      "PNG",
      x,
      y,
      scaledWidth,
      scaledHeight,
      undefined,
      "FAST"
    );
  });
};

// Format section name for display
const formatSectionName = (section: string): string => {
  switch (section) {
    case "overview":
      return "Overview";
    case "airLeakage":
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
const handleDownloadReport = async (): Promise<void> => {
  // Store the current active tab to return to it later
  const currentActiveTab =
    document.querySelector(
      "button[class*='relative py-4 px-6'][class*='text-']"
    )?.textContent || "Overview";

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
        <p style="font-family: sans-serif;" id="pdf-progress">Processing page 1...</p>
      </div>
      <style>
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      </style>
    `;
    document.body.appendChild(loadingDiv);

    // Initialize PDF
    const pdf = new jsPDF({
      orientation: PAGE_CONFIG.orientation as any,
      unit: PAGE_CONFIG.unit,
      format: PAGE_CONFIG.format,
    });

    // Set PDF properties
    pdf.setProperties({
      title: "Home Energy Audit Report",
      subject: "Energy Audit Report",
      author: "Ciel Power",
      creator: "Ciel Power Report Generator",
    });

    // Define the report structure based on the specified requirements
    // Updated section names to match actual tab names
    const reportStructure = [
      // Overview
      {
        section: "overview",
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

      // Air Leakage - Updated to match actual tab name
      {
        section: "airLeakage",
        pages: [
          { ids: ["introduction", "air-flow-rates"] },
          { ids: ["air-changes-per-hour"] },
          { ids: ["common-air-leak-points"] },
        ],
      },

      // Insulation
      {
        section: "insulation",
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
          { ids: ["insulation-overhang"] },
        ],
      },

      // Heating
      {
        section: "heating",
        pages: [
          { ids: ["heating-header", "heating-system-1"] },
          // Additional heating systems will be handled dynamically
        ],
      },

      // Cooling
      {
        section: "cooling",
        pages: [
          { ids: ["cooling-header"] },
          // Additional cooling systems will be handled dynamically
        ],
      },

      // Report Summary
      {
        section: "summary",
        pages: [
          { ids: ["summary-of-concerns"] },
          { ids: ["solutions-and-recommendations"] },
          { ids: ["future-solutions"] },
          { ids: ["environmental-impact"] },
          { ids: ["project-costs"] },
          { ids: ["tax-credits"] },
        ],
      },
    ];

    let pageCount = 0;

    // Process each section in the report structure
    for (const section of reportStructure) {
      // Update progress indicator
      const progressElement = document.getElementById("pdf-progress");
      if (progressElement) {
        progressElement.textContent = `Processing ${formatSectionName(section.section)} section...`;
      }

      // Switch to the section tab
      await switchToTab(formatSectionName(section.section));

      // Wait for content to render
      await wait(500);

      // Process each page in the section
      for (const page of section.pages) {
        // Update progress
        if (progressElement) {
          progressElement.textContent = `Processing ${formatSectionName(section.section)} page ${pageCount + 1}...`;
        }

        // Capture elements for this page
        const canvases: HTMLCanvasElement[] = [];
        for (const id of page.ids) {
          const canvas = await captureElement(id);
          if (canvas) {
            canvases.push(canvas);
          }
        }

        // If we have canvases to add
        if (canvases.length > 0) {
          // Add a new page if this isn't the first page
          if (pageCount > 0) {
            pdf.addPage();
          }

          // Add section heading
          addSectionHeading(pdf, formatSectionName(section.section));

          // Add canvases to the page (starting after the heading)
          addCanvasesToPage(pdf, canvases, 25);

          // Increment page count
          pageCount++;
        }

        // Small delay to prevent browser from freezing
        await wait(100);
      }

      // Handle special cases for dynamic content
      if (section.section === "insulation") {
        // Handle insulation zones (2 per page)
        const insulationZoneElements = document.querySelectorAll(
          '[id^="insulation-zone-"]'
        );

        for (let i = 0; i < insulationZoneElements.length; i += 2) {
          // Update progress
          if (progressElement) {
            progressElement.textContent = `Processing insulation zones page ${Math.floor(i / 2) + 1}...`;
          }

          const zoneCanvases: HTMLCanvasElement[] = [];

          // First zone
          if (insulationZoneElements[i]) {
            const canvas = await captureElement(insulationZoneElements[i].id);
            if (canvas) zoneCanvases.push(canvas);
          }

          // Second zone (if exists)
          if (i + 1 < insulationZoneElements.length) {
            const canvas = await captureElement(
              insulationZoneElements[i + 1].id
            );
            if (canvas) zoneCanvases.push(canvas);
          }

          // Add to PDF if we have canvases
          if (zoneCanvases.length > 0) {
            pdf.addPage();

            // Add section heading
            addSectionHeading(pdf, "Insulation Zones");

            // Add canvases to the page
            addCanvasesToPage(pdf, zoneCanvases, 25);

            pageCount++;
          }

          await wait(100);
        }
      } else if (section.section === "heating") {
        // Handle heating systems (2 per page)
        const heatingSystems = document.querySelectorAll(
          '[id^="heating-system-"]:not([id="heating-system-1"])'
        );
        const waterHeater = document.getElementById(
          "heating-system-water-heater"
        );

        // Group systems (2 per page)
        for (let i = 0; i < heatingSystems.length; i += 2) {
          // Update progress
          if (progressElement) {
            progressElement.textContent = `Processing heating systems page ${Math.floor(i / 2) + 1}...`;
          }

          const systemCanvases: HTMLCanvasElement[] = [];

          // First system
          if (heatingSystems[i]) {
            const canvas = await captureElement(heatingSystems[i].id);
            if (canvas) systemCanvases.push(canvas);
          }

          // Second system or water heater
          if (i + 1 < heatingSystems.length) {
            const canvas = await captureElement(heatingSystems[i + 1].id);
            if (canvas) systemCanvases.push(canvas);
          } else if (waterHeater && i + 1 >= heatingSystems.length) {
            const canvas = await captureElement("heating-system-water-heater");
            if (canvas) systemCanvases.push(canvas);
          }

          // Add to PDF if we have canvases
          if (systemCanvases.length > 0) {
            pdf.addPage();

            // Add section heading
            addSectionHeading(pdf, "Heating Systems");

            // Add canvases to the page
            addCanvasesToPage(pdf, systemCanvases, 25);

            pageCount++;
          }

          await wait(100);
        }

        // If water heater wasn't added and exists
        if (waterHeater && heatingSystems.length % 2 === 0) {
          const canvas = await captureElement("heating-system-water-heater");
          if (canvas) {
            pdf.addPage();

            // Add section heading
            addSectionHeading(pdf, "Water Heating System");

            // Add canvas to the page
            addCanvasesToPage(pdf, [canvas], 25);

            pageCount++;
          }
        }
      } else if (section.section === "cooling") {
        // Handle cooling systems (2 per page, first one on its own page)
        const coolingSystems = document.querySelectorAll(
          '[id^="cooling-system-"]'
        );

        // First cooling system on its own page (if exists)
        if (coolingSystems.length > 0) {
          // Update progress
          if (progressElement) {
            progressElement.textContent = `Processing cooling system 1...`;
          }

          const canvas = await captureElement(coolingSystems[0].id);
          if (canvas) {
            pdf.addPage();

            // Add section heading
            addSectionHeading(pdf, "Cooling System 1");

            // Add canvas to the page
            addCanvasesToPage(pdf, [canvas], 25);

            pageCount++;
          }

          // Remaining systems (2 per page)
          for (let i = 1; i < coolingSystems.length; i += 2) {
            // Update progress
            if (progressElement) {
              progressElement.textContent = `Processing cooling systems page ${Math.floor((i - 1) / 2) + 2}...`;
            }

            const systemCanvases: HTMLCanvasElement[] = [];

            // First system
            if (coolingSystems[i]) {
              const canvas = await captureElement(coolingSystems[i].id);
              if (canvas) systemCanvases.push(canvas);
            }

            // Second system
            if (i + 1 < coolingSystems.length) {
              const canvas = await captureElement(coolingSystems[i + 1].id);
              if (canvas) systemCanvases.push(canvas);
            }

            // Add to PDF if we have canvases
            if (systemCanvases.length > 0) {
              pdf.addPage();

              // Add section heading
              addSectionHeading(pdf, "Additional Cooling Systems");

              // Add canvases to the page
              addCanvasesToPage(pdf, systemCanvases, 25);

              pageCount++;
            }

            await wait(100);
          }
        }
      }
    }

    // Update progress
    const progressElement = document.getElementById("pdf-progress");
    if (progressElement) {
      progressElement.textContent = "Finalizing PDF...";
    }

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

export default handleDownloadReport;

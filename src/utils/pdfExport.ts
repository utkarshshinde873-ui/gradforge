import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

/**
 * 4K Ultra-Smooth Font Contrast Processor:
 * Maps core letter pixels (brightness < 140) to solid rich dark (#000000)
 * while applying a smooth cubic sub-pixel anti-aliasing curve (140-242) for 4K sharp, silky typography.
 */
function apply4KSmoothFontContrast(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  try {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const len = data.length;

    for (let i = 0; i < len; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];

      // Pure background white
      if (r > 242 && g > 242 && b > 242) {
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
        data[i + 3] = 255;
        continue;
      }

      // Preserve vibrant theme accent colors (Red, Blue, Green, Purple)
      const maxColor = Math.max(r, g, b);
      const minColor = Math.min(r, g, b);
      const isAccent = (maxColor - minColor) > 20 && maxColor > 40;

      if (isAccent) {
        continue;
      }

      // Neutral text pixel -> apply 4K smooth contrast curve
      const brightness = (77 * r + 150 * g + 29 * b) >> 8;

      if (brightness < 140 && a > 15) {
        // Deep text core -> solid rich pitch dark (#000000)
        data[i] = 0;
        data[i + 1] = 0;
        data[i + 2] = 0;
        data[i + 3] = 255;
      } else if (brightness < 242 && a > 15) {
        // Silky 4K font edge curve: cubic transition for ultra-smooth anti-aliasing
        const t = (brightness - 140) / 102; // 0.0 to 1.0
        const smoothVal = Math.round(242 * Math.pow(t, 2.2));
        data[i] = smoothVal;
        data[i + 1] = smoothVal;
        data[i + 2] = smoothVal;
        data[i + 3] = 255;
      } else {
        data[i] = 255;
        data[i + 1] = 255;
        data[i + 2] = 255;
        data[i + 3] = 255;
      }
    }

    ctx.putImageData(imageData, 0, 0);
  } catch (e) {
    console.error("4K smooth font contrast error:", e);
  }
}

/**
 * Traverses source DOM node and target cloned node to force explicit computed styles.
 */
function inlineComputedStyles(sourceEl: HTMLElement, targetEl: HTMLElement) {
  const srcNodes = [sourceEl, ...Array.from(sourceEl.querySelectorAll("*"))];
  const tgtNodes = [targetEl, ...Array.from(targetEl.querySelectorAll("*"))];

  for (let i = 0; i < srcNodes.length; i++) {
    const srcNode = srcNodes[i] as HTMLElement;
    const tgtNode = tgtNodes[i] as HTMLElement;
    if (!srcNode || !tgtNode) continue;

    try {
      const computed = window.getComputedStyle(srcNode);

      tgtNode.style.opacity = "1";
      tgtNode.style.filter = "none";
      tgtNode.style.mixBlendMode = "normal";
      (tgtNode.style as any).webkitFontSmoothing = "antialiased";

      if (computed.fontFamily) {
        tgtNode.style.fontFamily = computed.fontFamily;
      }
      
      if (computed.color && computed.color !== "transparent" && computed.color !== "rgba(0, 0, 0, 0)") {
        const colorStr = computed.color.toLowerCase();
        const match = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (match) {
          const r = parseInt(match[1], 10);
          const g = parseInt(match[2], 10);
          const b = parseInt(match[3], 10);
          const isAccent = (Math.max(r, g, b) - Math.min(r, g, b)) > 18;

          if (!isAccent) {
            tgtNode.style.color = "#000000";
            (tgtNode.style as any).webkitTextFillColor = "#000000";
          } else {
            tgtNode.style.color = computed.color;
            (tgtNode.style as any).webkitTextFillColor = computed.color;
          }
        } else {
          tgtNode.style.color = computed.color;
        }
      } else {
        tgtNode.style.color = "#000000";
      }

      if (computed.backgroundColor && computed.backgroundColor !== "rgba(0, 0, 0, 0)" && computed.backgroundColor !== "transparent") {
        tgtNode.style.backgroundColor = computed.backgroundColor;
      } else {
        tgtNode.style.backgroundColor = "#ffffff";
      }

      if (computed.borderColor && computed.borderColor !== "transparent" && computed.borderColor !== "rgba(0, 0, 0, 0)") {
        tgtNode.style.borderColor = computed.borderColor;
      }

      if (computed.borderWidth && computed.borderWidth !== "0px") {
        tgtNode.style.borderWidth = computed.borderWidth;
        tgtNode.style.borderStyle = computed.borderStyle || "solid";
      }

      if (computed.fontWeight) {
        tgtNode.style.fontWeight = computed.fontWeight;
      }
      if (computed.fontSize) {
        tgtNode.style.fontSize = computed.fontSize;
      }
      if (computed.lineHeight) {
        tgtNode.style.lineHeight = computed.lineHeight;
      }
      if (computed.letterSpacing) {
        tgtNode.style.letterSpacing = computed.letterSpacing;
      }

      if (tgtNode.tagName.toLowerCase() === "svg" || tgtNode.tagName.toLowerCase() === "path") {
        if (computed.stroke && computed.stroke !== "none") {
          tgtNode.setAttribute("stroke", computed.stroke);
          tgtNode.style.stroke = computed.stroke;
        }
        if (computed.fill && computed.fill !== "none") {
          tgtNode.setAttribute("fill", computed.fill);
          tgtNode.style.fill = computed.fill;
        }
      }
    } catch (e) {
      // Ignore individual node computed style read errors
    }
  }
}

export async function exportResumeToPdf(elementId: string, fullName: string = "Resume") {
  const originalElement = document.getElementById(elementId);
  if (!originalElement) {
    console.error(`Element with id '${elementId}' not found.`);
    alert("Resume preview container not found. Please refresh and try again.");
    return false;
  }

  let tempContainer: HTMLElement | null = null;

  try {
    // Create an off-screen container for a clean 210mm A4 canvas capture
    tempContainer = document.createElement("div");
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.top = "0";
    tempContainer.style.width = "210mm";
    tempContainer.style.background = "#ffffff";
    tempContainer.style.color = "#000000";

    const clonedNode = originalElement.cloneNode(true) as HTMLElement;
    clonedNode.style.display = "block";
    clonedNode.style.visibility = "visible";
    clonedNode.style.margin = "0";
    clonedNode.style.boxShadow = "none";
    clonedNode.style.transform = "none";
    clonedNode.style.opacity = "1";
    clonedNode.style.background = "#ffffff";
    clonedNode.style.width = "210mm";

    tempContainer.appendChild(clonedNode);
    document.body.appendChild(tempContainer);

    // Wait 50ms for layout to stabilize
    await new Promise(resolve => setTimeout(resolve, 50));

    // Inline explicit computed styles onto cloned node
    inlineComputedStyles(originalElement, clonedNode);

    // Capture canvas with html2canvas-pro at scale 4 (4K 450 DPI ultra-high resolution)
    const canvas = await html2canvas(clonedNode, {
      scale: 4,
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: "#ffffff",
      scrollX: 0,
      scrollY: 0,
    });

    // Remove temporary container
    if (tempContainer && tempContainer.parentNode) {
      tempContainer.parentNode.removeChild(tempContainer);
      tempContainer = null;
    }

    if (!canvas || canvas.width === 0 || canvas.height === 0) {
      throw new Error("Canvas generation failed.");
    }

    // Apply 4K cubic sub-pixel font anti-aliasing curve
    apply4KSmoothFontContrast(canvas);

    // Lossless PNG data URL
    const imgData = canvas.toDataURL("image/png");

    // Create jsPDF instance with standard A4 dimensions (210mm x 297mm)
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page with SLOW high-quality resampling
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "SLOW");
    heightLeft -= pdfHeight;

    // Add multi-page overflow if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "SLOW");
      heightLeft -= pdfHeight;
    }

    // Clean filename formatted with user's full name
    const sanitizedName = (fullName.trim() || "Resume").replace(/[^a-zA-Z0-9_-]/g, "_");
    const fileName = `${sanitizedName}_GradForge.pdf`;

    // Direct browser file download via Blob URL
    const pdfBlob = pdf.output("blob");
    const blobUrl = URL.createObjectURL(pdfBlob);

    const downloadLink = document.createElement("a");
    downloadLink.href = blobUrl;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    setTimeout(() => {
      URL.revokeObjectURL(blobUrl);
    }, 1000);

    return true;
  } catch (error) {
    if (tempContainer && tempContainer.parentNode) {
      tempContainer.parentNode.removeChild(tempContainer);
    }
    console.error("PDF export error:", error);
    window.print();
    return false;
  }
}

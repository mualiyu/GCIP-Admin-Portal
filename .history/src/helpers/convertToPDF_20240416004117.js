import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

async function convertToPDF(id, title, setIsConverting = "Download PDF") {
  setIsConverting("Converting PDF");
  const pdf = new jsPDF("p", "mm", "a4");
  const pdfPageWidth = pdf.internal.pageSize.getWidth();
  const pdfPageHeight = pdf.internal.pageSize.getHeight();
  const padding = 0;

  const contentElements = Array.from(document.querySelectorAll(`#${id}`));
  const promises = [];

  let currentPageHeight = padding;

  for (const contentElement of contentElements) {
    const rect = contentElement.getBoundingClientRect();
    const contentHeight = rect.height;

    const promise = html2canvas(contentElement, {
      scrollY: -window.scrollY,
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const imageWidth = pdfPageWidth - padding * 2;
      const imageHeight = (imageWidth * canvas.height) / canvas.width;

      pdf.addImage(
        imgData,
        "PNG",
        padding,
        currentPageHeight,
        imageWidth,
        imageHeight
      );
      currentPageHeight += imageHeight + padding;
    });

    promises.push(promise);
  }

  await Promise.all(promises);

  pdf.save(`${title}.pdf`);
  setIsConverting("Download PDF");
}

export default convertToPDF;

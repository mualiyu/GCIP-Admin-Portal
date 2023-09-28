import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



// function convertToPDF(id, title, setIsConverting = "Download PDF") {
//     setIsConverting("Converting PDF");
//   const pageElement = document.getElementById(id);
//   html2canvas(pageElement, { scrollY: -window.scrollY })
//   .then((canvas) => {
//     const imgData = canvas.toDataURL('image/png');
//     const pdf = new jsPDF('p', 'mm', 'a4'); // Set document size to A4
//     const pageWidth = pdf.internal.pageSize.getWidth();
//     const pageHeight = pdf.internal.pageSize.getHeight();
//     const padding = 10;

//     let imageWidth = pageWidth - padding * 2;
//     let imageHeight = (imageWidth * canvas.height) / canvas.width;
//     const maxImageHeight = pageHeight - padding * 2;
// if (imageHeight > maxImageHeight) {
//   imageHeight = maxImageHeight;
//   imageWidth = (imageHeight * canvas.width) / canvas.height;
// }

//     //   
//     const x = (pageWidth - imageWidth) / 2;
//     const y = (pageHeight - imageHeight) / 2;
//     pdf.addImage(imgData, 'PNG', x, y, imageWidth, imageHeight);
//     pdf.save(`${title}.pdf`);
//     setIsConverting("Download PDF");
//   })
//     .catch((error) => {
//       console.error('Error generating PDF:', error);
//     });
// }



function convertToPDF(id, title, setIsConverting = "Download PDF") {
    setIsConverting("Converting PDF");
    const pdf = new jsPDF('p', 'mm', 'a4');
  
    const pdfPageWidth = pdf.internal.pageSize.getWidth();
    const pdfPageHeight = pdf.internal.pageSize.getHeight();
    const padding = 20;
  
    const contentElements = document.getElementById(id); 
    console.log(contentElements)// Change this selector
  
    let currentPageHeight = padding;
  
    for (const contentElement of contentElements) {
      // Capture section content as canvas
      html2canvas(contentElement, { scrollY: -window.scrollY }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
  
        const imageWidth = pdfPageWidth - padding * 2;
        const imageHeight = (imageWidth * canvas.height) / canvas.width;
  
        // Check if the content fits on the current page
        if (currentPageHeight + imageHeight > pdfPageHeight) {
          pdf.addPage();
          currentPageHeight = padding;
        }
  
        pdf.addImage(imgData, 'PNG', padding, currentPageHeight, imageWidth, imageHeight);
        currentPageHeight += imageHeight + padding;
        
        if (contentElement === contentElements[contentElements.length - 1]) {
          pdf.save(`${title}.pdf`);
          setIsConverting("Download PDF");
        }
      });
    }
  }

  


export default convertToPDF;

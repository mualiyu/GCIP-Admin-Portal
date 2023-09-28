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

async function convertToPDF(id, title, setIsConverting = "Download PDF") {
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfPageWidth = pdf.internal.pageSize.getWidth();
    const pdfPageHeight = pdf.internal.pageSize.getHeight();
    const padding = 20;
  
    const contentElements = Array.from(document.querySelectorAll(`#${id}`));
  
    let currentPageHeight = padding;
  
    for (const contentElement of contentElements) {
      const rect = contentElement.getBoundingClientRect();
      const contentHeight = rect.height;
  
      if (currentPageHeight + contentHeight + padding > pdfPageHeight) {
        pdf.addPage();
        currentPageHeight = padding;
      }
  
      const canvas = await html2canvas(contentElement, { scrollY: -window.scrollY });
      const imgData = canvas.toDataURL('image/png');
      const imageWidth = pdfPageWidth - padding * 2;
      const imageHeight = (imageWidth * canvas.height) / canvas.width;
  
      if (currentPageHeight + imageHeight + padding > pdfPageHeight) {
        pdf.addPage();
        currentPageHeight = padding;
      }
  
      pdf.addImage(imgData, 'PNG', padding, currentPageHeight, imageWidth, imageHeight);
      currentPageHeight += imageHeight + padding;
    }
  
    pdf.save(`${title}.pdf`);
  }

  


// function convertToPDF(id, title, setIsConverting = "Download PDF") {
//     setIsConverting("Converting PDF");
//     const pdf = new jsPDF('p', 'mm', 'a4');
  
//     const pdfPageWidth = pdf.internal.pageSize.getWidth();
//     const pdfPageHeight = pdf.internal.pageSize.getHeight();
//     const padding = 20;
  
//     const contentElements = document.querySelectorAll(`#${id}`)
//     console.log(contentElements)// Change this selector
  
//     let currentPageHeight = 0;
  
//     for (const contentElement of contentElements) {
//         const rect = contentElement.getBoundingClientRect();
//         const contentHeight = rect.height;

//         if (currentPageHeight + contentHeight + padding > pdfPageHeight) {
//             pdf.addPage();
//             currentPageHeight = 0;
//           }
//       // Capture section content as canvas
//       html2canvas(contentElement, { scrollY: -window.scrollY }).then((canvas) => {
//         const imgData = canvas.toDataURL('image/png');

//         const imageWidth = pdfPageWidth - padding * 2;
//         const imageHeight = (imageWidth * canvas.height) / canvas.width;
  
//         if (currentPageHeight + imageHeight + padding > pdfPageHeight) {
//           pdf.addPage();
//           currentPageHeight = 0;
//         }
  
//         pdf.addImage(imgData, 'PNG', padding, currentPageHeight + padding, imageWidth, imageHeight);
//         currentPageHeight += imageHeight + padding;
        
//         if (contentElement === contentElements[contentElements.length - 1]) {
//           pdf.save(`${title}.pdf`);
//         }
//       });
//     }
//   }
  


export default convertToPDF;

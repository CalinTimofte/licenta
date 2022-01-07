import { Document, Page, pdfjs } from "react-pdf";
import React from 'react';
import pdf from "../Chapter7.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfLayout = () => {
    return (
        <Document file= {pdf}>
            <Page pageNumber = {4} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {5} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {2} width={window.screen.availWidth * 0.5}/>
        </Document>
    );
  }

export const LP7_2 = <PdfLayout/> ;
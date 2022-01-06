import { Document, Page, pdfjs } from "react-pdf";
import React from 'react';
import pdf from "../Chapter5.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfLayout = () => {
    return (
        <Document file= {pdf}>
            <Page pageNumber = {14} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {15} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {16} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {3} width={window.screen.availWidth * 0.5}/>
        </Document>
    );
  }

export const LP5_8 = <PdfLayout/> ;
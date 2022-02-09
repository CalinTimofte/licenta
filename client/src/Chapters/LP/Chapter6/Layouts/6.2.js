import { Document, Page, pdfjs } from "react-pdf";
import React from 'react';
import pdf from "../Chapter6.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfLayout = () => {
    return (
        <Document file= {pdf}>
            <Page pageNumber = {6} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {7} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {3} width={window.screen.availWidth * 0.5}/>
        </Document>
    );
  }

export const LP6_2 = <PdfLayout/> ;
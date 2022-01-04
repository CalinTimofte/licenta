import { Document, Page, pdfjs } from "react-pdf";
import React from 'react';
import pdf from "../Chapter3.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfLayout = () => {
    return (
        <Document file= {pdf}>
            <Page pageNumber = {17} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {19} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {21} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {22} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {4} width={window.screen.availWidth * 0.5}/>
        </Document>
    );
  }

export const LP3_9 = <PdfLayout/> ;
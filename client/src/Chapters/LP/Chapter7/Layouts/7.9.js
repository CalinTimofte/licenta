import { Document, Page, pdfjs } from "react-pdf";
import React from 'react';
import pdf from "../notes_pl_no_links-63_cropped.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfLayout = () => {
    return (
        <Document file= {pdf}>
            <Page pageNumber = {2} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {3} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {4} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {5} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {6} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {7} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {8} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {1} width={window.screen.availWidth * 0.5}/>
        </Document>
    );
  }

export const LP7_9 = <PdfLayout/> ;
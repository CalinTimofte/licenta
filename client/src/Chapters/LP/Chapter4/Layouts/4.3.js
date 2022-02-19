import { Document, Page, pdfjs } from "react-pdf";
import React from 'react';
import pdf from "../Chapter4.pdf";
import pdf2 from "../notes_pl_no_links-31_cropped.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const PdfLayout = () => {
    return (
        <Document file= {pdf}>
            <Page pageNumber = {9} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {10} width={window.screen.availWidth * 0.5}/>
            <Document file = {pdf2}>
                <Page pageNumber = {2} width={window.screen.availWidth * 0.5}/>
            </Document>
            <Page pageNumber = {3} width={window.screen.availWidth * 0.5}/>
        </Document>
    );
  }

export const LP4_3 = <PdfLayout/> ;
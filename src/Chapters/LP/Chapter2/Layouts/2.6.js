import { Document, Page, pdfjs } from "react-pdf";
import React from 'react';
import pdf from "../Chapter2.pdf";
import Exercise7 from "../../Exercises/Exercise7/Exercise7.js"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfLayout = () => {
    return (
        <Document file= {pdf}>
            <Page pageNumber = {17} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {18} width={window.screen.availWidth * 0.5}/>
            <Exercise7/>
            <Page pageNumber = {3} width={window.screen.availWidth * 0.5}/>
        </Document>
    );
  }

export const LP2_6 = <PdfLayout/> ;
import { Document, Page, pdfjs } from "react-pdf";
import React from 'react';
import pdf from "../Chapter2.pdf";
import Exercise9 from "../../Exercises/Exercise9/Exercise9.js"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfLayout = () => {
    return (
        <Document file= {pdf}>
            <Page pageNumber = {24} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {25} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {26} width={window.screen.availWidth * 0.5}/>
            <br/>
                <Exercise9/>
            <br/>
            <Page pageNumber = {3} width={window.screen.availWidth * 0.5}/>
        </Document>
    );
  }

export const LP2_10 = <PdfLayout/> ;
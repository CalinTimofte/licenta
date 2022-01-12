import { Document, Page, pdfjs } from "react-pdf";
import React from 'react';
import pdf from "../Chapter2.pdf";
import Exercise1 from "../Exercise1/Exercise1.js"
import Exercise2 from "../Exercise2/Exercise2.js"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfLayout = () => {
    
    return (
        <Document file= {pdf}>
            <Page pageNumber = {6} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {7} width={window.screen.availWidth * 0.5}/>
            
            <br/>
                <Exercise1/>
            <br/>
            
            <Page pageNumber = {8} width={window.screen.availWidth * 0.5}/>

            <br/>
                <Exercise2/>
            <br/>

            <Page pageNumber = {3} width={window.screen.availWidth * 0.5}/>
        </Document>
    );
  }

export const LP2_3 = <PdfLayout/> ;
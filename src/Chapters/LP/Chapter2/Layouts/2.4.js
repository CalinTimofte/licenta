import { Document, Page, pdfjs } from "react-pdf";
import React from 'react';
import pdf from "../Chapter2.pdf";
import Exercise4 from "../../Exercises/Exercise4/Exercise4";
import Exercise3 from "../../Exercises/Exercise3/Exercise3"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const PdfLayout = () => {
    return (
        <Document file= {pdf}>
            <Page pageNumber = {9} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {10} width={window.screen.availWidth * 0.5}/>
            <br/>
                <Exercise3/>
            <br/>
            <Page pageNumber = {11} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {12} width={window.screen.availWidth * 0.5}/>
            <br/>
                <Exercise4/>
            <br/>
            <Page pageNumber = {13} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {3} width={window.screen.availWidth * 0.5}/>
        </Document>
    );
  }

export const LP2_4 = <PdfLayout/> ;
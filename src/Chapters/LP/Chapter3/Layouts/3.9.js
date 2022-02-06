import { Document, Page, pdfjs } from "react-pdf";
import React from 'react';
import pdf from "../Chapter3.pdf";
import Exercise14 from "../../Exercises/Exercise14/Exercise14";
import Exercise16 from "../../Exercises/Exercise16/Exercise16.js"
import Exercise17 from "../../Exercises/Exercise17/Exercise17.js"
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfLayout = () => {
    return (
        <Document file= {pdf}>
            <Page pageNumber = {17} width={window.screen.availWidth * 0.5}/>
            <br/>
                <Exercise14/>
            <br/>
            <Page pageNumber = {19} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {21} width={window.screen.availWidth * 0.5}/>
            <br/>
                <Exercise16/>
            <br/>
            <Page pageNumber = {22} width={window.screen.availWidth * 0.5}/>
            <br/>
                <Exercise17/>
            <br/>
            <Page pageNumber = {4} width={window.screen.availWidth * 0.5}/>
        </Document>
    );
  }

export const LP3_9 = <PdfLayout/> ;
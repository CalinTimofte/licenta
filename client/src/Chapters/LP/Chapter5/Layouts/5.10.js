import { Document, Page, pdfjs } from "react-pdf";
import React from 'react';
import pdf from "../Chapter5.pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfLayout = () => {
    return (
        <Document file= {pdf}>
            <Page pageNumber = {20} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {22} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {24} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {26} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {28} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {29} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {30} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {31} width={window.screen.availWidth * 0.5}/>
            <Page pageNumber = {3} width={window.screen.availWidth * 0.5}/>
        </Document>
    );
  }

export const LP5_10 = <PdfLayout/> ;
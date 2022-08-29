import * as pdfjsLib from "pdfjs-dist";
import PDFJSWorker from "pdfjs-dist/build/pdf.worker.entry";

pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;

const readPDF = (pdf_url) => pdfjsLib.getDocument(pdf_url).promise;

export default readPDF;
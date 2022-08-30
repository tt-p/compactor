import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";
import PDFJSWorker from "pdfjs-dist/legacy/build/pdf.worker.entry";

pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;

const readPDF = (pdf_url) => pdfjsLib.getDocument(pdf_url).promise;

export default readPDF;
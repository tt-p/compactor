import PDFDocument from "pdfkit/js/pdfkit.standalone";
import blobStream from "blob-stream/.js";
import {getImageObject, setCompressedFileFields} from "../util/FileUtils";
import {blobToBase64} from "../util/Base64Utils";

const convertIMGtoPDF = async (images, inputFile, callBackFunc) => {

    const pdfDocument = createPDF(inputFile);

    const stream = pdfDocument.pipe(blobStream());

    for (let image of images) {
        let imageObject = await getImageObject(image);
        pdfDocument.addPage({size: [imageObject.width, imageObject.height]});
        pdfDocument.image(imageObject.src, 0, 0);
    }

    pdfDocument.end();

    stream.on("finish", async () => {
        const outputBlob = stream.toBlob("application/pdf");
        let base64String = await blobToBase64(outputBlob);
        setCompressedFileFields(inputFile, base64String);
        callBackFunc(inputFile);
    });
}

const createPDF = (inputFile) => {
    const pdfDocument = new PDFDocument({ autoFirstPage: false, compress: false });
    const fileName = inputFile.fileName.split(".")[0];
    pdfDocument.info = {
        Title: `${fileName}.pdf`,
        Author: "mys",
        Keywords: `${fileName}, pdf`
    };
    return pdfDocument;
}

export default convertIMGtoPDF;
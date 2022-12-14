import {compressPDF} from "./pdf/PDFCompress";
import {compressIMG} from "./img/IMGCompress";

export const compressFile = async (inputFile, callbackFunc, options) => {

    const mimeType = inputFile.mimeType;

    if (mimeType === "application/pdf") {
        await compressPDF(inputFile, callbackFunc, options);
    } else if (mimeType === "image/jpeg" || mimeType === "image/png") {
        await compressIMG(inputFile, callbackFunc, options);
    } else {
        console.error(`Error cannot compress mime type: ${mimeType}`);
    }

}
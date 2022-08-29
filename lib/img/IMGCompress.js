import {
    createCanvas,
    createCanvasContext, getFileName,
    getImageObject,
    setCompressedFileFields
} from "../util/FileUtils";
import {getPreFix} from "../util/Base64Utils";

export const compressIMG = async (inputFile, callbackFunc, options) => {

    const image = await getImageObject(getPreFix("image/jpeg") + inputFile.bytes);

    const width = image.width;
    const height = image.height;

    const canvas = createCanvas(width, height);
    const canvasContext = createCanvasContext(canvas);
    canvasContext.drawImage(image, 0, 0, width, height);

    const base64String = await new Promise((resolve, _) =>
        resolve(canvas.toDataURL("image/jpeg", options.pageQuality)));

    canvas.remove();

    inputFile.fileName = getFileName(inputFile.fileName) + ".jpg";
    inputFile.mimeType = "image/jpeg";
    setCompressedFileFields(inputFile, base64String);

    callbackFunc(inputFile);
}
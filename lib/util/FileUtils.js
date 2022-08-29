import {getFileSize, getPreFix} from "./Base64Utils";

export const PDF_SMALL_COMPRESS_OPTIONS = {
    pageScale: 1.0,
    pageQuality: 0.75,
};

export const PDF_LARGE_COMPRESS_OPTIONS = {
    pageScale: 1.0,
    pageQuality: 0.45,
};

export const JPEG_SMALL_COMPRESS_OPTIONS = {
    pageScale: 1.0,
    pageQuality: 0.1,
};

export const JPEG_LARGE_COMPRESS_OPTIONS = {
    pageScale: 1.0,
    pageQuality: 0.05,
};

export const PNG_SMALL_COMPRESS_OPTIONS = {
    pageScale: 1.0,
    pageQuality: 0.50,
};

export const PNG_LARGE_COMPRESS_OPTIONS = {
    pageScale: 1.0,
    pageQuality: 0.25,
};

export const getFileExtension = (filename) =>
    filename.slice(filename.lastIndexOf(".") + 1).toLowerCase();

export const getFileName = (filename) =>
    filename.slice(0, filename.lastIndexOf(".")).toLowerCase();

export const getImageObject = data => new Promise((resolve, reject) => {
    const image = new Image();
    image.src = data;
    image.onload = () => resolve(image);
    image.onerror = () => reject("Error cannot create the image");
});

export const setCompressedFileFields = (inputFile, base64String) => {
    const base64PreFixLength = getPreFix(inputFile.mimeType).length;

    inputFile.bytes = base64String.substring(base64PreFixLength);
    inputFile.fileSize = getFileSize(base64String);
}

export const createCanvas = (width, height) => {
    const canvas = document.createElement('canvas');
    canvas.id = "canvas";
    canvas.width = width;
    canvas.height = height;

    return canvas;
}

export const createCanvasFromViewport = (viewPort) => {
    return createCanvas(viewPort.width || viewPort.viewBox[2], viewPort.height || viewPort.viewBox[3]);
}

export const createCanvasContext = (canvas) => {
    return canvas.getContext('2d');
}
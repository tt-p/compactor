import {createCanvasContext, createCanvasFromViewport} from "../util/FileUtils";

const convertPDFtoIMG = (pdfDocumentProxy, options) => {
    return renderAllPages(pdfDocumentProxy, options);
}

const renderAllPages = async (file, options) => {
    let images = [];

    for (let i = 1; i <= file.numPages; i++) {
        let pdfPageProxy = await file.getPage(i);
        let renderedPage = await renderPage(pdfPageProxy, options);
        images.push(JSON.parse(JSON.stringify(renderedPage)));
    }

    return images;
}

const renderPage = async (pdfPageProxy, options) => {
    const {pageScale, pageQuality} = {...options}

    const pageViewport = pdfPageProxy.getViewport({scale: pageScale});
    const canvas = createCanvasFromViewport(pageViewport);
    const canvasContext = createCanvasContext(canvas);
    const renderTaskParams = {canvasContext: canvasContext, viewport: pageViewport}

    await pdfPageProxy.render(renderTaskParams).promise;

    const base64 = canvas.toDataURL("image/jpeg", pageQuality);

    canvas.remove();

    return base64;
};

export default convertPDFtoIMG;
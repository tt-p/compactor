export const getPreFix = (mimeType) => `data:${mimeType};base64,`;

export const getFileSize = (base64) =>
    Math.round(4 * Math.ceil((base64.length / 3)) * 0.5624896334383812);

export const blobToBase64 = (blob) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
});
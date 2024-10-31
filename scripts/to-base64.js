const fs = require('fs');
const readFile = require('./read-file');

/**
 * Transform image file to base64 string
 *
 * @param file
 */
const toBase64 = async (file) => {
    const { fileTypeFromBuffer } = await import('file-type');

    if (!file || (typeof file === 'string' && !fs.existsSync(file))) {
        return '';
    }
    const imgBuffer = typeof file === 'string' ? Buffer.from(await readFile(file)) : file;
    const imgInfo = await fileTypeFromBuffer(imgBuffer);
    const base64String = imgBuffer.toString('base64');
    return `data:${imgInfo?.mime || 'image/png'};base64,` + base64String;
};

module.exports = toBase64;

const readFile = require('./read-file');

/**
 * Check if file is image
 *
 * @param file
 */
const isImage = async (file) => {
    const { fileTypeFromBuffer } = await import('file-type');

    try {
        if (!file) {
            return false;
        }
        const fileBuffer = typeof file === 'string' ? Buffer.from(await readFile(file)) : file;
        const fileInfo = await fileTypeFromBuffer(fileBuffer);
        return fileInfo && fileInfo.mime?.startsWith('image/');
    } catch (err) {
        return false; // Error reading the file or determining the file type
    }
}

module.exports = isImage;

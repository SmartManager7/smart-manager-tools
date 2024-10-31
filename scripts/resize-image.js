const sharp = require('sharp');
const isImage = require('./is-image');

/**
 * Resize image
 *
 * @param file
 * @param targetWidth
 * @param targetHeight
 */
const resizeImage = async (file, targetWidth, targetHeight) => {
    try {
        if (!file || !(await isImage(file))) {
            return null;
        }
        return await sharp(file).resize({ width: targetWidth, height: targetHeight, fit: "contain", background: 'rgba(0, 0, 0, 0)' }).toBuffer();
    } catch (err) {
        throw err;
    }
};

module.exports = resizeImage;

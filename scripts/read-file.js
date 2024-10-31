const fs = require('fs');

/**
 * Read zip archive
 *
 * @param path
 * @param options
 */
const readFile = async (path, options) => {
    return new Promise((resolve, reject) => {
        fs.readFile(
            path,
            {
                ...(options || {}),
            },
            (err, res) => {
                if (err) {
                    reject('Unable to read file: ' + err);
                    return console.log('Unable to read file: ' + err);
                }
                resolve(res);
            },
        );
    });
}

module.exports = readFile;

const fs = require('fs');
const yauzl = require('yauzl');

/**
 * Read zip archive
 *
 * @param path string
 */
const readZipArchive = async (path) => {
    return new Promise(async (resolve, reject) => {
        try {
            const entries = [];
            yauzl.open(path, { lazyEntries: true, autoClose: false }, (err, zipfile) => {
                if (err) throw err;
                zipfile.readEntry();
                zipfile.on('entry', entry => {
                    let entryData = {
                        ...entry,
                        buffer: null,
                    };
                    entries.push({
                        ...entryData,
                        // Use function instead of arrow in order to have access to current entry via this
                        // and update some props, for ex. set buffer after read
                        readFile: function () {
                            return new Promise(readResolve => {
                                if (this.buffer) {
                                    readResolve(this.buffer);
                                } else {
                                    zipfile.openReadStream(entry, (err, readStream) => {
                                        if (err) throw err;

                                        const chunks = [];

                                        readStream.on('readable', () => {
                                            let chunk;
                                            while (null !== (chunk = readStream.read())) {
                                                chunks.push(chunk);
                                            }
                                        });

                                        readStream.on('end', () => {
                                            const content = chunks.join('');
                                            this.buffer = Buffer.from(content);
                                            readResolve(this.buffer);
                                        });
                                    });
                                }
                            });
                        },
                        extractEntryTo: (targetPath) => {
                            return new Promise(extractResolve => {
                                zipfile.openReadStream(entry, (err, readStream) => {
                                    if (err) throw err;

                                    const writeStream = fs.createWriteStream(targetPath);
                                    writeStream.on('close', () => {
                                        extractResolve(true);
                                    });
                                    readStream.pipe(writeStream);
                                });
                            });
                        },
                    });
                    zipfile.readEntry();
                });
                zipfile.on('close', function () {
                    console.log(`Closed zip file: ${path}`);
                });
                zipfile.on('end', () => {
                    console.log(`Read ${path} successfully`);
                    resolve({ entries, closeFile: () => zipfile.close() });
                });
            });
        } catch (error) {
            reject(`Error with reading at ${path}`);
            return console.error(`Error with reading at ${path}`, error);
        }
    });
}

module.exports = readZipArchive;

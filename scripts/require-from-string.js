/**
 * Helper function to compile script from string
 *
 * @param jsCode
 * @param fileName
 */
const requireFromString = (jsCode, fileName) => {
    const Module = module.constructor;
    const m = new Module();
    try {
        m._compile(jsCode, fileName);
    } catch (e) {
        console.log(fileName, ': ', e);
    }
    return m.exports;
};

module.exports = requireFromString;

const { createHash } = require('crypto');

/**
 * Generate a fixed-size hash from any input, and then formatted into a UUID structure
 *
 * @param word
 */
const generateUUIDFromWord = (word) => {
    // Hash the word using a cryptographic algorithm (e.g., SHA-1)
    const hash = createHash('sha1').update(word).digest('hex');

    // Format the first 32 characters into a UUID
    return [
        hash.substring(0, 8),
        hash.substring(8, 12),
        hash.substring(12, 16),
        hash.substring(16, 20),
        hash.substring(20, 32),
    ].join('-');
};

module.exports = generateUUIDFromWord;

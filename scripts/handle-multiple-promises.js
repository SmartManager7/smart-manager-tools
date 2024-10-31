const handleMultiplePromises = async (
    data,
    handler,
    errorMessageLabel,
    successMessageLabel,
) => {
    const promises = (data || []).map(
        (item) =>
            new Promise(async (resolve, reject) => {
                try {
                    const res = await handler(item, resolve, reject);
                    resolve(res);
                } catch (e) {
                    reject(e);
                }
            }),
    );
    const results = await Promise.allSettled(promises);
    const successfulPromises = results.filter(p => p.status === 'fulfilled');
    const rejectedPromises = results.filter(p => p.status === 'rejected');
    if (errorMessageLabel && rejectedPromises.length > 0) {
        console.log(`${errorMessageLabel}: `, rejectedPromises);
        throw new Error(
            `${errorMessageLabel}: \n ${JSON.stringify(
                rejectedPromises.map((res) => `${res.reason}\n`).join('        '),
            )}`,
        );
    }
    if (successMessageLabel && successfulPromises.length > 0) {
        console.log(
            `${successMessageLabel}: \n ${JSON.stringify(
                successfulPromises.map((res) => `${res.value}\n`).join('        '),
            )}`,
        );
    }
    return successfulPromises.filter((res) => !!res.value).map((res) => res.value);
};

module.exports = handleMultiplePromises;

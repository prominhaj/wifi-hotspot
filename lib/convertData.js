export const replaceMongoIdInArray = (array = []) => {
    if (!Array.isArray(array)) {
        throw new TypeError('Expected an array');
    }

    return array.map((item) => {
        const { _id, ...rest } = item;
        return {
            id: _id.toString(),
            ...rest
        };
    });
};

export const replaceMongoIdInObject = (obj) => {
    if (!obj) return null;
    const { _id, ...updatedObj } = { ...obj, id: obj._id.toString() };
    return updatedObj;
};

export const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    const formattedValue = parseFloat((bytes / Math.pow(k, i)).toFixed(2));

    return `${formattedValue} ${sizes[i]}`;
};

export const calculateProgress = (startDateString, totalDays) => {
    const startDate = new Date(startDateString);
    const currentDate = new Date();

    // Calculate days passed
    const timeDiff = currentDate - startDate;
    const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    // Calculate progress percentage and days left
    const progressValue = parseInt(Math.min((daysPassed / totalDays) * 100, 100));
    const remainingDays = Math.max(totalDays - daysPassed, 0);

    return {
        progressValue,
        remainingDays,
        daysPassed
    };
};

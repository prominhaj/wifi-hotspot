import moment from 'moment';

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
    if (bytes === '0' || !bytes) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    const formattedValue = parseFloat((bytes / Math.pow(k, i)).toFixed(2));

    return `${formattedValue} ${sizes[i]}`;
};

export const calculateProgress = (startDateString, totalDays) => {
    const startDate = new Date(startDateString);
    const currentDate = new Date();

    // Calculate time difference in milliseconds
    const timeDiff = startDate - currentDate;

    let progressValue, remainingTime, timeUnit;

    if (timeDiff > 0) {
        // Calculate days, hours, minutes, and seconds remaining
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);

        const totalRemainingSeconds =
            days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;

        const totalInitialSeconds = totalDays * 24 * 60 * 60;

        // Calculate progress percentage based on remaining time (opposite direction)
        progressValue = parseInt((totalRemainingSeconds / totalInitialSeconds) * 100);

        // Format remaining time based on days
        if (days > 1) {
            remainingTime = `${days} Days ${String(hours).padStart(2, '0')}:${String(
                minutes
            ).padStart(2, '0')}:${String(seconds).padStart(2, '0')} Hours`;
            timeUnit = '';
        } else if (days === 1) {
            remainingTime = `${days} Day ${String(hours).padStart(2, '0')}:${String(
                minutes
            ).padStart(2, '0')}:${String(seconds).padStart(2, '0')} Hours`;
            timeUnit = '';
        } else if (hours > 0) {
            remainingTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
                2,
                '0'
            )}:${String(seconds).padStart(2, '0')}`;
            timeUnit = 'Hours';
        } else if (minutes > 0) {
            remainingTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
                2,
                '0'
            )}`;
            timeUnit = 'Minutes';
        } else {
            remainingTime = `${String(seconds).padStart(2, '0')}`;
            timeUnit = 'Seconds';
        }

        return {
            progressValue,
            remainingTime,
            timeUnit
        };
    } else {
        // Handle case when the countdown is over
        return {
            progressValue: 0,
            remainingTime: '00:00:00',
            timeUnit: "Time's up"
        };
    }
};

export const getExpirationDate = (days) => {
    const now = new Date();
    const expirationDate = new Date(now);

    expirationDate.setDate(now.getDate() + days);

    return expirationDate;
};

export const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
    if (originalPrice < 0 || discountPercentage < 0) {
        return 0;
    }

    const discountAmount = (originalPrice * discountPercentage) / 100;
    const finalPrice = parseInt(originalPrice - discountAmount);

    return finalPrice;
};

export const convertToUTCPlus6 = (date) => {
    const momentDate = moment.utc(date);

    const utcPlus6Date = momentDate.utcOffset(6);

    return utcPlus6Date;
};

export function formatRelativeTime(date: string) {
    const currentDate = new Date();
    const targetDate = new Date(date);

    const diffInMilliseconds = +currentDate - +targetDate;

    const rtf = new Intl.RelativeTimeFormat('es', {
        numeric: 'auto',
    });

    if (diffInMilliseconds < 0) {
        return rtf.format(-1, 'day');
    } else if (diffInMilliseconds < 60000) {
        const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
        return rtf.format(-diffInSeconds, 'second');
    } else if (diffInMilliseconds < 3600000) {
        const diffInMinutes = Math.floor(diffInMilliseconds / 60000);
        return rtf.format(-diffInMinutes, 'minute');
    } else if (diffInMilliseconds < 86400000) {
        const diffInHours = Math.floor(diffInMilliseconds / 3600000);
        return rtf.format(-diffInHours, 'hour');
    } else if (diffInMilliseconds < 2592000000) {
        const diffInDays = Math.floor(diffInMilliseconds / 86400000);
        return rtf.format(-diffInDays, 'day');
    } else {
        return targetDate.toLocaleString();
    }
}
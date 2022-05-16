import moment from 'moment';

export const formatTimeInDate = (time: any) => {
    return time ? new Date(Number(time) * 1000) : undefined;
};

export const formatTime = (value: any) => {
    const dateString = moment.unix(value);
    return moment(dateString);
};
export const formatRelativeTime = (timestamp: any) => {
    if (!timestamp) return '--';
    const diffDay = moment().diff(timestamp, 'days');
    const diffHours = moment().diff(timestamp, 'hour');
    const diffMin = moment().diff(timestamp, 'minutes');
    const min = diffMin - diffHours * 60;

    if (!isNaN(diffDay) && Math.abs(diffDay) > 1) {
        return `${Math.abs(diffDay)} days`;
    }

    if (isNaN(diffHours) || isNaN(min)) return '-';

    return `${Math.abs(diffHours)}h: ${Math.abs(min)}m`;
};

export const DATE_TIME_FORMAT = {
    CMR6: 'hh:mm A, DD MMM YYYY([GMT]Z)',
};

export const formatDuration = (duration: moment.Duration | number) =>{
    const momentDate = moment.duration(duration);
    const days = momentDate.days();
    const hours = momentDate.hours();
    const minutes = momentDate.minutes();
    const seconds = momentDate.seconds();
    if(days <= 0 && hours <= 24 && hours > 1){
        return `${Math.abs(hours)}h: ${Math.abs(minutes)}m `;
    }
    if(days > 0){
        return `${Math.abs(days)} days ${Math.abs(hours)}h: ${Math.abs(minutes)}m `;
    }
    if(hours < 1){
        return `${Math.abs(minutes)}m: ${Math.abs(seconds)}s `;
    }
    
}
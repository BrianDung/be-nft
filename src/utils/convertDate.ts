import moment from 'moment'
import momentTimezone from 'moment-timezone';
import {DATETIME_FORMAT} from "../constants";

export const convertTimeToStringFormat = (date?: Date) => {
  const timezone = momentTimezone.tz(date, moment.tz.guess());
  return timezone.format("h:mm A MMM DD, YYYY ([GMT]Z)");
}

export const convertTimeToStringFormatWithoutGMT = (date: Date) => {
  const timezone = momentTimezone.tz(date, moment.tz.guess());
  return timezone.format("h:mm A MMM DD, YYYY");
}

export const convertUnixTimeToDateTime = (time: number, formatType = 2) => {
  if(!time){
    return null;
  }
  let type;
  if (formatType === 1) {
    type = "h:mm A MMM DD, YYYY ([GMT]Z)";
  } else if (formatType === 2) {
    type = "hh:mm:ss A MM/DD/yyyy [GMT]ZZ";
  }
  return moment.unix(time).format(type);
}

export function convertUnixTimeToDate(time: number, format: string) {
  return moment.unix(time).format(format);
}

export const convertDateTimeToUnix = (time: any): string => {
  if (!time) return "";
  const unixTime = moment(time).format("x");
  return moment(time).format('x').substring(0, unixTime.length - 3);
}

export const buildMomentTimezone = (datetime: any): any => {
  if (!datetime) return '';

  // const momentTimezoneObject = moment(datetime).local();
  const momentTimezoneObject = moment(moment.utc(datetime)).local();
  return momentTimezoneObject;
}

export const convertDateLocalWithTimezone = (datetime: any): string => {
  if (!datetime) return '';
  const date = buildMomentTimezone(datetime).format("hh:mm:ss A");
  return date;
}

export const convertTimeLocalWithTimezone = (datetime: any): string => {
  if (!datetime) return '';
  const time = buildMomentTimezone(datetime).format("MM/DD/YYYY");
  return time;
}

export const convertDateTimeStringToMomentObject = (datetime: string) => {
  // Convert datetime from "2021-05-28 08:45:59" to Moment Object
  return moment(datetime, DATETIME_FORMAT);
};

export const convertMomentObjectToDateTimeString = (datetime: any) => {
  // Convert datetime from Moment Object to String "2021-05-28 08:45:59"
  return moment(datetime).format(DATETIME_FORMAT);
};

export const unixTimeNow = () => {
  return parseInt((Date.now() / 1000) + '')
};

export const unixTime = (time: any) => {
  return moment(time).unix();
};

export const timeAgo = (time: any) => {
  return moment(time).fromNow()
};

export const inTime = (time: any)=>{
  return moment(time).toNow();
}

export const unixToDate = (time: number|string) =>{
  return new Date(Number(time) * 1000);
}

export const diffDate = (a:any, b:any) =>{
  return moment(a * 1000).diff(moment(b * 1000), 'days');
}
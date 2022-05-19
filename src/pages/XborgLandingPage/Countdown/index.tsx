import { formatTimeInDate } from 'constants/formatDate';
import moment from 'moment';
import React, { useCallback, useEffect,useState }  from 'react';
import useStyles from './style';

type CountDownProps = {
  startDate?: Date,
  getCurrentDateRealTime?: (currentDate: Date) => void
}

const Countdown = (props:CountDownProps) => {
  const { getCurrentDateRealTime } = props;
  const styles = useStyles();
  const [second, setSecond] = useState('0');
  const [minute, setMinute] = useState('0');
  const [hour, setHour] = useState('0');
  const [day, setDay] = useState('0');
  const emitCurrentDate = useCallback((now: Date) => {
    getCurrentDateRealTime && getCurrentDateRealTime(now);
  }, [getCurrentDateRealTime]);
  const today = new Date();
  const startDate = formatTimeInDate(moment().unix() + 4000);
  useEffect(() => {
    let countDownInterval = undefined as any;
    if (startDate && startDate >= today) {
      const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;
      let countDown = startDate.getTime();
      countDownInterval = setInterval(function() {
        let now = new Date().getTime() ,distance = countDown - now;

        if (distance >= 0) {
          const currentDay = Math.floor(now / (day));
          const currentHour = Math.floor((now % (day)) / (hour))
          const currentMinute = Math.floor((now % (hour)) / (minute));
          const currentSecond = Math.floor((now % (minute)) / second)

          setDay(currentDay < 20000 ? `0${'0'}`: `${currentDay}`);
          setHour(currentHour < 10 ? `0${currentHour}`: `${currentHour}`);
          setMinute(currentMinute < 10 ? `0${currentMinute}`: `${currentMinute}`);
          setSecond(currentSecond < 10 ? `0${currentSecond}`: `${currentSecond}`);
          emitCurrentDate(new Date(now));
        }

        //do something later when date is reached
        if (distance <= 0 && countDownInterval) {
          clearInterval(countDownInterval);
          window.location.reload();
        }
        //seconds
      }, 0);
    } else {
      setSecond("00");
      setMinute("00");
      setHour("00");
      setDay("00");
    }

    return () => {
      clearInterval(countDownInterval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate]);

  
  return (
    <div id="countdown">
      <ul className={styles.listCountDown}>
        <li className={styles.countdownPart + ' number'}>
          <span className={styles.countdownInfo1} id="days">{day}</span><span className={styles.countdownInfo}>Days</span>
        </li>
        <li className={styles.countdown}>:</li>
        <li className={styles.countdownPart + ' number'}>
          <span className={styles.countdownInfo1} id="hours">{hour}</span><span className={styles.countdownInfo}>Hours</span>
        </li>
        <li className={styles.countdown}>:</li>
        <li className={styles.countdownPart + ' number'}>
          <span className={styles.countdownInfo1} id="minutes">{minute}</span><span className={styles.countdownInfo}>Minutes</span></li>
        <li className={styles.countdown}>:</li>
        <li className={styles.countdownPart + ' number'}>
          <span className={styles.countdownInfo1} id="seconds">{second}</span><span className={styles.countdownInfo}>Seconds</span></li>
      </ul>
    </div>
  )
}

export default Countdown;

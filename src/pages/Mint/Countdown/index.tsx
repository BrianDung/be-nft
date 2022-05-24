import { useCallback, useEffect, useState } from 'react';
import { unixToDate } from 'utils/convertDate';
import useStyles from './style';

type CountDownProps = {
  currentDate: number | string;
  startDate: number | string;
  getCurrentDateRealTime?: (currentDate: Date) => void;
  landingPage?: boolean;
};

function getTimer() {
  let previousTime = performance?.now?.() ?? 0;

  return {
    elapsed: !performance?.now ? 1000 : 0,
    getInterval: function () {
      if (!performance?.now) {
        return 1000;
      }

      const diff = performance.now() - previousTime;
      previousTime = performance.now();

      return diff;
    },
  };
}

const Countdown = (props: CountDownProps) => {
  const { startDate, currentDate, getCurrentDateRealTime, landingPage } = props;
  const styles = useStyles({ landingPage });
  const [second, setSecond] = useState('0');
  const [minute, setMinute] = useState('0');
  const [hour, setHour] = useState('0');
  const [day, setDay] = useState('0');

  const emitCurrentDate = useCallback(
    (now: Date) => {
      getCurrentDateRealTime && getCurrentDateRealTime(now);
    },
    [getCurrentDateRealTime]
  );

  useEffect(() => {
    function updateCountdown(now: number, countDownInterval: any) {
      let distance = countDown - now;

      if (distance >= 0) {
        const currentDay = Math.floor(distance / day);
        const currentHour = Math.floor((distance % day) / hour);
        const currentMinute = Math.floor((distance % hour) / minute);
        const currentSecond = Math.floor((distance % minute) / second);

        setDay(currentDay < 10 ? `0${currentDay}` : `${currentDay}`);
        setHour(currentHour < 10 ? `0${currentHour}` : `${currentHour}`);
        setMinute(currentMinute < 10 ? `0${currentMinute}` : `${currentMinute}`);
        setSecond(currentSecond < 10 ? `0${currentSecond}` : `${currentSecond}`);
        emitCurrentDate(new Date(now));
      }

      //do something later when date is reached
      if (distance <= 0 && countDownInterval) {
        clearInterval(countDownInterval);
        window.location.reload();
      }
      //seconds
    }

    const nextRoundDate = unixToDate(startDate);
    let now = currentDate ? new Date(currentDate).getTime() : 0;
    if (!nextRoundDate || nextRoundDate.getTime() < now || !currentDate) {
      setSecond('00');
      setMinute('00');
      setHour('00');
      setDay('00');

      return;
    }

    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    let countDown = nextRoundDate.getTime();
    const timer = getTimer();

    const countDownInterval = setInterval(() => {
      now += timer.getInterval();
      updateCountdown(now, countDownInterval);
    }, timer.elapsed);

    return () => {
      clearInterval(countDownInterval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, currentDate]);

  return (
    <div id="countdown">
      <ul className={styles.listCountDown}>
        <li className={styles.countdownPart + ' number'}>
          <span className={styles.countdownInfo1} id="days">
            {day}
          </span>
          <span className={styles.countdownInfo}>days</span>
        </li>
        <li className={styles.countdown}>:</li>
        <li className={styles.countdownPart + ' number'}>
          <span className={styles.countdownInfo1} id="hours">
            {hour}
          </span>
          <span className={styles.countdownInfo}>hrs</span>
        </li>
        <li className={styles.countdown}>:</li>
        <li className={styles.countdownPart + ' number'}>
          <span className={styles.countdownInfo1} id="minutes">
            {minute}
          </span>
          <span className={styles.countdownInfo}>mins</span>
        </li>
        <li className={styles.countdown}>:</li>
        <li className={styles.countdownPart + ' number'}>
          <span className={styles.countdownInfo1} id="seconds">
            {second}
          </span>
          <span className={styles.countdownInfo}>secs</span>
        </li>
      </ul>
    </div>
  );
};

export default Countdown;

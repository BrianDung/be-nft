/* eslint-disable import/no-anonymous-default-export */

export default ({ active = false }) => {
  const opacity = active ? '1' : ' 0.4';
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" opacity={opacity}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.3314 11.9167L10.4285 17.3338L15.665 10.0833H10.6697L11.5725 4.66616L6.33607 11.9167H11.3314ZM14.0241 1.10877C14.1833 0.153021 12.944 -0.364121 12.3767 0.421375L3.80017 12.2966C3.36235 12.9028 3.79551 13.75 4.54329 13.75H9.16719L7.97698 20.8912C7.81769 21.8469 9.057 22.3641 9.6243 21.5786L18.2009 9.70335C18.6387 9.09713 18.2055 8.24998 17.4577 8.24998H12.8339L14.0241 1.10877Z"
        fill="white"
      />
    </svg>
  );
};

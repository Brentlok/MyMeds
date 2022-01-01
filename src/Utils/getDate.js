export const getToday = () => {
  const today = new Date();
  const date = today.getDate();
  const month = monthList[today.getMonth()];
  return {date, month};
};

export const isToday = date => {
  if (!date.getDate) {
    date = new Date(date);
  }
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const getNow = () => {
  const now = new Date();
  return {hours: now.getHours(), minutes: now.getMinutes()};
};

export const getDateList = date => {
  const dayList = [];
  const dayInMilis = 86400000;
  const today = date || new Date();
  for (let i = 0; i < 7; i++) {
    dayList.push(
      getDayObject(new Date(today - dayInMilis * 3 + dayInMilis * i)),
    );
  }
  return dayList;
};

const monthList = [
  'Styczeń',
  'Luty',
  'Marzec',
  'Kwiecień',
  'Maj',
  'Czerwiec',
  'Lipiec',
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
];

const getDayObject = date => {
  return {
    date: date.getDate(),
    month: monthList[date.getMonth()].slice(0, 3),
  };
};

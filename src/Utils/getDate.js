export const getToday = () => {
  const today = new Date();
  const date = today.getDate();
  const month = monthList[today.getMonth()];
  return {date, month};
};

export const getDateList = date => {
  const dayList = [];
  const dayInMilis = 86400000;
  const today = date || new Date();
  for (let i = 0; i < 5; i++) {
    dayList.push(
      getDayObject(new Date(today - dayInMilis * 2 + dayInMilis * i)),
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
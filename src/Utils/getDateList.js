const getDateList = date => {
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
  'Sty',
  'Lut',
  'Mar',
  'Kwi',
  'Cze',
  'Lip',
  'Sie',
  'Wrz',
  'Paz',
  'Lis',
  'Gru',
];

const getDayObject = date => {
  return {
    date: date.getDate(),
    month: monthList[date.getMonth() - 1],
  };
};

export default getDateList;

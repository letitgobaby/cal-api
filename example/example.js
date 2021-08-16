var dayjs = require("dayjs");
var CalAPI = require('../src/index');


var tempHoliday = [
  {
    dateName: "1월 1일",
    month: 1,
    date: 1,
    isLunar: false,
    bufferDay: false
  },
  {
    dateName: "설날",
    month: 1,
    date: 1,
    isLunar: true,
    bufferDay: true
  },
  {
    dateName: "추석",
    month: 8,
    date: 15,
    isLunar: true,
    bufferDay: true
  },
  {
    dateName: "설날",
    month: 1,
    date: 1,
    isLunar: true,
    bufferDay: true
  },
  {
    dateName: "추석",
    month: 8,
    date: 15,
    isLunar: true,
    bufferDay: true
  },
  {
    dateName: "설날",
    month: 1,
    date: 1,
    isLunar: true,
    bufferDay: true
  },
  {
    dateName: "추석",
    month: 8,
    date: 15,
    isLunar: true,
    bufferDay: true
  },
  {
    dateName: "설날",
    month: 1,
    date: 1,
    isLunar: true,
    bufferDay: true
  },
  {
    dateName: "추석",
    month: 8,
    date: 15,
    isLunar: true,
    bufferDay: true
  },
  {
    dateName: "설날",
    month: 1,
    date: 1,
    isLunar: true,
    bufferDay: true
  },
  {
    dateName: "추석",
    month: 8,
    date: 15,
    isLunar: true,
    bufferDay: true
  },
];

var cal = new CalAPI(tempHoliday);

console.time("year");
// for (var i = 0; i < 12*50; i++) {
//   cal.yearCalendar(2021 + i);
// }

// console.log( cal.monthCalendar(2021, 2) );

console.log( cal.yearCalendar(2021));

// console.log( yearHoliday(2021, tempHoliday));
// console.log( cal.yearHoliday(2021, tempHoliday) );

console.timeEnd("year");

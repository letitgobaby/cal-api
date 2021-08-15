// var {
//   yearCalendar,
//   yearHoliday,
//   monthCalendar
// } = require('../src/index');

var Calendar = require('../src/index');


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
];

var cal = new Calendar(tempHoliday);





console.time("year");
// for (var i = 0; i < 12*50; i++) {
//   monthCalendar(2021 + i, 1, tempHoliday);
// }
console.log( cal.monthCalendar(2021, 2) );

// console.log( yearCalendar(2021, tempHoliday));

// console.log( yearHoliday(2021, tempHoliday));
console.log( cal.yearHoliday(2021, tempHoliday) );
console.timeEnd("year");

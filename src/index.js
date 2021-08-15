var dayjs = require("dayjs");
require('dayjs/locale/ko')
require("./moment-lunar");

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



function yearCalendar(year, hList) {
  var result = [];
  for (var i = 1; i < 13; i++) {
    result.push(monthCalendar(year, i, hList));
  }

  return result;
}


function monthCalendar(year, month, hList) {
  var dObj = dayjs([year, month]);
  if (!dObj.isValid()) {
    return null;
  }

  var mArr = [],
      count = 1,
      firstDayOfWeek = dObj.startOf('month').day(),
      lDay = dObj.endOf("month").date();

  while (count <= lDay) {
    var wArr = [];
    if (count === 1) {
      wArr = [ ...getFirstList(dObj, firstDayOfWeek, hList) ];
    } 
    
    for (var j = firstDayOfWeek; j < 7; j++) {
      if (count <= lDay) {
        var obj = buildObject(dObj, count++, j, hList);
        wArr.push(obj);
      } else {
        wArr = [ ...wArr, ...getLastList(dObj, hList) ];
        break;
      }
    }

    firstDayOfWeek = 0;
    mArr.push(wArr);
  }

  return mArr;
}



function getFirstList(dObj, fDay, hList) {
  var result = [];
  var pDate = dObj.subtract(1, 'month');
  for (var i = 0; i < fDay; i++) {
    var date = pDate.endOf('month').date() - i,
        dayOfWeek = (fDay - 1) - i,
        obj = buildObject(pDate, date, dayOfWeek, hList);

    result.push(obj);
  }

  result.sort(function (a, b) {
    if (a.dayOfWeek > b.dayOfWeek) return 1;

    if (a.dayOfWeek < b.dayOfWeek) return -1;

    return 0;
  });

  return result.sort();
}



function getLastList(date, hList) {
  var result = [],
      dObj = date.add(1, 'month'),
      firstDayOfNextDate = dObj.startOf('month').day();

  var count = 1;
  for (var i = firstDayOfNextDate; i < 7; i++) {
    var obj = buildObject(dObj, count++, i, hList);
    result.push(obj);
  }

  return result;
}



function buildObject(dObj, date, dayOfWeek, hList) {
  var obj = {
    year: dObj.year(),
    month: dObj.month() + 1,
    date: date,
    dayOfWeek: dayOfWeek,
    holidayName: "none"
  }

  var tempObj = dayjs([ obj.year, obj.month, obj.date ]);
  for (var i = 0; i < hList.length; i++) {
    if (checkHoliday(hList[i], tempObj)) {
      obj.holidayName = hList[i].dateName; break;
    }
  }

  obj.fullDate = tempObj.format("YYYYMMDD");
  obj.lunarDate = tempObj.lunar().format("YYYYMMDD");

  return obj;
}



function checkHoliday(holiday, dObj) {
  var obj = dObj;
  if (holiday.isLunar) {
    obj = dObj.solar();
  }

  if (holiday.month === obj.month && holiday.date === obj.date) {
    return true;
  }
  return false;
}





function yearHoliday(year, hList) {
  var result = [];
  for (var i = 0; i < hList.length; i++) {
    var dObj = dayjs([year, hList[i].month, hList[i].date]);

    if (hList[i].isLunar) {
      dObj = dObj.solar();
    }

    if (hList[i].bufferDay) {
      var prevDate = dObj.subtract(1, "days");
      result.push(buildHolidayObject(prevDate, hList[i]));

      var nextDate = dObj.add(1, "days");
      result.push(buildHolidayObject(nextDate, hList[i]));
    }

    result.push(buildHolidayObject(dObj, hList[i]));
  }
  
  return result;
}


function buildHolidayObject(dObj, holiday) {
  return {
    year: dObj.year(),
    month: dObj.month() + 1,
    date: dObj.date(),
    fullDate: dObj.format("YYYYMMDD"),
    dateName: holiday.dateName
  }
}



console.time("year");
// for (var i = 0; i < 12*50; i++) {
//   getMonthCalendar(2021 + i, 1, tempHoliday);
// }
// console.log( getMonthCalendar(2021, 1, tempHoliday) );
// console.log( yearCalendar(2021, tempHoliday));
console.log( yearHoliday(2021, tempHoliday));
// yearHoliday(2021, tempHoliday)
console.timeEnd("year");







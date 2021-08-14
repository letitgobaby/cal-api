var dayjs = require("dayjs");
require('dayjs/locale/ko')
require("./moment-lunar");

// // convert to 1995-02-09 (1995/03/09 was 1995/02/29 in lunar calendar)
// var test1 = dayjs(new Date("2021-08-20")).lunar().format('YYYY-MM-DD');



function getMonthCalendar(year, month, holidayList) {

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
      wArr = [ ...getFirstList(dObj, firstDayOfWeek) ];
    } 
    
    for (var j = firstDayOfWeek; j < 7; j++) {
      if (count <= lDay) {
        var obj = getDateObject(dObj, count++, j);
        wArr.push(obj);
      } else {
        wArr = [ ...wArr, ...getLastList(dObj) ];
        break;
      }
    }

    firstDayOfWeek = 0;
    mArr.push(weekArr);
  }

  console.log( mArr, mArr.length );
  return mArr;
}



function getFirstList(dObj, fDay) {
  var result = [];
  var pDate = dObj.subtract(1, 'month');
  for (var i = 0; i < fDay; i++) {
    var date = pDate.endOf('month').date() - i,
        dayOfWeek = (fDay - 1) - i,
        obj = getDateObject(pDate, date, dayOfWeek);
    result.push(obj);
  }

  result.sort(function (a, b) {
    if (a.dayOfWeek > b.dayOfWeek) {
      return 1;
    }
    if (a.dayOfWeek < b.dayOfWeek) {
      return -1;
    }
    return 0;
  });

  return result.sort();
}



function getLastList(date) {
  var result = [],
      dObj = date.add(1, 'month'),
      firstDayOfNextDate = dObj.startOf('month').day();

  var count = 1;
  for (var i = firstDayOfNextDate; i < 7; i++) {
    var obj = getDateObject(dObj, count++, i);
    result.push(obj);
  }

  return result;
}




function getDateObject(dObj, date, dayOfWeek) {
  var obj = {
    year: dObj.year(),
    month: dObj.month() + 1,
    date: date,
    dayOfWeek: dayOfWeek,
    isHoliday: "none"
  }

  obj.fullDate = dayjs([
    obj.year, obj.month, obj.date
  ]).format("YYYYMMDD");
  
  return obj;
}



getMonthCalendar(2021, 8);

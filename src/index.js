var dayjs = require("dayjs");
require("./dayjs-lunar");



class Calendar {
  constructor(holidayList) {
    this.holidayList = holidayList;
  }

  yearCalendar(year, hList) {
    var result = [];
    for (var i = 1; i < 13; i++) {
      result.push(this.monthCalendar(year, i));
    }

    return result;
  }

  monthCalendar(year, month) {
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
        wArr = [ ...this.getFirstList(dObj, firstDayOfWeek) ];
      } 
      
      for (var j = firstDayOfWeek; j < 7; j++) {
        if (count <= lDay) {
          var obj = this.buildDateObject(dObj, count++, j);
          wArr.push(obj);
        } else {
          wArr = [ ...wArr, ...this.getLastList(dObj) ];
          break;
        }
      }

      firstDayOfWeek = 0;
      mArr.push(wArr);
    }

    return mArr;
  }

  getFirstList(dObj, fDay) {
    var result = [];
    var pDate = dObj.subtract(1, 'month');
    for (var i = 0; i < fDay; i++) {
      var date = pDate.endOf('month').date() - i,
          dayOfWeek = (fDay - 1) - i,
          obj = this.buildDateObject(pDate, date, dayOfWeek);

      result.push(obj);
    }

    result.sort(function (a, b) {
      if (a.dayOfWeek > b.dayOfWeek) return 1;
      if (a.dayOfWeek < b.dayOfWeek) return -1;
      return 0;
    });

    return result.sort();
  }

  getLastList(date) {
    var result = [],
        dObj = date.add(1, 'month'),
        firstDayOfNextDate = dObj.startOf('month').day();

    var count = 1;
    for (var i = firstDayOfNextDate; i < 7; i++) {
      var obj = this.buildDateObject(dObj, count++, i);
      result.push(obj);
    }

    return result;
  }

  buildDateObject(dObj, date, dayOfWeek) {
    var obj = {
      year: dObj.year(),
      month: dObj.month() + 1,
      date: date,
      dayOfWeek: dayOfWeek,
      holidayName: "none"
    }

    var tempObj = dayjs([ obj.year, obj.month, obj.date ]);
    for (var i = 0; i < this.holidayList.length; i++) {
      if (this.checkHoliday(this.holidayList[i], tempObj)) {
        obj.holidayName = this.holidayList[i].dateName; break;
      }
    }

    obj.fullDate = tempObj.format("YYYYMMDD");
    obj.lunarDate = tempObj.lunar().format("YYYYMMDD");

    return obj;
  }

  checkHoliday(holiday, dObj) {
    var obj = dObj;
    if (holiday.isLunar) {
      obj = dObj.lunar();
    }

    if (holiday.month === (obj.month() + 1) 
      && holiday.date === obj.date()) {
      return true;
    }
    return false;
  }

  yearHoliday(year) {
    var result = [];
    var hList = this.holidayList;
    for (var i = 0; i < hList.length; i++) {
      var dObj = dayjs([year, hList[i].month, hList[i].date]);
  
      if (hList[i].isLunar) {
        dObj = dObj.solar();
      }
  
      if (hList[i].bufferDay) {
        var prevDate = dObj.subtract(1, "days");
        result.push(this.buildHolidayObject(prevDate, hList[i]));
  
        var nextDate = dObj.add(1, "days");
        result.push(this.buildHolidayObject(nextDate, hList[i]));
      }
  
      result.push(this.buildHolidayObject(dObj, hList[i]));
    }
    
    return result;
  }
  
  buildHolidayObject(dObj, holiday) {
    return {
      year: dObj.year(),
      month: dObj.month() + 1,
      date: dObj.date(),
      fullDate: dObj.format("YYYYMMDD"),
      dateName: holiday.dateName
    }
  }

}


module.exports = Calendar;

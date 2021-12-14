import dayjs from 'dayjs';
import "./dayjs-lunar.js";

declare module "dayjs" {
  interface Dayjs {
    lunar(): dayjs.Dayjs;
    solar(): dayjs.Dayjs;
  }
}

type HolidayType = {
  dateName: string;
  month: number;
  date: number;
  isLunar: boolean;
  bufferDay: boolean;
}

type ConfigType = {
  holidayList: Array<HolidayType>;
  lunar: boolean;
}

type DateObjectType = {
  year: number;
  month: number;
  date: number,
  dayOfWeek: number;
  holidayName: string;
  fullDate: string;
  lunarDate: string; 
}

const defaults: ConfigType = {
  holidayList: [],
  lunar: false
};

class CalAPI {

  private config: ConfigType;

  constructor(config: ConfigType) {
    this.config = Object.assign({}, defaults, config);
  }

  yearCalendar(
    year: number = new Date().getUTCFullYear()
  ) {
    var result = [];
    for (var i = 1; i < 13; i++) {
      result.push(this.monthCalendar(year, i));
    }

    return result;
  }

  monthCalendar(
    year: number = new Date().getUTCFullYear(), 
    month: number = new Date().getUTCMonth()
  ) {
    var dObj: dayjs.Dayjs = dayjs(new Date(year, month - 1));
    if (!dObj.isValid()) {
      return null;
    }

    var mArr = [],
        count = 1,
        firstDayOfWeek = dObj.startOf('month').day(),
        lDay = dObj.endOf("month").date();

    while (count <= lDay) {
      var wArr: Array<DateObjectType> = [];
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

  private getFirstList(dObj: dayjs.Dayjs, fDay: number) {
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

  private getLastList(date: dayjs.Dayjs) {
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

  private buildDateObject(dObj: dayjs.Dayjs, date: number, dayOfWeek: number): DateObjectType {
    var obj = {
      year: dObj.year(),
      month: dObj.month() + 1,
      date: date,
      dayOfWeek: dayOfWeek,
      holidayName: "none",
      fullDate: "",
      lunarDate: ""
    }

    var tempObj = dayjs(new Date(obj.year, obj.month - 1, obj.date));
    obj.fullDate = tempObj.format("YYYYMMDD");

    if (this.config.lunar) obj.lunarDate = tempObj.lunar().format("YYYYMMDD");

    for (var i = 0; i < this.config.holidayList.length; i++) {
      if (this.checkHoliday(this.config.holidayList[i], tempObj)) {
        obj.holidayName = this.config.holidayList[i].dateName; 
        break;
      }
    }

    return obj;
  }

  private checkHoliday(holiday: HolidayType, dObj: dayjs.Dayjs) {
    var tempDateObject = dObj;

    if (holiday.bufferDay) {
      var prevDate = tempDateObject.subtract(1, "days");
      var nextDate = tempDateObject.add(1, "days");
      if (this.matchHoliday(holiday, prevDate)) {
        return true;
      } else if (this.matchHoliday(holiday, nextDate)) {
        return true;
      } 
    }

    return this.matchHoliday(holiday, tempDateObject);
  }

  private matchHoliday(holiday: HolidayType, dObj: dayjs.Dayjs) {
    var tempDateObject = dObj;
    var hDate = dayjs(new Date(dObj.year(), holiday.month - 1, holiday.date));
    if (holiday.isLunar) {
      tempDateObject = tempDateObject.lunar();
    }
    return tempDateObject.isSame(hDate);
  }

  yearHoliday(
    year = new Date().getUTCFullYear()
  ) {
    var result = [];
    var hList = this.config.holidayList;
    for (var i = 0; i < hList.length; i++) {
      var dObj = dayjs(new Date(year, hList[i].month - 1, hList[i].date));
  
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
  
  private buildHolidayObject(dObj: dayjs.Dayjs, holiday: HolidayType) {
    return {
      year: dObj.year(),
      month: dObj.month() + 1,
      date: dObj.date(),
      fullDate: dObj.format("YYYYMMDD"),
      dateName: holiday.dateName
    }
  }

}


export = CalAPI;


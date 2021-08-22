import { default as CalAPI } from '../dist/index';


const tempHoliday = [
  {
    dateName: "1월 1일",
    month: 1,
    date: 1,
    isLunar: false,
    bufferDay: false
  }
];


const cal: CalAPI = new CalAPI({
  holidayList: tempHoliday,
  lunar: true
});
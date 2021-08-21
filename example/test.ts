import { default as CalAPI } from '../dist/index';


const tempHoliday = [
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


const cal = new CalAPI({
  holidayList: tempHoliday,
  lunar: true
});
const calendar = require("../lib/calendar");
const moment = require("moment")

const getWeekCalendar = () => {
  const startOfWeek = moment().day(1).toDate();
  const endOfWeek = moment().day(6).toDate();
  return calendar.filter((day) => {
    const date = moment(new Date(day.date)).toDate()
    if (date >= startOfWeek && date <= endOfWeek) {
      return day
    }
  })
}

const getTodayCalendar = () => {
  const today = moment().add(1, 'days').format('YYYY-MM-DD')
  return calendar.find(day => {
    const date = moment(new Date(day.date)).format('YYYY-MM-DD')
    if (date === today) {
      return day
    }
  })
}

//console.log(getTodayCalendar())

module.exports = { getWeekCalendar, getTodayCalendar }
const Scene = require("telegraf/scenes/base");
const Markup = require("telegraf/markup");
const Extra = require("telegraf/extra");
const todayCalendar = new Scene("today_calendar");

const { getTodayCalendar } = require("../lib/utils")
const moment = require("moment")

todayCalendar.enter(ctx => {
  try {

    const calendar = getTodayCalendar()
    let text = ``

    moment.locale('it')

    if (calendar.waste_to_expose !== '') {
      let dayOfTheWeek = moment(new Date(calendar.date)).subtract(1, 'days').format('dddd')
      dayOfTheWeek = `${dayOfTheWeek.charAt(0).toUpperCase()}${dayOfTheWeek.slice(1)}`
      text =
        `*Cosa esporre oggi?*\n\n` +
        `Oggi è *${dayOfTheWeek}*\n` +
        `Devi esporre: *${calendar.waste_to_expose}*\n` +
        `Orario di esposizione: *20:00 - 24:00*`;
    } else {
      text = `*Cosa esporre oggi?*\n\n` +
        `Oggi è *Sabato*\nI nostri operatori ecologici il sabato non raccolgono i rifiuti per la domenica. Anche loro hanno diritto ad una pausa.\n`
    }

    ctx.replyWithMarkdown(text, Extra.markdown().markup(
      Markup.inlineKeyboard(
        [Markup.callbackButton("Cosa butto oggi?", "today_calendar"), Markup.callbackButton("Mostrami il calendario", "show_calendar")], {
        columns: 1
      }
      )));
  } catch (err) {
    console.error(err);
  }
});

todayCalendar.action("today_calendar", ctx => ctx.scene.enter("today_calendar"));
todayCalendar.action("show_calendar", ctx => ctx.scene.enter("show_calendar"));

module.exports = todayCalendar;
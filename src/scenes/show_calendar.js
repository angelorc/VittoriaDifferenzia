const Scene = require("telegraf/scenes/base");
const Markup = require("telegraf/markup");
const Extra = require("telegraf/extra");
const showCalendar = new Scene("show_calendar");

const { getWeekCalendar } = require("../lib/utils")
const moment = require("moment")


showCalendar.enter(ctx => {
  try {

    const textCalendar = getWeekCalendar().map((data) => {
      return `${moment(new Date(data.date)).format('DD/MM')} - ${data.waste_to_expose}\n`
    }).join("")

    const lastUpdateAt = `_Ultimo aggiornamento: 31/01/2021_`

    const text =
      `🗓 *Calendario Settimanale*\n\n${textCalendar}\n${lastUpdateAt}`;

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

showCalendar.action("today_calendar", ctx => ctx.scene.enter("today_calendar"));
showCalendar.action("show_calendar", ctx => ctx.scene.enter("show_calendar"));

module.exports = showCalendar;
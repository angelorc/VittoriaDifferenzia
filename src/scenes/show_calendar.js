const Scene = require("telegraf/scenes/base");
const Markup = require("telegraf/markup");
const Extra = require("telegraf/extra");
const calendar = require("../lib/calendar");
const showCalendar = new Scene("show_calendar");

showCalendar.enter(ctx => {
  try {

    const textCalendar = calendar.map((data) => {
      return `${data.day_of_the_week} - ${data.waste_to_expose}\n`
    }).join("")

    const lastUpdateAt = `_Ultimo aggiornamento: 20/04/2020_`

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
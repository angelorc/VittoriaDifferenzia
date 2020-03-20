const Scene = require("telegraf/scenes/base");
const Markup = require("telegraf/markup");
const calendar = require("../lib/calendar");
const showCalendar = new Scene("show_calendar");

showCalendar.enter(async ctx => {
  try {

    const textCalendar = calendar.map((data) => {
      return `${data.day_of_the_week} - ${data.waste_to_expose}\n`
    }).join("")

    console.log(textCalendar)

    const text =
      `🗓 *Calendario Settimanale*\n\n${textCalendar}`;

    ctx.replyWithMarkdown(text, Markup.inlineKeyboard([
      [
        Markup.callbackButton("Cosa butto oggi?", "today_calendar")
      ],
      [Markup.callbackButton("Mostrami il calendario", "show_calendar")],
      [
        Markup.callbackButton("Info", "info"),
      ]
    ]));
  } catch (err) {
    console.error(err);
  }
});

showCalendar.action("today_calendar", ctx => ctx.scene.enter("today_calendar"));
showCalendar.action("show_calendar", ctx => ctx.scene.enter("show_calendar"));

module.exports = showCalendar;
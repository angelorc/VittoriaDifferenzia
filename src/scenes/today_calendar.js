const Scene = require("telegraf/scenes/base");
const Markup = require("telegraf/markup");
const Extra = require("telegraf/extra");
const calendar = require("../lib/calendar");
const todayCalendar = new Scene("today_calendar");

todayCalendar.enter(ctx => {
  try {

    const dayOfTheWeek = new Date().getDay() + 1;
    const wasteToExpose = calendar.find(c => c.index === dayOfTheWeek)

    const text =
      `*Cosa esporre oggi?*\n\n` +
      `Oggi è *${wasteToExpose.day_of_the_week}*\n` +
      `Devi esporre: *${wasteToExpose.waste_to_expose}*\n` +
      `Orario di esposizione: *20:00 - 24:00*`;

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
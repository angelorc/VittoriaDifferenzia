const Markup = require("telegraf/markup");
const Stage = require("telegraf/stage");
const Scene = require("telegraf/scenes/base");

const { enter } = Stage;
const User = require("../models/user");

const mainKeyboard = Markup.inlineKeyboard([
  Markup.callbackButton("Cosa butto oggi?", "today_calendar"),
  Markup.callbackButton("Mostrami il calendario", "show_calendar")
]).extra();

const initScene = new Scene("init");
initScene.enter(async ctx => {
  const user = await User.findOne({
    chat_id: ctx.from.id
  }).exec();

  if (!user) {
    const newUser = new User({
      chat_id: ctx.from.id,
      username: ctx.from.username,
      name: ctx.from.first_name + " " + ctx.from.last_name
    });

    await newUser.save();
  }

  if (user) {
    return await ctx.scene.enter("main");
  }

  await ctx.replyWithMarkdown(
    "Benvenuto su *VittoriaDifferenzia*.\nSono un semplice bot che ti ricorderà il *rifiuto da esporre oggi*.\n\n_Questo bot è open source ed dedicato alla città di Vittoria._",
    mainKeyboard
  );
});

initScene.action(
  "today_calendar",
  async ctx => await ctx.scene.enter("today_calendar")
);
initScene.action(
  "show_calendar",
  async ctx => await ctx.scene.enter("show_calendar")
);

module.exports = initScene;

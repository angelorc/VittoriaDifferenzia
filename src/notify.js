const Telegraf = require("telegraf");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Markup = require("telegraf/markup");
const Extra = require("telegraf/extra");
const calendar = require("./lib/calendar");

const User = require("./models/user");
const mongo_uri = `mongodb://localhost:27017/${process.env.MONGODB_NAME}?replicaSet=replica01`;

mongoose.connect(mongo_uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on("error", err => {
  console.error(
    `Error occured during an attempt to establish connection with the database: %O`,
    err
  );
  process.exit(1);
});

mongoose.connection.on("open", async () => {
  try {
    const bot = new Telegraf(process.env.BOT_TOKEN);
    const users = await User.find({});
    const totalUsers = users.length;

    const dayOfTheWeek = new Date().getDay();
    const wasteToExposeA = calendar.find(c => c.index === dayOfTheWeek)
    const wasteToExposeB = calendar.find(c => c.index === (dayOfTheWeek + 1 === 7 ? 0 : dayOfTheWeek + 1))

    if (wasteToExposeB.index !== 0) {
      const text =
        `*Cosa esporre oggi?*\n\n` +
        `Oggi è *${wasteToExposeA.day_of_the_week}*\n` +
        `Devi esporre: *${wasteToExposeB.waste_to_expose}*\n` +
        `Orario di esposizione: *20:00 - 24:00*`;

      let count = 0

      for (const user of users) {
        try {
          await bot.telegram.sendMessage(user.chat_id, text, Extra.markdown().markup(
            Markup.inlineKeyboard(
              [Markup.callbackButton("Cosa butto oggi?", "today_calendar"), Markup.callbackButton("Mostrami il calendario", "show_calendar")], {
                columns: 1
              }
            )))

          count++

          console.log(`${count}/${totalUsers}`)
        } catch (e) {
          console.error(e)
        }
      }
    }

    console.log('Send completed...')

    process.exit(1);
  } catch (e) {
    console.error(e)
  }
});
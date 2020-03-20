const Telegraf = require("telegraf");
const {
  TelegrafMongoSession
} = require("telegraf-session-mongodb");
const Stage = require("telegraf/stage");
const asyncWrapper = require("./utils/error-handler.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const showCalendar = require("./scenes/show_calendar");

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

const initScene = require("./scenes/init");

mongoose.connection.on("open", async () => {
  const bot = new Telegraf(process.env.BOT_TOKEN);

  const stage = new Stage([initScene, showCalendar]);

  TelegrafMongoSession.setup(bot, mongo_uri);

  bot.use(stage.middleware());
  bot.start(asyncWrapper(async ctx => ctx.scene.enter("init")));

  bot.launch();

  console.log(`Bot started...`);
});
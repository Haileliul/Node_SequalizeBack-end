import dbconfig from "../config/dbConfig.mjs";
import { Sequelize, DataTypes } from "sequelize";
import products from "./productModel.mjs";
import userInfos from "./userInfoModel.mjs";
import chatInfos from "./chatInfoModel.mjs";
import messages from "./messageInfoModel.mjs";
import attachments from "./attachmentsModel.mjs";
import emojis from "./emojisModel.mjs";
import notifications from "./notifications.mjs";
import blocked_users from "./blockedUsersModel.mjs";
import settings from "./settingsModel.mjs";
import call_logs from "./callLogsModel.mjs";
import voice_messages from "./voiceMessageModel.mjs";

const sequelize = new Sequelize(dbconfig.DB, dbconfig.USER, dbconfig.PASSWORD, {
  host: dbconfig.HOST,
  dialect: dbconfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbconfig.pool.max,
    min: dbconfig.pool.min,
    acquire: dbconfig.pool.acquire,
    idle: dbconfig.pool.idle,
  },
});

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log("Connected!!!");
//   })
//   .catch((error) => {
//     console.log("Error" + error);
//   });

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = products(sequelize, DataTypes);
db.userInfos = userInfos(sequelize, DataTypes);
db.chatInfos = chatInfos(sequelize, DataTypes);
db.messageInfos = messages(sequelize, DataTypes);
db.attachments = attachments(sequelize, DataTypes);
db.emojis = emojis(sequelize, DataTypes);
db.notifications = notifications(sequelize, DataTypes);
db.blocked_users = blocked_users(sequelize, DataTypes);
db.settings = settings(sequelize, DataTypes);
db.call_logs = call_logs(sequelize, DataTypes);
db.voice_messages = voice_messages(sequelize, DataTypes);

db.notifications = db.sequelize.sync({ force: false }).then(() => {
  console.log("yes the re-sync is done!!");
});

export default db;

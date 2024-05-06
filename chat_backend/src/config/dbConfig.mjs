// config.mjs

const config = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "H123b456789@@",
  DB: "chat",
  dialect: "mysql",

  pool: {
    max: 5,
    min: 0,
    acquire: 3000,
    idle: 10000,
  },
};

export default config;

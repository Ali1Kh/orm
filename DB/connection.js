import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("assignments", "root", "root", {
  host: "localhost",
  dialect: "mysql",
});

export const syncFn = async () => {
  await sequelize.sync();
};

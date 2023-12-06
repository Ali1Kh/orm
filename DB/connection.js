import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("sql8668289", "sql8668289", "VFiS4Heu5H", {
  host: "sql8.freesqldatabase.com",
  dialect: "mysql",
});

export const syncFn = async () => {
  await sequelize.sync();
};

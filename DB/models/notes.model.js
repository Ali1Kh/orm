import { sequelize } from "../connection.js";
import { DataTypes } from "sequelize";
import { User } from "./users.model.js";

export const Note = sequelize.define("notes", {
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.STRING, allowNull: false },
});


User.hasMany(Note);
Note.belongsTo(User);
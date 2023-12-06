import { User } from "../../../DB/models/users.model.js";
import { Op } from "sequelize";
// 1- sign up
export const signUp = async (req, res) => {
  let { name, email, password, age } = req.body;
  try {
    let results = await User.findAll({ where: { email } });
    if (results.length > 0) {
      return res.json({ success: false, message: "User is already exists" });
    }
    await User.create({ name, email, password, age });
    return res.json({ success: true, message: "Signed Up Successfully" });
  } catch (error) {
    return res.json({ success: false, message: "An Error Occurred" });
  }
};
// 2- sign in
export const login = async (req, res) => {
  let { email, password } = req.body;
  try {
    let results = await User.findAll({
      where: { [Op.and]: [{ email }, { password }] },
    });
    console.log(results);
    if (results.length == 1) {
      return res.json({ success: true, message: "Logged in Successfully" });
    } else {
      return res.json({ success: false, message: "Invaild Email or Password" });
    }
  } catch (error) {
    return res.json({ success: false, message: "An Error Occurred" });
  }
};
// 3- update user
export const updateUser = async (req, res) => {
  let { id } = req.params;
  let { name, email, password, age } = req.body;
  try {
    const rowCount = await User.update(
      { name, email, password, age },
      {
        where: {
          id,
        },
      }
    );
    if (rowCount[0] > 0) {
      return res.json({ success: true, message: "User Updated Successfully" });
    } else {
      return res.json({ success: false, message: "Failed To Update User" });
    }
  } catch (error) {
    return res.json({ success: false, message: "An Error Occurred" });
  }
};
// 4- delete user
export const deleteUser = async (req, res) => {
  let { id } = req.params;
  try {
    const rowCount = await User.destroy({
      where: { id },
    });
    if (rowCount > 0) {
      return res.json({ success: true, message: "User Deleted Successfully" });
    } else {
      return res.json({ success: false, message: "Failed To Delete User" });
    }
  } catch (error) {
    return res.json({ success: false, message: "An Error Occurred" });
  }
};
// 5- search for user where his name start with "a" and age less than 30 => using like for characters
export const searchChar = async (req, res) => {
  try {
    let { char } = req.query;
    const users = await User.findAll({
      where: { name: { [Op.startsWith]: char }, age: { [Op.lt]: 30 } },
    });
    return res.json({ success: true, result: users });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "An Error Occurred" });
  }
};
// 6- search for user where his age is between 20 and 30
export const searchAge = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { age: { [Op.between]: [20, 30] } },
    });
    return res.json({ success: true, result: users });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "An Error Occurred" });
  }
};
// 7 - get the 3 oldest users(اكبر ٣ مستخدمين فى العمر)
export const maxAge = async (req, res) => {
  try {
    const users = await User.findAll({
      order: [["age", "DESC"]],
      limit: 3,
    });
    return res.json({ success: true, result: users });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "An Error Occurred" });
  }
};
// 8- search for users by list of ids => using IN
export const searchIds = async (req, res) => {
  let { ids } = req.body;
  try {
    const users = await User.findAll({
      where: { id: { [Op.in]: ids } },
    });
    return res.json({ success: true, result: users });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "An Error Occurred" });
  }
};
// 9- get all user
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.json({ success: true, result: users });
  } catch (error) {
    return res.json({ success: false, message: "An Error Occurred" });
  }
};

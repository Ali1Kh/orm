import { Note } from "../../../DB/models/notes.model.js";
import { User } from "../../../DB/models/users.model.js";

// 1- add note
export const addNotes = async (req, res) => {
  try {
    let { title, content, userId } = req.body;
    let result = await User.findAll({ where: { id: userId } });
    if (result.length == 0) {
      return res.json({
        success: false,
        message: "Note Owner Not Found , Check User Id",
      });
    }
    await Note.create({ title, content, userId });
    return res.json({ success: true, message: "Note Added Successfully" });
  } catch (error) {
    return res.json({ success: false, message: "Failed To Add Notes" });
  }
};
// 2- delete note (note creator only )
export const deleteNote = async (req, res) => {
  try {
    let { id } = req.params;
    let { userId } = req.body;
    let results = await Note.destroy({ where: { id, userId } });
    if (results > 0) {
      return res.json({ success: true, message: "Note Deleted Successfuly" });
    } else {
      return res.json({
        success: false,
        message: "Invaild Note Id Or User Id",
      });
    }
  } catch (error) {
    return res.json({ success: false, message: "Faild To Delete Note" });
  }
};
// 3- update note (note owner only)
export const updateNote = async (req, res) => {
  try {
    let { id } = req.params;
    let { title, content, userId } = req.body;
    let results = await Note.update(
      { title, content },
      { where: { id, userId } }
    );
    if (results[0] > 0) {
      return res.json({ success: true, message: "Note Updated Successfuly" });
    } else {
      return res.json({
        success: false,
        message: "Invaild Note Id Or User Id",
      });
    }
  } catch (error) {
    return res.json({ success: false, message: "Faild To Update Note" });
  }
};
// 4- get all notes
export const getAllNotes = async (req, res) => {
  try {
    let results = await Note.findAll();
    return res.json({ success: true, results });
  } catch (error) {
    return res.json({ success: true, message: "Failed To Get Notes" });
  }
};
// 5- get all notes with their owners informaion (using include)
export const getNotesUsers = async (req, res) => {
  try {
    let results = await Note.findAll({ include: User });
    return res.json({ success: true, results });
  } catch (error) {
    return res.json({ success: true, message: "Failed To Get Notes" });
  }
};

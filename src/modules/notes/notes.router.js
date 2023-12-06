import { Router } from "express";
import {
  addNotes,
  deleteNote,
  getAllNotes,
  getNotesUsers,
  updateNote,
} from "./notes.controller.js";
const router = Router();
router.post("/", addNotes);
router.get("/", getAllNotes);
router.delete("/:id", deleteNote);
router.patch("/:id", updateNote);
router.get("/notesUsers", getNotesUsers);
export default router;

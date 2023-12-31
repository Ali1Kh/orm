import { Router } from "express";
import { deleteUser, getAllUsers, login, maxAge, searchAge, searchChar, searchIds, signUp, updateUser } from "./user.controller.js";
const router = Router();
router.get("/", getAllUsers);
router.post("/signup", signUp);
router.post("/login", login);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);
router.get("/keys", searchChar);
router.get("/searchAge", searchAge);
router.get("/maxAge", maxAge);
router.get("/searchIds", searchIds);
export default router;
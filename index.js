import express from "express";
import { syncFn } from "./DB/connection.js";
import userRouter from "./src/modules/users/user.router.js";
import notesRouter from "./src/modules/notes/notes.router.js";
const app = express();
const port = 3000;
app.use(express.json());
await syncFn();
app.use("/users", userRouter);
app.use("/notes", notesRouter);
app.listen(port);

export default app;
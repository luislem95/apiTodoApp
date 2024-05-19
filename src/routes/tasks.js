import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  getTasksCount,
  putTask,
} from "../controllers/tasks";

const router = Router();

router.get("/tasks", getTasks);
router.get("/tasks/count", getTasksCount);
router.get("/tasks/:id", getTask);
router.post("/tasks", createTask);
router.delete("/tasks/:id", deleteTask);
router.put("/tasks/:id", putTask);

export default router;

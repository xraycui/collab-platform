import { Router } from "express";
import { requireAuth } from "../middlewares/auth";
import { listTasks, createTask, updateTask, addComment, listComments } from "../controllers/taskController";

const router = Router({ mergeParams: true });

router.get("/:boardId/tasks", requireAuth, listTasks);
router.post("/:boardId/tasks", requireAuth, createTask);
router.patch("/tasks/:taskId", requireAuth, updateTask);
router.get("/tasks/:taskId/comments", requireAuth, listComments);
router.post("/:boardId/tasks/:taskId/comments", requireAuth, addComment);

export default router;

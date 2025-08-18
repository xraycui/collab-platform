import { Request, Response } from "express";
import { Task } from "../mongo/models/Task";
import { Comment } from "../mongo/models/Comment";
import { Types } from "mongoose";

export const listTasks = async (req: Request, res: Response) => {
  const boardId = req.params.boardId;
  const tasks = await Task.find({ boardId }).sort({ order: 1, createdAt: 1 });
  res.json({ tasks });
};

export const createTask = async (req: Request, res: Response) => {
  const { boardId } = req.params;
  const { title, description, status, assignees, dueDate, order } = req.body;
  const createdBy = req.user!.id;
  const task = await Task.create({
    boardId: new Types.ObjectId(boardId),
    title, description, status, assignees, dueDate, order, createdBy
  });
  res.status(201).json({ task });
};

export const updateTask = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const updates = req.body;
  const task = await Task.findByIdAndUpdate(new Types.ObjectId(taskId), updates, { new: true });
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.json({ task });
};

export const addComment = async (req: Request, res: Response) => {
  const { boardId, taskId } = req.params;
  const { body } = req.body;
  const authorId = req.user!.id;
  const comment = await Comment.create({
    boardId: new Types.ObjectId(boardId),
    taskId: new Types.ObjectId(taskId),
    authorId,
    body
  });
  res.status(201).json({ comment });
};

export const listComments = async (req: Request, res: Response) => {
  const { taskId } = req.params;
  const comments = await Comment.find({ taskId }).sort({ createdAt: 1 });
  res.json({ comments });
};

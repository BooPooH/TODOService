import { Request, Response, NextFunction } from 'express';
import { TaskModel } from './task.db';
import { taskSchema, taskUpdateSchema, taskStatusSchema } from './task.zod';

export class TaskController {
  static async createTask(req: Request, res: Response) {
    try {
      const parsedData = taskSchema.parse(req.body);
      const task = new TaskModel(parsedData);
      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Validation failed' });
    }
  }

  static async getTasks(req: Request, res: Response) {
    try {
      const tasks = await TaskModel.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async getTaskById(req: Request<{ id: string }>, res: Response) {
    try {
      const task = await TaskModel.findById(req.params.id);
      if (!task) return res.status(404).json({ error: 'Task not found' });
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  static async updateTask(req: Request<{ id: string }>, res: Response) {
    try {
      const parsedData = taskUpdateSchema.parse(req.body);
      const task = await TaskModel.findByIdAndUpdate(req.params.id, parsedData, { new: true });
      if (!task) return res.status(404).json({ error: 'Task not found' });
      res.json(task);
    } catch (error) {
      res.status(400).json({ error: error instanceof Error ? error.message : 'Validation failed' });
    }
  }

  static async deleteTask(req: Request<{ id: string }>, res: Response) {
    try {
      const task = await TaskModel.findByIdAndDelete(req.params.id);
      if (!task) return res.status(404).json({ error: 'Task not found' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  static async updateTaskStatus(req: Request<{ id: string }>, res: Response, next: NextFunction) {
    try {
      const { status } = taskStatusSchema.parse(req.body);
      const task = await TaskModel.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json(task);
    } catch (error) {
      next(error);
    }
  }
}
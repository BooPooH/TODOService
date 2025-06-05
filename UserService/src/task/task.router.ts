import { Router } from 'express';
import { TaskController } from './task.controller';

export const taskRouter = Router();

taskRouter.post('/', TaskController.createTask);
taskRouter.get('/', TaskController.getTasks);
taskRouter.get('/:id',  TaskController.getTaskById as any);
taskRouter.put('/:id',  TaskController.updateTask as any);
taskRouter.delete('/:id', TaskController.deleteTask as any);
taskRouter.post('/:id/status',TaskController.updateTaskStatus as any);

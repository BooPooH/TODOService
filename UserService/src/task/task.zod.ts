import { z } from 'zod';
import { TaskStatus } from './task.class';

export const taskSchema = z.object({
  description: z.string().min(3, 'Description must be at least 3 characters'),
  deadline: z.coerce.date().refine((date) => date > new Date(), {
    message: 'Deadline must be in the future',
  }),
  status: z.nativeEnum(TaskStatus).default(TaskStatus.NEW),
});

export const taskStatusSchema = z.object({
  status: z.nativeEnum(TaskStatus)
});

export const taskUpdateSchema = taskSchema.partial();
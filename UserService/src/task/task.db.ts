import mongoose, { Schema } from 'mongoose';
import { ITask, TaskStatus } from './task.class';

const taskSchema = new Schema<ITask>(
  {
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.NEW,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const TaskModel = mongoose.model<ITask>('Task', taskSchema);
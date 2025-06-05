export enum TaskStatus {
  NEW = 'new',
  COMPLETED = 'completed',
  OVERDUE = 'overdue'
}

export interface ITask {
  id: string;
  status: TaskStatus;
  deadline: Date;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

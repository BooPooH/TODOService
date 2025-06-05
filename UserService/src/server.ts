import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { taskRouter } from './task/task.router';

const PORT = 3001;
const MONGO_URI = 'mongodb://localhost:27017/taskdb';

class App {
  public app: Application;
  private readonly port: number | string;

  constructor(port: number | string = 3000) {
    this.app = express();
    this.port = port;

    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private initializeRoutes(): void {
    this.app.use('/api/', taskRouter);
    this.app.get('/', (req, res) => {
      res.status(200).json({ status: 'ok' });
    });
  }

  private initializeErrorHandling(): void {
    this.app.use((req, res) => {
      res.status(404).json({ message: 'Not found' });
    });
  }

  public async connectToDatabase(uri: string): Promise<void> {
    try {
      await mongoose.connect(uri);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Database connection error:', error);
      process.exit(1);
    }
  }

  public start(): void {
    this.app.listen(this.port, () => {
      console.log(`Server is running on http://localhost:${this.port}`);
    });
  }

  public getApp(): Application {
    return this.app;
  }
}

export default App;

const startServer = async () => {
  const app = new App(PORT);
  await app.connectToDatabase(MONGO_URI);
  app.start();
};

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
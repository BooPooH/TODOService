import express, { Application, Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';

interface ServerConfig {
  port: number;
}

class App {
  public app: Application;
  private config: ServerConfig;

  constructor(config: ServerConfig) {
    this.app = express();
    this.config = config;
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private initializeMiddlewares(): void {
    this.app.use(json());
  }

  private initializeRoutes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      res.send('Hello from TypeScript server!');
    });

    this.app.post('/api/data', (req: Request, res: Response) => {
      res.json({ received: req.body });
    });
  }

  public start(): void {
    this.app.listen(this.config.port, () => {
      console.log(`Server running on port ${this.config.port}`);
    });
  }
}

export default App;

const app = new App({ port: 3000 });
app.start();
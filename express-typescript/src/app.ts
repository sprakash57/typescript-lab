import express, { Request, Response, NextFunction } from 'express';
import todoRoutes from './routes/todos';

const app = express();

app.use(express.json());
app.use('/todos', todoRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.json({ message: err.message, status: '404' });
})

app.listen(6000, () => {
    console.log('Server running on port 6000');
})


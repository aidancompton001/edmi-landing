import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products';

const app = express();
const PORT = process.env['PORT'] || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use('/api/products', productsRouter);

app.listen(PORT, () => {
  console.log(`EDMI server running on port ${PORT}`);
});

export default app;

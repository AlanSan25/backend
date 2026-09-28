import express, { Express, Request, Response } from 'express';
const app: Express = express();
const port = process.env.PORT;

const products = [
  { id: 1, name: 'Producto 1', price: 10.99 },
  { id: 2, name: 'Producto 2', price: 19.99 },
  { id: 3, name: 'Producto 3', price: 5.99 },
];

// GET / -> Información de la API
app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'Backend',
    version: '1.0.0',
    description: 'API REST de ejemplo para el taller de Docker + Nginx',
  });
});

// GET / -> /health -> Estado del servicio 
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Backend-api',
  });
});


//GET /api/products -> lista de productos
app.get('/api/products', (req: Request, res: Response) => {
  res.json(products)
});

// GET /api/products/:id -> información de un producto específico
app.get('/api/products/:id', (req: Request, res: Response) => {
  const paramId = req.params.id;
  const id = parseInt(Array.isArray(paramId) ? paramId[0] : paramId, 10);
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  res.json(product);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
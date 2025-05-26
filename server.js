const express = require('express');
const cors = require('cors');
const { initDb } = require('./data/database');
const booksRoutes = require('./routes/books');
const authorsRoutes = require('./routes/authors');
const { swaggerUi, swaggerSpec } = require('./swagger');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/books', booksRoutes);
app.use('/authors', authorsRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`Swagger docs at http://localhost:${port}/api-docs`);

  });
});
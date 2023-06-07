const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('./helpers/error-handler');
const helmet = require('helmet');
const session = require('cookie-session');

//swagger 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(cors());
app.options('*', cors());

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

//Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(errorHandler);
app.use(helmet());
app.disable('x-powered-by');

const expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
app.use(session({
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'example.com',
    path: 'foo/bar',
    expires: expiryDate
  }
}))

// Routers
const todosRouter = require('./routers/todo.js');

const api = process.env.API_URL;

app.use('/todos', todosRouter);

const PORT = process.env.PORT || 3000;


// custom 404
app.use((req, res, next) => {
    res.status(404).send("This resource is not accessible!");
});
  
// Server
app.listen(PORT, () =>  {
    console.log('Server is running at http://localhost:'+ PORT);
});



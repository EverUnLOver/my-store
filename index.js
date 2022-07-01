const { config } = require('./config/config');

const express = require('express');
const cors = require('cors');
const routerApp = require('./routes');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler')

const app = express();
const port = config.port;

app.use(express.json());

const whiteist = ['http://localhost:8080', 'http://localhost:8081', 'http://localhost:8082']
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed'))
    }
  }
}
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello World!");
})

routerApp(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


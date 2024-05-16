const express = require('express') // NODE FRAMEWORK
const bodyParser = require('body-parser') // TO PARSE POST REQUEST
const cors = require('cors') // ALLOW CROSS ORIGIN REQUESTS
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('./config/global');
const app = express();
const http = require('http');
require('./Config/database');  // DATABASE CONNECTION
require("dotenv").config({path: "./.env"}) // Dotenv imported


// Middleware
app.use(cors())
app.use(express.json())
app.use('/ecommerce/images', express.static(__dirname + '/Assets/images'));

const server = http.createServer(app);

app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


// Response handler
app.use((req, res, next) => {
    const ResponseHandler = require('./Config/response_handler')
    res.handler = new ResponseHandler(req, res);
    next()
})

// Performing routes
try {
const appRoutes = require('./Routes/index')
appRoutes(app)
} catch (error) {
console.log("Route Crash -> ", error)
}


const PORT = process.env.PORT || 9000
const BACKEND_SERVER = process.env.BACKEND_SERVER_LINK

// Swagger-doc
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'ecommerce API Documentation',
        description: `Server is running on ${BACKEND_SERVER}`,
        version: '1.0.0',
      },
      servers: [
        {
          url: `http://localhost:5000`,
          description: 'This is my local Server',
        },
      ],
      securityDefinitions: {
        AuthToken: {
          type: 'apiKey',
          name: 'Authorization',
          in: 'header',
          description: 'Set Authorization Token it will be applied wherever Authorization is defined',
        },
      },      
    },
    apis: ['./Swagger/*.js'], // Specify the path to your route file(s)
  };

  const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


//server
server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})
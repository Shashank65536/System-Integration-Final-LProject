const express = require('express');
const port = 3000;
const mainRoutes = require('./routes/mainRoutes');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const bodyParser = require("body-parser");


const app = express();
app.use(express.json());
app.use('/azure-ai', mainRoutes);

const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Azure AI Language Text and Conversations Summarization",
        version: "0.1.0",
        description:
          "These are the APIs used for summarizing text and conversations using Azure AI language service.",

        contact: {
          name: "Shashank Bidwai",
          email: "sbidwai@uncc.edu",
        },
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
  );



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

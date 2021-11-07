const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const responseJson = require("./latest.json");

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false}));


//read
app.get('/getAll', (request, response) => {
   response.json(responseJson);
})

app.listen(process.env.PORT, () => console.log('app is running'));
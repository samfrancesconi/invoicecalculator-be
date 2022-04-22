const express = require('express');
const app = express();
const cors = require('cors');
const Datastore = require('nedb');
app.use(cors({
    origin: "*"
}))
app.listen(3000, ()=> {
    console.log('listening')
});

app.use(express.json());
const database = new Datastore('database.db');
database.loadDatabase();

app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        response.json(data)
    });
});

app.post('/api',(request, response) => {
    const showDetails = request.body;
    database.insert(showDetails);
    console.log('dataSaved succesfully');
    response.json({
        status: 'success',
        details: showDetails
    });
});


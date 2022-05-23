const express = require('express');
const app = express();
const cors = require('cors');
let database = require('./database');
let Show = require('./Show');
let Stage = require('./Stage');
let AccountingSheet = require('./AccountingSheet');
app.use(cors({
    origin: "*"
}));
app.listen(3000, ()=> {
    console.log('listening')
});
app.use(express.json());
database.loadDatabase();

app.post('/api/insert-show',(request, response) => {
    let showDetails = request.body;
    database.insert(new Show(showDetails.title, showDetails.company), function(err, newDoc){
        console.log(newDoc);
        response.json({
            status: 'success',
            details: newDoc
        });
    });
});

app.post(`/api/:showid/insert-stage`,(request, response) => {
    let stage = request.body;
    database.update({_id: request.params.showid}, {$push:{stages:new Stage(stage.amount, stage.date)}}, {}, function(err, numReplaced){
        numReplaced = 1
    }); 
        response.json({
            status:'success'
        })   
});

app.get(`/api/:showid/stages/calculateOutcomes`,(request, response) => {
    database.findOne({_id: request.params.showid}, function (err, docs) {
        let stats = (new AccountingSheet(docs.stages));
        database.update({_id: request.params.showid}, {$set:{"stats":stats.outcome}}, function (err, docs) {
            response.json({
                status:'success',
                details: stats
            })
        });
    });
});













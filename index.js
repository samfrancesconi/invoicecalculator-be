const express = require('express');
const app = express();
const cors = require('cors');
let database = require('./Database/database');
let Show = require('./Entities/Show');
let Stage = require('./Entities/Stage');
let ShowService = require('./Services/ShowService');
let port = process.env.PORT || 3000;
app.use(cors({
    origin: "*"
}));
app.listen(port, ()=> {
    console.log('listening')
});
app.use(express.json());
database.loadDatabase();


//controllers
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

app.post(`/api/:showid/insert-siae`,(request, response) => {
    let siae = request.body;
    database.update({_id: request.params.showid}, {$set: {siae: siae.amount}} ,{},function(err, docs){
        response.json({
            status:'success'
        });
    });    
});


app.get(`/api/:showid/stages/calculateOutcomes`,(request, response) => {
    database.findOne({_id: request.params.showid}, function (err, docs) {
        let stats = (new ShowService(docs.stages));
        database.update({_id: request.params.showid}, {$set:{"stats":stats.outcome}}, function (err, docs) {
            response.json({
                status:'success',
                details: stats
            })
        });
    });
});

app.get(`/api/shows/getAll`,(request, response) => {
    database.find({}, function (err, docs) {
        console.log(docs);
        response.json({
            status:'success',
            details: docs
        })
      });
})













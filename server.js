const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();


router.get('/', function(req, res) {
    console.log(path.join(__dirname + '/build/index.html'));
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private')
    next()
});
app.use(express.static(__dirname + '/'));
app.use('/', router);
app.listen(process.env.port || 3002);
console.log('Running at port 3002');
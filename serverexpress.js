const express = require('express');
const path = require('path');
const router = express.Router();

app = express()

router.get('/',(req,res) => {
    res.sendFile(path.join(__dirname+'/index.html'));
})


//add the router
app.use('/',router);
app.listen(3000);

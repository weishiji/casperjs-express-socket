var express = require('express');
var router = express.Router();


/* Rest */

router.post('/save_cookie', function(req, res) {
    console.log(req.body,'this is request')
    var b_session = req.body.b_session;
    var session = JSON.parse(b_session);
    res.send(session);
});
module.exports = router;

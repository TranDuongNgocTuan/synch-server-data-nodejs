var express = require('express');
var router = express.Router();
var model = require('../models/car-restaurent');

router.get("/restaurent", function (req, res) {
    model.selectAllRestaurent(function (rows) {
        console.log(rows)
        res.render('restaurent', { restaurent: rows });
    })
});

module.exports = router;
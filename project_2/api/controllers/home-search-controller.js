var express = require('express');
var router = express.Router();
var model = require('../models/tours');

router.get("/", function (req, res) {
    model.selectAllTourHoiAn("Hội An", function (rowsTours) {
        model.selectAllTour(function (rowAll){
             res.render('index', { tours: rowsTours, tourAll: rowAll});
        })
    })
});

module.exports = router;
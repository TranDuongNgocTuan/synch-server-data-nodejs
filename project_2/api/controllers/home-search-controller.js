var express = require('express');
var router = express.Router();
var model = require('../models/tours');

router.get("/", function (req, res) {
    model.selectAllTourHoiAn("Hội An", function (rowsTours) {
        res.render('index', { tours: rowsTours });
    })
});

module.exports = router;
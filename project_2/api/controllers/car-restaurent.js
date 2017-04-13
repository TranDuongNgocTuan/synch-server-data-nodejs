var express = require('express');
var router = express.Router();
var model = require('../models/car-restaurent');

router.get("/restaurent", function (req, res) {
    model.selectAllRestaurent(function (rows) {
        res.render('restaurent', { restaurent: rows });
    })
});

router.get("/car", function (req, res) {
    model.selectAllCar(function (rows) {
        res.render('car', { cars: rows });
    })
});

module.exports = router;
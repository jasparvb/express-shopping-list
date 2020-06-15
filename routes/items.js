const express = require("express");
const router = new express.Router();
const Item = require('../item');

router.get("/", function(req, res, next) {
  try {
    return res.json({items: Item.getItems()});
  } catch(e) {
    return next(e);
  }
});

router.post("/", function(req, res, next) {
  try {
    let newItem = new Item(req.body.name, req.body.price);
    return res.json({"added": {newItem}});
  } catch(e) {
    return next(e);
  }
});

router.get("/:name", function(req, res, next) {
  try {
    let item = Item.getItem(req.params.name);
    return res.json({item});
  } catch(e) {
    return next(e);
  }
});

router.patch("/:name", function(req, res, next) {
  try {
    let item = Item.updateItem(req.params.name, req.body);
    return res.json({"udpated": {item}});
  } catch(e) {
    return next(e);
  }
});

router.delete("/:name", function(req, res, next) {
  try {
    let item = Item.deleteItem(req.params.name);
    return res.json({message: "Deleted"});
  } catch(e) {
    return next(e);
  }
});

module.exports = router;
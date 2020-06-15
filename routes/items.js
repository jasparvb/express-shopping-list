const express = require("express");
const router = new express.Router();


router.get("/", function(req, res, next) {
  try {
    let items = Item.getItems();
    return res.json(items);
  } catch(e) {
    return next(e);
  }
});

router.post("/", function(req, res, next) {
  try {
    let items = Item.getItems();
    return res.json(items);
  } catch(e) {
    return next(e);
  }
});

router.get("/:name", function(req, res, next) {
  try {
    let items = Item.getItems();
    return res.json(items);
  } catch(e) {
    return next(e);
  }
});

router.patch("/:name", function(req, res, next) {
  try {
    let items = Item.getItems();
    return res.json(items);
  } catch(e) {
    return next(e);
  }
});

router.delete("/:name", function(req, res, next) {
  try {
    let items = Item.getItems();
    return res.json(items);
  } catch(e) {
    return next(e);
  }
});

module.exports = router;
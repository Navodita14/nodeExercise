const express = require("express");
const router = express.Router();
const {
  getAllResource,
  getResource,
  createResource,
  updateResource,
  deleteResource,
} = require("../controller/resource.controller");
router.route("/").get(getAllResource).post(createResource);
router
  .route("/:id")
  .get(getResource)
  .put(updateResource)
  .delete(deleteResource);

module.exports = router;

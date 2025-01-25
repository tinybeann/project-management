const express = require("express");
const multer = require('multer');
const router = express.Router();

const controller = require("../../controllers/admin/my-account.controller");

const uploadCloud = require("../../middlewares/admin/uploadCloud.middleware");

const validate = require("../../validates/admin/account.validate");

const upload = multer();

router.get("/", controller.index);

router.get("/edit/:id", controller.edit);

router.patch(
  "/edit/:id",
  upload.single('avatar'),
  uploadCloud.uploadSingle,
  validate.editPatch,
  controller.editPatch
)

module.exports = router;
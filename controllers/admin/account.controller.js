const Account = require("../../models/account.model");
const Role = require("../../models/role.model")
const md5 = require("md5");

const generateHelper = require("../../helpers/generate.helper");

const systemConfig = require("../../config/system");

// [GET] /admin/accounts/
module.exports.index = async (req, res) => {
  // Find
  let find = {
    deleted: false
  };
  // End Find
  
  const records = await Account.find(find);

  for (const record of records) {
    const roles = await Role.findOne({
      _id: record.role_id
    })
    record.roleTitle = roles.title;
  }

  res.render("admin/pages/accounts/index", {
    pageTitle: "Danh sách tài khoản",
    records: records
  });
}

// [GET] /admin/accounts/create
module.exports.create = async (req, res) => {
  const roles = await Role.find({
    deleted: false,
  });

  res.render("admin/pages/accounts/create", {
    pageTitle: "Tạo mới tài khoản",
    roles: roles
  })
}

// [POST] /admin/accounts/create
module.exports.createPost = async (req, res) => {
  req.body.password = md5(req.body.password);
  req.body.token = generateHelper.generateRandomString(30);

  const account = new Account(req.body);
  await account.save();

  res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
}
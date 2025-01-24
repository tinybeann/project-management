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

  req.flash("success", "Tạo tài khoản thành công!");
  res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
}

// [GET] /admin/accounts/edit/:id
module.exports.edit = async (req, res) => {
  try {
    const roles = await Role.find({
      deleted: false,
    });
  
    const id = req.params.id;

    const account = await Account.findOne({
      _id: id,
      deleted: false
    });

    res.render("admin/pages/accounts/edit", {
      pageTitle: "Chỉnh sửa tài khoản",
      roles: roles,
      account,
    })
  } catch(error) {
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
  }
}

// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    
    if(req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }
    
    await Account.updateOne({
      _id: id,
      deleted: false
    }, req.body);

    req.flash("success", "Cập nhật tài khoản thành công!");
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
    // res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
  } catch(error) {
    req.flash("error", "Cập nhật tài khoản thất bại!");
    res.redirect(`/${systemConfig.prefixAdmin}/accounts`);
  }
}


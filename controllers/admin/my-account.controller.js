const Account = require("../../models/account.model");
const Role = require("../../models/role.model")

const systemConfig = require("../../config/system");

// [GET] /admin/my-account/
module.exports.index = (req, res) => {
  res.render("admin/pages/my-account/index", {
    pageTitle: "Thông tin cá nhân"
  });
}

// [GET] /admin/my-account/edit/:id
module.exports.edit = async (req, res) => {
  const roles = await Role.find({
    deleted: false,
  });

  const id = req.params.id;

  const account = await Account.findOne({
    _id: id,
    deleted: false
  });

  if(account.token == req.cookies.token) {
    res.render("admin/pages/my-account/edit", {
      pageTitle: "Chỉnh sửa tài khoản",
      roles: roles,
      account,
    })
  } else {
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
  }

}
// [PATCH] /admin/accounts/edit/:id
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;
    if (req.body.password) {
      req.body.password = md5(req.body.password);
    } else {
      delete req.body.password;
    }

    await Account.updateOne({
      _id: id,
      deleted: false
    }, req.body);

    res.redirect(`/${systemConfig.prefixAdmin}/my-account`);
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/my-account`);
  }
}



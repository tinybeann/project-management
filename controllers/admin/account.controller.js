const Account = require("../../models/account.model");

// [GET] /admin/account/
module.exports.index = async (req, res) => {
  // Find
  let find = {
    deleted: false
  };
  // End Find
  
  const records = await Account.find(find);
  console.log(records);
  res.render("admin/pages/accounts", {
    pageTitle: "Danh sách tài khoản",
    records: records
  });
}
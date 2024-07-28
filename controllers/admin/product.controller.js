const Product = require("../../models/product.model");
const filterHelper = require("../../helpers/filter.helper");
// [GET] /admin/products/
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  }

  if (req.query.status) {
    find.status = req.query.status;
  }

  //  Filter 
  const filterStatus = filterHelper(req);
  // End Filter
  
  // Search
  if(req.query.keyword) {
    const regex = new RegExp(req.query.keyword, "i");
    find.title = regex;
  }
  // End Search 
  
  const products = await Product.find(find);
  
  res.render("admin/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products,
    filterStatus: filterStatus,
    keyword: req.query.keyword
  });
}
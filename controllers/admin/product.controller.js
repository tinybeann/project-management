const Product = require("../../models/product.model");
const filterHelper = require("../../helpers/filter.helper");
const paginationHelper = require("../../helpers/pagination.helper");
const systemConfig = require("../../config/system");
// [GET] /admin/products/
module.exports.index = async (req, res) => {
  try {
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
    if (req.query.keyword) {
      const regex = new RegExp(req.query.keyword, "i");
      find.title = regex;
    }
    // End Search 
  
    // Pagination
    const countRecords = await Product.countDocuments(find);
    const objectPagination = paginationHelper(req, countRecords);
    // End Pagination
  
    const products = await Product
      .find(find)
      .limit(objectPagination.limitItems)
      .skip(objectPagination.skip);  
  
    res.render("admin/pages/products/index", {
      pageTitle: "Danh sách sản phẩm",
      products: products,
      filterStatus: filterStatus,
      keyword: req.query.keyword,
      objectPagination: objectPagination
    });
  } catch(error) {
    console.log(error);
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`); 
  }
}

// [PATCH] /admin/products/:status/:id
module.exports.changeStatus = async (req, res) => {
  try {
    const status = req.params.status;
    const id = req.params.id;
  
    await Product.updateOne({
      _id: id
    }, {
      status: status
    });
  
    res.redirect(`back`);
  }
  catch (error) {
    console.log(error);
    res.redirect(`/${systemConfig.prefixAdmin}/dashboard`);
  }
}

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  let ids = req.body.ids;
  ids = ids.split(", ");

  switch (type) {
    case "active":
    case "inactive":
      await Product.updateMany({
        _id: { $in: ids }
      }, {
        status: type
      });
      break;
          case "delete-all":
      await Product.updateMany({
        _id: { $in: ids }
      }, {
        deleted: true
      });
    default:
      break;
  }

  res.redirect(`back`);
}

// [DELETE] /admin/products/delete/:id
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne({
    _id: id
  }, {
    deleted: true
  });

  res.redirect("back");
}
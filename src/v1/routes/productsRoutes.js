const express  = require("express");
const router = express.Router();
const productController = require("../../controllers/productController")
const registryController = require("../../controllers/registryController")

router
    //Products
    .get("/", productController.getAllProducts)
    .post("/", productController.createNewProducts)
    .put('/productos/:id', productController.updateProductStatusController)
    .put('/productos/update/:id', productController.updateProductController)
    .get("/:productFilter", productController.getFilteredProducts)
    .delete("/:productId", productController.deleteProducts)
    
router
    //Registry
    .get("/registros", registryController.getAllRegistryController)

module.exports = router;
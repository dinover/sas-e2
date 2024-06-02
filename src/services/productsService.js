const Products = require('../db/Products')

const getAllProducts = async () => {
  const allProducts = await Products.getAllProducts();
  return allProducts;
};

const getFilteredProducts = () => {
  return;
};

const createNewProducts = async (newProductData) => {
  try {
    // Extract the description and photo from the newProductData object
    const { descripcion, foto } = newProductData;

    // Construct the new product object with the extracted fields
    const newProduct = {
      descripcion,
      foto: foto // Assuming foto is optional and can be null
    };

    // Call the method to create a new product, passing the newProduct object
    const productId = await Products.createNewProducts(newProduct);
    return productId;
  } catch (error) {
    throw new Error('Error creating new product: ' + error.message);
  }
};

const updateProductStatus = async (productId) => {
  try {
    const productToUpdate = { id: productId };
    const changes = await Products.updateProductStatus(productToUpdate);
    return changes;
  } catch (error) {
    throw new Error('Error updating product status: ' + error.message);
  }
};

const updateProduct = async (product) => {
  try {
    const changes = await Products.updateProduct(product);
    return changes;
  } catch (error) {
    throw new Error('Error updating product status: ' + error.message);
  }
};



// const createNewProducts = async (newProduct) => {
//     try {
//         const productId = await Products.createNewProducts(newProduct);
//         return productId;
//     } catch (error) {
//         throw new Error('Error creating new product: ' + error.message);
//     }
// };

// const createNewProducts = () => {
//     return;
// };

const deleteProducts = () => {
  return;
};

module.exports = {
  getAllProducts,
  createNewProducts,
  updateProductStatus,
  updateProduct,
  getFilteredProducts,
  deleteProducts,
}
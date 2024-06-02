const productsService = require("../services/productsService");
const sqlite3 = require('sqlite3').verbose();

const getAllProducts = async (req, res) => {
    const allProducts = await productsService.getAllProducts();
    res.send({ status: "Ok", data: allProducts });
};

const getFilteredProducts = (req, res) => {
    const filteredProducts = productsService.getFilteredProducts(req.params.productFilter);
    res.send(`get product ${req.params.productFilter}`)
};

const createNewProducts = async (req, res) => {
    try {
        const { descripcion } = req.body; // Assuming descripcion is in the req.body
        const foto  = req.file.path; // Assuming foto is in the req.file object

        if (!descripcion) {
            return res.status(400).json({ error: 'descripcion is required' });
        }

        const newProduct = {
            descripcion,
            foto: foto // Assuming foto is optional and can be null
        };
        const productId = await productsService.createNewProducts(newProduct);
        res.status(201).json({ status: 'Ok', productId, newProduct });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateProductStatusController = async (req, res) => {
    try {
        const productId = req.params.id;

        if (!productId) {
            return res.status(400).json({ error: 'Product ID is required' });
        }

        const changes = await productsService.updateProductStatus(productId);

        if (changes === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ status: 'Ok', productId });
    } catch (error) {
        console.error('Error updating product status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const updateProductController = async (req, res) => {
    try {
        const productId = req.params.id;
        const { descripcion } = req.body;
        let foto;

        // Check if foto is provided in the request
        if (req.file) {
            foto = req.file.path; // Assign the path of the uploaded file
        }

        if (!productId) {
            return res.status(400).json({ error: 'Product ID is required' });
        }
        const product = {
            descripcion,
            productId,
        }
        // Add the foto field to the product object if foto is provided
        if (foto) {
            product.foto = foto;
        }

        const changes = await productsService.updateProduct(product);

        if (changes === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json({ status: 'Ok', product });
    } catch (error) {
        console.error('Error updating product status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// const createNewProducts = async (req, res) => {
//     const { body } = req;

//     try {
//         if (!body.descripcion) {
//             return res.status(400).json({ error: 'descripcion is required' });
//         }

//         const newProduct = {
//             descripcion: body.descripcion,
//             foto: body.foto || null // Assuming 'foto' is optional and can be null
//         };

//         const productId = await productsService.createNewProducts(newProduct);
//         res.status(201).json({ status: 'Ok', productId });
//     } catch (error) {
//         console.error('Error creating product:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

const deleteProducts = (req, res) => {
    productsService.deleteProducts(req.params.productId);
    res.send(`create product ${req.params.productId}`)
};

module.exports = {
    getAllProducts,
    createNewProducts,
    updateProductStatusController,
    updateProductController,
    getFilteredProducts,
    deleteProducts,
};
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('src/db/helper.db');
const fs = require('fs');
const path = require('path');

const getAllProducts = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM productos WHERE estado = 1`;
        db.all(query, async (err, rows) => {
            if (err) {
                reject(err);
            } else {
                // Iterate through each product
                for (const product of rows) {
                    // Check if product has a foto URL
                    if (product.foto) {
                        try {
                            // Construct the file path based on the URL
                            const filePath = `${product.foto}`;

                            // Read the file from the server
                            const fileData = fs.readFileSync(filePath, 'base64');

                            // Replace the foto URL with the file data
                            product.foto = `data:image/jpeg;base64,${fileData}`;
                        } catch (error) {
                            console.error('Error reading file:', error);
                        }
                    }
                }

                // Resolve with the updated list of products
                resolve(rows);
            }
        });
    });
};

const createNewProducts = (newProduct) => {
    return new Promise((resolve, reject) => {
        const filePath = newProduct.foto;
        // Prepare SQL statement to insert data into the 'productos' table
        const query = `INSERT INTO productos (descripcion, foto, estado, fecha_subida) VALUES (?, ?, 1, CURRENT_DATE)`;

        // Execute the SQL statement with the product data
        db.run(query, [newProduct.descripcion, filePath], function (err) {
            if (err) {
                reject(err);
            } else {
                // If successful, resolve with the ID of the newly inserted row
                resolve(this.lastID);
            }
        });
    });
};

const updateProductStatus = (productToUpdate) => {
    return new Promise((resolve, reject) => {
        const ProductId = productToUpdate.id;
        // Prepare SQL statement to insert data into the 'productos' table
        const query = `UPDATE productos SET estado = 0, fecha_venta = CURRENT_DATE WHERE id = ?`;

        // Execute the SQL statement with the product data
        db.run(query, [ProductId], function (err) {
            if (err) {
                reject(err);
            } else {
                // If successful, resolve with the ID of the newly inserted row
                resolve(this.changes);
            }
        });
    });
};

const updateProduct = (productToUpdate) => {
    return new Promise((resolve, reject) => {
        const { descripcion, foto, productId } = productToUpdate;
        console.log(productToUpdate);

        // Primero, obtenemos la foto actual del producto
        const selectQuery = `SELECT foto FROM productos WHERE id = ?`;
        db.get(selectQuery, [productId], (err, row) => {
            if (err) {
                reject(err);
                return;
            }

            const currentFoto = row ? row.foto : null;
            console.log(currentFoto)

            // Si hay una foto actual, eliminar la foto.
            if (foto && currentFoto) {
                const filePath = path.join(currentFoto);
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error(`Error deleting old photo: ${err}`);
                    } else {
                        console.log(`Successfully deleted old photo: ${currentFoto}`);
                    }
                });
            }
            // Prepare SQL statement to update data in the 'productos' table
            const query = `UPDATE productos SET descripcion = ?, foto = ? WHERE id = ?`;
            if (!foto) {
                db.run(query, [descripcion, currentFoto, productId], function (err) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    // If successful, resolve with the number of rows affected
                    resolve(this.changes);
                });
                
            } else {
                db.run(query, [descripcion, foto, productId], function (err) {
                    if (err) {
                        reject(err);
                        return;
                    }
    
                    
    
                    // If successful, resolve with the number of rows affected
                    resolve(this.changes);
                });
            }            
        });
    });
};

module.exports = { getAllProducts, createNewProducts, updateProductStatus, updateProduct };
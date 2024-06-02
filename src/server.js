// server.js

const express = require("express");
const cors = require('cors');
const v1Router = require("./v1/routes/productsRoutes");
const multer  = require('multer')
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const sqlite3 = require('sqlite3').verbose(); // Importa sqlite3

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

// Multer configuration
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './src/db/Files'); // Adjust destination directory as needed
  },
  filename: function(req, file, cb) {
    const uniqueFilename = uuidv4(); // Generate a unique filename using UUID
    const fileExtension = file.originalname.split('.').pop(); // Extract file extension
    cb(null, `${uniqueFilename}.${fileExtension}`); // Set the filename with the original extension
  }
});
const upload = multer({ storage: storage });

// Import your route handlers
const { createNewProducts, updateProductController } = require("./controllers/productController");

// Define routes
app.post('/api/v1/', upload.single('foto'), createNewProducts);
app.put('/api/v1/productos/update/:id', upload.single('foto'), updateProductController);

// Use your v1 router for other routes
app.use("/api/v1", v1Router);

function start(dbPath) {
  const fullPath = path.resolve(__dirname, dbPath);
  console.log(fullPath);
  
  const db = new sqlite3.Database(fullPath, (err) => {
    if (err) {
      console.error('Error opening database', err.message);
    } else {
      console.log('Connected to the SQLite database.');
    }
  });

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

module.exports = { start };

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('src/db/helper.db');

const getAllRegistry = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM registry`;
        db.all(query, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports = { getAllRegistry };
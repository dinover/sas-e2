const Registry = require('../db/Registros');

const getAllRegistry = async () => {
    try {
        const allRegistry = await Registry.getAllRegistry();
        return allRegistry;
    } catch (error) {
        throw new Error("Error fetching registry data: " + error.message);
    }
};

module.exports = {
    getAllRegistry
};

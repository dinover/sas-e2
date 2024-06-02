const resgistryService = require("../services/resgistryService");

const getAllRegistryController = async (req, res) => {
    try {
        console.log('hola mundo')
        const allRegistry = await resgistryService.getAllRegistry();
        res.status(200).send({ status: "Ok", data: allRegistry });
    } catch (error) {
        res.status(500).send({ status: "Error", message: error.message });
    }
};

module.exports = {
    getAllRegistryController
};
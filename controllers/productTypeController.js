const ProductTypeModel = require("../models/product_type_Model");
const ProductModel = require("../models/product_Model")


module.exports.createProductType = async (req, res) => {
    if (req.body.length == 0) {
        return res.status(400).send({
            message: "Body can not be empty!"
        });
    }
    try {
        console.log(req.body)
        const result = await ProductTypeModel.create(req.body)
        if (result) {
            res.status(200).send({
                message: "new product type",
                product_type: result,
            });
        } else {
            res.status(400).send({
                message: "product type can not add",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'Unable to create new product type',
            error:error
        })
    }
} 

module.exports.getAllProductTypes = async (req, res) => {
    console.log("here");
    try {
        const result = await ProductTypeModel.findAll({
            include: [{
                model: ProductModel,
            }],
        })
        if (result) {
            res.status(200).send({
                message: "search result",
                products: result,
            });
        } else {
            res.status(400).send({
                message: "product type is not found",
                product: result,
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'Error occured while searching product type',
            error: error
        })
    }
} 

module.exports.getSingleProductType = async (req, res) => {
    try {
        const result = await ProductTypeModel.findByPk(req.params.pId, {
            include: [{
                model: ProductModel,
            }],
        })
        if (result) {
            res.status(200).send({
                message: "search result",
                product_type: result,
            });
        } else {
            res.status(400).send({
                message: "product not found",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'Error Occured while searching for product type',
            error: error
        })
    }
} 

module.exports.updateProductType = async (req, res) => {
    try {
        const result = await ProductTypeModel.update(req.body, {
            where: {
                product_type_id: req.params.pId
            }
        });
        if (result) {
            const find = await ProductTypeModel.findByPk(req.params.pId)
            res.status(200).send({
                message: "update result",
                updated_result: find
            });
        } else {
            res.status(400).send({
                message: "product not found",
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'Error Occured while updating product type',
            error: error
        })
    }
} 

module.exports.removeProductType = async (req, res) => {
    try {
        const find = await ProductTypeModel.findByPk(req.params.pId)
        if (!find) {
            return res.status(400).send({
                message: "The product-type you want to update is not found, please check your data",
                Hint: "Provide valid id"
            })
        }
        const result = await ProductTypeModel.destroy({
            where: {
                product_type_id: req.params.pId
            }
        })
        if (result) {
            res.status(200).send({
                message: "product type removed successfully",
            });
        } else {
            res.status(400).send({
                message: "product type not found",
            });
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "error occured while deleting product",
            error: error,
        });
    }
} 
const ProductModel = require("../models/product_Model")
const fs = require("fs");
const ProductTypeModel = require("../models/product_type_Model");
const CatalogTypeModel = require("../models/catalog_type_Model");

module.exports.addNewProducts = async (req, res) => {
    if (req.body.length == 0) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // first check if user selected image or not if not throw an error
    if (!req.file) {
        return res.status(400).send({
            message: "Please select an image",
        });
    }

    // checking of Size value format
    if (req.body.size.toUpperCase() != 'S' && req.body.size.toUpperCase() != 'L' && req.body.size.toUpperCase() != 'M') {
        return res.status(400).send({
            Error: "value is too long for Size",
            Hint: "Use: ['S','M','L'] for small, medium and large respectively."
        })
    }
    const productData = {
        name: req.body.name,
        specification: req.body.specification,
        size: req.body.size.toUpperCase(),
        color: req.body.color,
        product_type_id: req.body.product_type_id,
        catalog_type_id: req.body.catalog_type_id,
    }

    try {
        console.log(req.file);
        productData.image = `assets/product-images/${req.file.filename}`;
        console.log(productData);

        var createProduct = await ProductModel.create(productData);
        console.log(createProduct)
        return res.status(200).send({
            message: "New Product Data saved successfully",
            product: createProduct,
        });

    }
    catch (error) {

        // fs.unlinkSync(productData.image);
        console.log(error)
        return res.status(400).json({
            message: 'Unable to save new Product data',
            status: 400
        });
    }
}

module.exports.updateProductById = async (req, res) => {
    try {
        // first check if user selected image or not if not throw an error
        if (!req.file) {
            return res.status(400).send({
                message: "Please select an image",
            });
        }
        // first check and remove the previous image
        const find = await ProductModel.findByPk(req.params.pId);
        if (!find) {
            return res.status(400).send({
                message: "The Product your are trying to update is not found",
            });
        }

        const productData = {
            name: req.body.name,
            specification: req.body.specification,
            size: req.body.size.toUpperCase(),
            color: req.body.color,
            product_type_id: req.body.product_type_id,
            catalog_type_id: req.body.catalog_type_id,
        }

        productData.image = `assets/product_image/${req.file.filename}`;
        const result = await ProductModel.update(productData, {
            where: {
                id: req.params.pId
            }
        })
        if (result) {
            const find = await ProductModel.findOne({
                where: {
                    id: req.params.pId
                },
                include: [{
                    model: ProductTypeModel,
                }],
            })
            res.status(200).send({
                message: "Product updated successfully",
                Product: find,
            });
        } else {
            res.status(400).send({
                message: "Product not found",
            });
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "error occured while updating Product",
            error: error,
        });
    }
}

module.exports.getSingleProductById = async (req, res) => {
    try {
        const result = await ProductModel.findByPk(req.params.pId, {
            include: [{
                model: ProductTypeModel,
            }, {
                model: CatalogTypeModel,
            }]
        });
        if (result) {

            res.status(200).send({
                message: "Product",
                Product: result,
            });
        } else {
            res.status(400).send({
                message: "Product not found",
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'Unable to get Product data',
            status: 400
        });
    }
}

module.exports.removeProductById = async (req, res) => {
    try {

        const find = await ProductModel.findByPk(req.params.pId);
        console.log(find)
        if (find.image != null) {
            fs.unlinkSync(find.image);
        }
        const result = await ProductModel.destroy({
            where: {
                id: req.params.pId
            }
        })
        if (result) {
            res.status(200).send({
                message: "Product removed successfully",
                Product: find,
            });
        } else {
            res.status(400).send({
                message: "Product not found",
            });
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "error occured while deleting Product",
            error: error,
        });
    }
}

module.exports.getAllProductsById = async (req, res) => {
    try {
        const result = await ProductModel.findAll({
            include: [{
                model: ProductTypeModel,
            }, {
                model: CatalogTypeModel,
            }]
        })
        if (result) {
            res.status(200).send({
                message: "search result",
                user: result,
            });
        } else {
            res.status(400).send({
                message: "users not found",
                user: result,
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'Unable to get users',
            status: 400
        });
    }
}
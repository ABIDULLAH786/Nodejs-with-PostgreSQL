const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const ProductTypeModel = require("./product_type_Model")
const CatalogTypeModel = require("./catalog_type_Model")

const ProductModel = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    specification: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    size: {
        type: DataTypes.ENUM({
            values: [
                'S',
                'M',
                'L',
            ]
        }),
        allowNull: false
    },
    color: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    product_type_id: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    catalog_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    timestamps: false
});



// realtion with ProductTypeModel
ProductTypeModel.hasMany(ProductModel, {
    foreignKey: "product_type_id",
})
ProductModel.belongsTo(ProductTypeModel, {
    foreignKey: "product_type_id",
})


// realtion with CatalogTypeModel
CatalogTypeModel.hasMany(ProductModel, {
    foreignKey: "catalog_type_id",
})
ProductModel.belongsTo(CatalogTypeModel, {
    foreignKey: "catalog_type_id",
})
module.exports = ProductModel
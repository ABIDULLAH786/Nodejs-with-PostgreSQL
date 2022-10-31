const UserModel = require("../models/userModel")

module.exports.addNewUser = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    console.log(req.body)
    try {
        console.log(req.file)
        req.body.image = `assets/users-images/${req.file.filename}`;

        const createUser = await UserModel.create(req.body);
        res.status(200).send({
            message: "New User Data saved successfully",
            driver: createUser,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'Unable to save new useer data',
            status: 400
        });
    }
}
module.exports.updateUserById = async (req, res) => {
    try {
        req.body.image = `assets/users-images/${req.file.filename}`;
        const result = await UserModel.update(req.body,{
            where: {
                id: req.params.uId
            }
        })
        if (result) {
            const find = await UserModel.findOne({
                where: {
                    id: req.params.uId
                }
            })
            res.status(200).send({
                message: "user updated successfully",
                user: find,
            });
        } else {
            res.status(400).send({
                message: "user not found",
            });
        }
    } catch (error) {
        console.log(error)
        res.status(400).send({
            message: "error occured while updating user",
            error: error,
        });
    }
}
module.exports.getUserById = async (req, res) => {
    try {
        const result = await UserModel.findByPk(req.params.id);
        if (result) {
            res.status(200).send({
                message: "user",
                user: result,
            });
        } else {
            res.status(400).send({
                message: "user not found",
                user: result,
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: 'Unable to get user data',
            status: 400
        });
    }
}

module.exports.removeUserById = async (req, res) => {
    try {
        const find = await UserModel.findByPk(req.params.id);

        const result = await UserModel.destroy({
            where: {
                id: req.params.uId
            }
        })
        if (result) {
            res.status(200).send({
                message: "user removed successfully",
                user: find,
            });
        } else {
            res.status(400).send({
                message: "user not found",
                user: result,
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "error occured while deleting user",
            error: error,
        });
    }
}


module.exports.findAllUsersById = async (req, res) => {
    try {
        const result = await UserModel.findAll()
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
const UserModel = require("../models/userModel")
const fs = require("fs")
module.exports.addNewUser = async (req, res) => {
    if (req.body.length==0) {
        return res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    const userData = {
        activity_status_id: req.body.activity_status_id,
        username:req.body.username,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone_no: req.body.phone_no,
        latest_verification_code: req.body.latest_verification_code ,
        bio: req.body.bio,
        online_status: req.body.online_status,
        admin_block_status: req.body.admin_block_status,
        created_at: req.body.created_at,
        updated_at: req.body.updated_at,
        privacy: req.body.privacy
    }

    try {
        console.log(req.file)
        userData.image = `assets/users-images/${req.file.filename}`;

        const createUser = await UserModel.create(userData);
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
        // first check and remove the previous image
        const find = await UserModel.findByPk(req.params.uId);
        if (find.image != null) {
            fs.unlinkSync(find.image);
        }
        const userData = {
            activity_status_id: req.body.activity_status_id,
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_no: req.body.phone_no,
            latest_verification_code: req.body.latest_verification_code,
            bio: req.body.bio,
            online_status: req.body.online_status,
            admin_block_status: req.body.admin_block_status,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at,
            privacy: req.body.privacy
        }
        
        userData.image = `assets/users-images/${req.file.filename}`;
        const result = await UserModel.update(userData, {
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
        const result = await UserModel.findByPk(req.params.uId);
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
        
        const find = await UserModel.findByPk(req.params.uId);
        console.log(find)
        if (find.image != null) {
            fs.unlinkSync(find.image);
        }
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
        console.log(error)
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
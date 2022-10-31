

module.exports.addNewUser = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    // create driver 
    try {
        const userDate = {
            id: req.body.id,
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            phone_no: req.body.phone_no,
            lateast_verification_code: req.body.lateast_verification_code,
            bio: req.body.bio,
            image: req.body.image,
            online_status: req.body.drionline_statusver_img,
            admin_block_status: req.body.admin_block_status,
            created_at: req.body.created_at,
            updated_at: req.body.updated_at,
            privacy: req.body.privacy,
        };
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
        const result = await UserModel.update({
            where: {
                id: req.params.id
            }
        })
        if (result) {
            res.status(200).send({
                message: "user updated successfully",
                user: result,
            });
        } else {
            res.status(400).send({
                message: "user not found",
                user: result,
            });
        }
    } catch (error) {
        res.status(400).send({
            message: "error occured while updating user",
            user: result,
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
        const result = await UserModel.destroy({
            where: {
                id: req.params.id
            }
        })
        if (result) {
            res.status(200).send({
                message: "search result",
                user: result,
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
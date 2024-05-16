const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const userModel = new (require("../Models/users"))

class userController {

    // Add User
    async addUser(req, res) {

        try {
            let data = await userModel.addUser(req?.body);

            if (data?.status === STATUS_CODES?.ALREADY_REPORTED) {
                res.handler.validationError(undefined, data?.message);
                return;
            }

            if (data?.status === STATUS_CODES?.NOT_VALID_DATA) {
                res.handler.validationError(undefined, data?.message);
                return;
            }

            res.handler.success(data, STATUS_MESSAGES?.USER?.ADDED)

        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Update User
    async updateUser(req, res) {

        let data = await userModel.updateUser(req?.body);

        if (data?.status === STATUS_CODES?.NOT_FOUND) {
            res.handler.notFound(undefined, STATUS_MESSAGES?.NOT_FOUND?.USER);
            return;
        }

        if (data?.status === STATUS_CODES?.ALREADY_REPORTED) {
            res.handler.validationError(undefined, STATUS_MESSAGES?.EXISTS?.USERNAME_OR_EMAIL);
            return;
        }

        res.handler.success(data, STATUS_MESSAGES?.USER?.UPDATED)
    }

    // Delete User
    async deleteUser(req, res) {

        let data = await userModel.deleteUser(req?.params?.id);

        if (data?.status === STATUS_CODES?.NOT_FOUND) {
            res.handler.notFound(undefined, STATUS_MESSAGES?.NOT_FOUND?.USER);
            return;
        }

        res.handler.success(data, STATUS_MESSAGES?.USER?.DELETED)
    }

    // Get User By Id
    async getUserById(req, res) {

        let data = await userModel.getUserById(req?.params?.id);

        if (data?.status === STATUS_CODES?.NOT_FOUND) {
            res.handler.notFound(undefined, STATUS_MESSAGES?.NOT_FOUND?.USER);
            return;
        }

        res.handler.success(data)
    }

    // Get All User List
    async getAllUserList(req, res) {

        let data = await userModel.getAllUserList(req?.body);

        res.handler.success(data);
    }

    // Get All Active User List
    async getAllActiveUserList(req, res) {

        let data = await userModel.getAllActiveUserList();

        res.handler.success(data);
    }

    // Get All Deleted User List
    async getAllDeletedUserList(req, res) {

        let data = await userModel.getAllDeletedUserList();

        res.handler.success(data);
    }

    // User Sign Up
    async userSignUp(req, res) {
        try {
            let data = await userModel.userSignUp(req.body);

            if (data?.status === STATUS_CODES.ALREADY_REPORTED) {
                res.handler.validationError(undefined, data?.message);
                return;
            }
            
            if (data?.status === STATUS_CODES.NOT_VALID_DATA) {
                res.handler.validationError(undefined, data?.message);
                return;
            }

            res.handler.success(data, STATUS_MESSAGES.USER.SIGN_UP);

        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // User Sign In
    async userSignIn(req, res) {
        try {
            let data = await userModel.userSignIn(req.body);

            if (data?.status === STATUS_CODES.NOT_VALID_DATA) {
                res.handler.validationError(undefined, data?.message);
                return;
            }

            if (data?.status === STATUS_CODES.NOT_FOUND) {
                res.handler.notFound(undefined, data?.message);
                return;
            }

            res.handler.success(data, STATUS_MESSAGES.LOGIN_SUCCESS);
        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Forgot Password
    async forgotPassword(req, res) {
        try {
            let data = await userModel.forgotPassword(req.body);

            if (data?.status === STATUS_CODES.NOT_FOUND) {
                res.handler.notFound(undefined, data?.message);
                return;
            }

            res.handler.success(data, STATUS_MESSAGES.PROCESS.EMAIL_SENT);

        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // OTP Verification
    async otpVerification(req, res) {
        try {

            let data = await userModel.otpVerification(req?.body);

            if (data?.status === STATUS_CODES.NOT_FOUND) {
                res.handler.notFound(undefined, STATUS_MESSAGES.OTP.INVALID);
                return;
            }

            if (data?.status === STATUS_CODES.NOT_ACCEPTABLE) {
                res.handler.notFound(undefined, STATUS_MESSAGES.OTP.EXPIRE);
                return;
            }

            res.handler.success(data, STATUS_MESSAGES.OTP.CORRECT);

        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // Reset User Password Using OTP
    async resetPasswordUsingOtp(req, res) {
        try {

            let data = await userModel.resetPasswordUsingOtp(req?.body, req?.params?.id);

            if (data?.status == STATUS_CODES.VALIDATION_ERROR) {
                res.handler.validationError(undefined, STATUS_MESSAGES.PASSWORD.NOT_SAME);
                return;
            }

            if (data?.status == STATUS_CODES.NOT_FOUND) {
                res.handler.validationError(undefined, data?.message);
                return;
            }

            res.handler.success(undefined, STATUS_MESSAGES.PASSWORD.CHANGED);

        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // User Sign Out
    async userSignOut(req, res) {
        try {
            let data = await userModel.userSignOut(req?.userInfo, req?.headers)

            if (data?.status === STATUS_CODES.NOT_FOUND) {
                res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.USER);
                return;
            }

            res.handler.success(undefined, STATUS_MESSAGES.TOKEN.LOGOUT);

        } catch (error) {
            res.handler.serverError(error)
        }
    }
}

module.exports = userController
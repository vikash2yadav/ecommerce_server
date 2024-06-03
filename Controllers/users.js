const userModel = new (require('../Models/users'));
const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
class userController {

    // sign up
    async signUp(req, res) {
        try {
            let data = await userModel.signUp(req?.body);

            if (data.status == STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.validationError(undefined, data?.message);
            }

            if (data.status == STATUS_CODES.NOT_VALID_DATA) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.PASSWORD.NOT_SAME);
            }

            return res.handler.success(data);
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // sign in
    async signIn(req, res) {
        try {
            let data = await userModel.signIn(req?.body);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, data?.message)
            }

            if (data.status === STATUS_CODES.NOT_VALID_DATA) {
                return res.handler.validationError(undefined, STATUS_MESSAGES.PASSWORD.INCORRECT)
            }

            return res.handler.success(data);
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // forgot password
    async forgotPassword(req, res) {
        try {
            let data = await userModel.forgotPassword(req?.body);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.EMAIL)
            }

            return res.handler.success(data);
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // otp verifications
    async otpVerificationByOtp(req, res) {
        try {

            let data = await userModel.otpVerificationByOtp(req?.body);

            if (data?.status === STATUS_CODES?.NOT_FOUND) {
                res.handler.notFound(undefined, STATUS_MESSAGES?.OTP?.INVALID);
                return;
            }

            if (data?.status === STATUS_CODES?.NOT_ACCEPTABLE) {
                res.handler.notFound(undefined, STATUS_MESSAGES?.OTP?.EXPIRE);
                return;
            }

            res.handler.success(data, STATUS_MESSAGES?.OTP?.CORRECT);

        } catch (error) {
            res.handler.serverError(error)
        }
    }

    // reset password
    async resetPassword(req, res) {
        try {
            let data = await userModel.resetPassword(req?.body, req?.params?.id);

            if (data.status === STATUS_CODES.NOT_VALID_DATA) {
                return res.handler.validationError(undefined, STATUS_MESSAGES.PASSWORD.NOT_SAME)
            }

            return res.handler.success(data, STATUS_MESSAGES.PASSWORD.CHANGED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // sign out
    async signOut(req, res) {
        try {

            let data = await userModel.signOut(req?.userInfo, req?.headers);

            if (data?.status === STATUS_CODES?.NOT_FOUND) {
                res.handler.notFound(undefined, STATUS_MESSAGES?.NOT_FOUND?.USER);
                return;
            }

            return res.handler.success(data, STATUS_MESSAGES.TOKEN.LOGOUT);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update profile
    async updateSelfProfile(req, res) {
        try {

            let data = await userModel.updateSelfProfile(req?.userInfo, req?.body);

            if (data.status === STATUS_CODES?.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.USER);
            }

            if (data.status === STATUS_CODES?.ALREADY_REPORTED) {
                return res.handler.notFound(undefined, data?.message);
            }

            return res.handler.success(data, STATUS_MESSAGES.USER.UPDATED)

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // user status change
    async userStatusChange(req, res) {
        try {

            let data = await userModel.userStatusChange(req?.adminInfo, req?.body);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.USER);
            }

            return res.handler.success(data, STATUS_MESSAGES.ADMIN.STATUS_CHANGED);

        } catch (error) {
            return res.handler.serverError(error);
        }
    }

    // add user
    async addUser(req, res) {
        try {
            let data = await userModel.addUser(req?.adminInfo, req?.body);

            if (data.status == STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.validationError(undefined, data?.message);
            }

            if (data.status == STATUS_CODES.NOT_VALID_DATA) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.PASSWORD.NOT_SAME);
            }

            return res.handler.success(data, STATUS_MESSAGES.USER.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update user
    async updateUser(req, res) {
        try {
            let data = await userModel.updateUser(req?.adminInfo, req?.body);

            if (data.status == STATUS_CODES.NOT_FOUND) {
                return res.handler.validationError(undefined, STATUS_MESSAGES.NOT_FOUND.USER);
            }

            if (data.status == STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.validationError(undefined, data?.message);
            }

            return res.handler.success(data, STATUS_MESSAGES.USER.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete user
    async deleteUser(req, res) {
        try {
            let data = await userModel.deleteUser(req?.adminInfo, req?.params?.id);

            if (data.status == STATUS_CODES.NOT_FOUND) {
                return res.handler.validationError(undefined, STATUS_MESSAGES.NOT_FOUND.USER);
            }

            return res.handler.success(data, STATUS_MESSAGES.USER.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete user
    async getUserById(req, res) {
        try {
            let data = await userModel.getUserById(req?.params?.id);

            if (data.status == STATUS_CODES.NOT_FOUND) {
                return res.handler.validationError(undefined, STATUS_MESSAGES.NOT_FOUND.USER);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete user
    async getUserList(req, res) {
        try {
            let data = await userModel.getUserList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }


}

module.exports = userController;
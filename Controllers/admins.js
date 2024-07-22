const adminModel = new (require('../Models/admins'));
const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
class adminController {

    // add admin
    async add(req, res) {
        try {
            let data = await adminModel.add(req?.body, req?.adminInfo);

            if (data.status == STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.validationError(undefined, data?.message);
            }

            if (data.status == STATUS_CODES.NOT_VALID_DATA) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.PASSWORD.NOT_SAME);
            }

            return res.handler.success(data, STATUS_MESSAGES?.ADMIN?.ADDED);
        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // sign in
    async signIn(req, res) {
        try {
            let data = await adminModel.signIn(req?.body);

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
            let data = await adminModel.forgotPassword(req?.body);

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

            let data = await adminModel.otpVerificationByOtp(req?.body);

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
            let data = await adminModel.resetPassword(req?.body, req?.params?.id);

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

            let data = await adminModel.signOut(req?.adminInfo, req?.headers);

            if (data?.status === STATUS_CODES?.NOT_FOUND) {
                res.handler.notFound(undefined, STATUS_MESSAGES?.NOT_FOUND?.USER);
                return;
            }

            return res.handler.success(data, STATUS_MESSAGES.TOKEN.LOGOUT);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update self profile
    async updateSelfProfile(req, res) {
        try {

            let data = await adminModel.updateSelfProfile(req?.adminInfo, req?.body);

            if (data.status === STATUS_CODES?.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.USER);
            }

            if (data.status === STATUS_CODES?.ALREADY_REPORTED) {
                return res.handler.conflict(undefined, data?.message);
            }

            return res.handler.success(data, STATUS_MESSAGES.USER.UPDATED)

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update profile
    async updateProfile(req, res) {
        try {

            let data = await adminModel.updateProfile(req?.adminInfo, req?.body);

            if (data.status === STATUS_CODES?.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.USER);
            }

            if (data.status === STATUS_CODES?.ALREADY_REPORTED) {
                return res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.EMAIL);
            }

            return res.handler.success(data, STATUS_MESSAGES.USER.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // admin status change
    async adminStatusChange(req, res) {
        try {

            let data = await adminModel.adminStatusChange(req?.adminInfo, req?.body);

            if(data.status === STATUS_CODES.NOT_FOUND){
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.USER);
            }

            return res.handler.success(data, STATUS_MESSAGES.ADMIN.STATUS_CHANGED);

        } catch (error) {
            return res.handler.serverError(error);
        }
    }

    // delete admin
    async deleteAdmin(req, res) {
        try {
            let data = await adminModel.deleteAdmin(req?.adminInfo, req?.params?.id);
            
            if(data.status === STATUS_CODES.NOT_FOUND){
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.USER);
            }

            return res.handler.success(data, STATUS_MESSAGES.ADMIN.DELETED);

        } catch (error) {
            return res.handler.serverError(error);
        }
    }

    // get by id
    async getAdminById(req,res) {
        try {
            let data = await adminModel.getAdminById(req?.params?.id);
            
            if(data.status === STATUS_CODES.NOT_FOUND){
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.USER);
            }

            return res.handler.success(data);

        } catch (error) {
            return res.handler.serverError(error);
        }
    }

    // get self profile data
    async getSelfProfileData(req,res) {
        try {
            let data = await adminModel.getSelfProfileData(req?.adminInfo);
            
            if(data.status === STATUS_CODES.NOT_FOUND){
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.USER);
            }

            return res.handler.success(data);

        } catch (error) {
            return res.handler.serverError(error);
        }
    }


     // list
     async getAdminList(req,res) {
        try {
            let data = await adminModel.getAdminList(req?.body);
            
            return res.handler.success(data);
            
        } catch (error) {
            return res.handler.serverError(error);
        }
    }

    // change password 
    async changePassword(req, res){
        try {
            let data = await adminModel.changePassword(req?.adminInfo, req?.body);

            if (data.status === STATUS_CODES.NOT_VALID_DATA) {
                return res.handler.validationError(undefined, data?.message);
            }

            return res.handler.success(data, STATUS_MESSAGES.PASSWORD.CHANGED);
        
        } catch (error) {
            return res.handler.serverError(error);
        }
    }
}

module.exports = adminController;
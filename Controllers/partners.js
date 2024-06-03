const partnerModel = new (require('../Models/partners'));
const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");

class partnerController {

    // add partner
    async add(req, res) {
        try {
            let data = await partnerModel.add(req?.body, req?.adminInfo);

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
            let data = await partnerModel.signIn(req?.body);

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
            let data = await partnerModel.forgotPassword(req?.body);

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

            let data = await partnerModel.otpVerificationByOtp(req?.body);

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
            let data = await partnerModel.resetPassword(req?.body, req?.params?.id);

            if(data.status === STATUS_CODES.NOT_FOUND){
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.USER)
            }

            if(data.status === STATUS_CODES.NOT_VALID_DATA){
                return res.handler.validationError(undefined, STATUS_MESSAGES.PASSWORD.NOT_SAME)
            }

            return res.handler.success(data, STATUS_MESSAGES.PASSWORD.CHANGED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // sign out
    async signOut(req, res) {
        try{

            let data = await partnerModel.signOut(req?.partnerInfo, req?.headers);

            if (data?.status === STATUS_CODES?.NOT_FOUND) {
                res.handler.notFound(undefined, STATUS_MESSAGES?.NOT_FOUND?.USER);
                return;
            }

            return res.handler.success(data, STATUS_MESSAGES.TOKEN.LOGOUT);

        }catch(error){
            res.handler.serverError(error);
        }
    }

    // update profile
    async updateProfile(req, res) {
        try {

            let data = await partnerModel.updateProfile(req?.body, req?.adminInfo);

            if(data.status === STATUS_CODES?.NOT_FOUND){
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.USER);
            }

            if(data.status === STATUS_CODES?.ALREADY_REPORTED){
                return res.handler.notFound(undefined, data?.message);
            }

            return res.handler.success(data, STATUS_MESSAGES.USER.UPDATED)

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // self profile update 
    async updateSelfProfile(req, res) {
        try {
            
            let data = await partnerModel.updateSelfProfile(req?.partnerInfo, req?.body);

            if(data.status === STATUS_CODES?.NOT_FOUND){
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.USER);
            }

            if(data.status === STATUS_CODES?.ALREADY_REPORTED){
                return res.handler.notFound(undefined, data?.message);
            }

            return res.handler.success(data, STATUS_MESSAGES.USER.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // admin status change
    async partnerStatusChange(req, res) {
        try {

            let data = await partnerModel.partnerStatusChange(req?.body, req?.adminInfo,);

            if(data.status === STATUS_CODES.NOT_FOUND){
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.USER);
            }

            return res.handler.success(data, STATUS_MESSAGES.ADMIN.STATUS_CHANGED);

        } catch (error) {
            return res.handler.serverError(error);
        }
    }

    // delete partner
    async deletePartner(req,res){
        try {
            let data = await partnerModel.deletePartner(req?.params?.id, req?.adminInfo);

            if(data.status === STATUS_CODES.NOT_FOUND){
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.USER);
            }

            return res.handler.success(data, STATUS_MESSAGES.USER.DELETED);

        } catch (error) {
            return res.handler.serverError(error);
        }
    }

    // get by id partner
    async getPartnerById(req,res){
        try {
            let data = await partnerModel.getPartnerById(req?.params?.id);

            if(data.status === STATUS_CODES.NOT_FOUND){
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.USER);
            }

            return res.handler.success(data);

        } catch (error) {
            return res.handler.serverError(error);
        }
    }


     // get partner list
     async getPartnerList(req,res){
        try {
            let data = await partnerModel.getPartnerList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            return res.handler.serverError(error);
        }
    }

}

module.exports = partnerController;
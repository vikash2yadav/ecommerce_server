const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const inquiryModel = new (require("../Models/inquiries"));

class inquiryController {

    // -------------- admin route ----------------------

    // add inquiry
    async addInquiry(req, res) {
        try {
            let data = await inquiryModel.addInquiry(req?.body);

            return res.handler.success(data, STATUS_MESSAGES.INQUIRY.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update inquiry
    async updateInquiry(req, res) {
        try {
            let data = await inquiryModel.updateInquiry(req?.body);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.INQUIRY);
            }

            return res.handler.success(data, STATUS_MESSAGES.INQUIRY.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete inquiry
    async deleteInquiry(req, res) {
        try {

            let data = await inquiryModel.deleteInquiry(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.INQUIRY);
            }

            return res.handler.success(data, STATUS_MESSAGES.INQUIRY.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get inquiry
    async getInquiryById(req, res) {
        try {

            let data = await inquiryModel.getInquiryById(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.INQUIRY);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get inquiry list
    async getInquiryList(req, res) {        
        try {
            let data = await inquiryModel.getInquiryList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }


    // --------------------- customer route ---------------

     // add inquiry
     async addInquiryByCustomer(req, res) {
        try {
            let data = await inquiryModel.addInquiryByCustomer(req?.body);

            return res.handler.success(data, STATUS_MESSAGES.INQUIRY.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }


}

module.exports = inquiryController
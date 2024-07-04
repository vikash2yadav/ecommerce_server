const { inquiries: inquirySchema } = require('../Database/Schema');
const { STATUS_CODES } = require('../Config/constant');

class inquiryModel {

    // ------------------------- admin route -------------------

    // add inquiry
    async addInquiry(bodyData) {

        // add inquiry
        return await inquirySchema.create(bodyData);

    }

    // update inquiry
    async updateInquiry(bodyData) {

        // check inquiry exist or not
        let checkInquiry = await inquirySchema.findOne({
            where: {
                id: bodyData?.id
            }
        })

        if (!checkInquiry) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await inquirySchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete inquiry
    async deleteInquiry(id) {

        // check inquiry exist or not
        let checkInquiry = await inquirySchema.findOne({
            where: {
                id: id
            }
        })

        if (!checkInquiry) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        // destroy coupon
        return await inquirySchema.destroy({
            where: {
                id: id,
            }
        })
    }

    // get inquiry
    async getInquiryById(id) {

        // check inquiry exist or not
        let checkInquiry = await inquirySchema.findOne({
            where: {
                id: id,
            }
        })

        if (!checkInquiry) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return checkInquiry;
    }

    // get coupon list
    async getInquiryList(bodyData) {

        return await inquirySchema.findAndCountAll();

    }


    // ------------------------- customer route ---------------

    // add inquiry
    async addInquiryByCustomer(bodyData) {

        // add inquiry
        return await inquirySchema.create(bodyData);

    }
}

module.exports = inquiryModel
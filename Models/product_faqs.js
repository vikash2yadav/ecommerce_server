const { product_faqs: productFaqSchema, products: productSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS } = require('../Config/constant');

class productFaqModel {

    // ---------------- admin route -----------------

    // add product faq
    async addProductFaq(bodyData) {

        // create product faq
        return await productFaqSchema.create(bodyData);
    }

    // update product faq
    async updateProductFaq(bodyData) {

        // check product faq exist or not
        let checkProductFaq = await productFaqSchema.findOne({
            where: {
                id: bodyData?.id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkProductFaq) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await productFaqSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete product faq
    async deleteProductFaq(id) {

        // check product faq exist or not
        let checkProductFaq = await productFaqSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkProductFaq) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await productFaqSchema.update({ is_delete: STATUS.DELETED }, {
            where: {
                id: id
            }
        })
    }

    // get product faq
    async getProductFaq(id) {

        // check product faq exist or not
        let checkProductFaq = await productFaqSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkProductFaq) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await productFaqSchema.findOne({
            where: {
                id: id
            }
        })
    }

    // get product faq list
    async getProductFaqList(bodyData) {

        return await productFaqSchema.findAndCountAll();

    }


    // ------------------------ vendor faqs -------------------
    // get product faq list
    async getVendorProductFaqList(bodyData) {

        return await productFaqSchema.findAndCountAll({
            where: {
                is_delete: STATUS.NOTDELETED,
            }, include: {
                model: productSchema,
                where: {
                    vendor_id: 1,
                }
            }
        });

    }

}

module.exports = productFaqModel
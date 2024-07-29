const { product_specifications: productSpecificationSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS } = require('../Config/constant');

class productSpecificationModel {

    // ---------------- admin route -----------------

    // add product specification
    async addProductSpecification(bodyData, adminInfo) {
        return await productSpecificationSchema.create(bodyData);
    }

    // update product specification
    async updateProductSpecification(bodyData, adminInfo) {

        // check product specification exist or not
        let checkProductSpecification = await productSpecificationSchema.findOne({
            where: {
                id: bodyData?.id
            }
        })

        if (!checkProductSpecification) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

           return await productSpecificationSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // product specification status change
    async productSpecificationStatusChange(adminInfo, bodyData) {

        let checkProductSpecification = await productSpecificationSchema.findOne({
            where: {
                id: bodyData?.id
            }
        })

        if (!checkProductSpecification) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }


        return await productSpecificationSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete product specification
    async deleteProductSpecification(id, adminInfo) {

        // check product specification exist or not
        let checkProductSpecification = await productSpecificationSchema.findOne({
            where: {
                id: id
            }
        })

        if (!checkProductSpecification) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await productSpecificationSchema.destroy({
            where: {
                id: id
            }
        })
    }

    // get product specification
    async getProductSpecificationById(id) {

        // check product specification exist or not
        let checkProductSpecification = await productSpecificationSchema.findOne({
            where: {
                id: id
            }
        })

        if (!checkProductSpecification) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await productSpecificationSchema.findOne({
            where: {
                id: id
            }
        })
    }

    // get product specification list
    async getProductSpecificationList(id) {

        return await productSpecificationSchema.findAndCountAll({
            where: {
                product_id: id
            }
        });
    }

}

module.exports = productSpecificationModel
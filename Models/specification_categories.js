const { specification_categories: specificationCategorySchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS } = require('../Config/constant');

class specificationCategoryModel {

    // ---------------- admin route -----------------

    // add specification category
    async addSpecificationCategory(bodyData, adminInfo) {
        return await specificationCategorySchema.create(bodyData);
    }

    // update specification category
    async updateSpecificationCategory(bodyData, adminInfo) {

        // check specification category exist or not
        let checkSpecificationCategory = await specificationCategorySchema.findOne({
            where: {
                id: bodyData?.id
            }
        })

        if (!checkSpecificationCategory) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

           return await specificationCategorySchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // specification category status change
    async specificationCategoryStatusChange(adminInfo, bodyData) {

        let checkSpecificationCategory = await specificationCategorySchema.findOne({
            where: {
                id: bodyData?.id
            }
        })

        if (!checkSpecificationCategory) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }


        return await specificationCategorySchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete specification category
    async deleteSpecificationCategory(id, adminInfo) {

        // check specification category exist or not
        let checkSpecificationCategory = await specificationCategorySchema.findOne({
            where: {
                id: id
            }
        })

        if (!checkSpecificationCategory) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await specificationCategorySchema.destroy({
            where: {
                id: id
            }
        })
    }

    // get specification category
    async getSpecificationCategoryById(id) {

        // check specification category exist or not
        let checkSpecificationCategory = await specificationCategorySchema.findOne({
            where: {
                id: id
            }
        })

        if (!checkSpecificationCategory) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await specificationCategorySchema.findOne({
            where: {
                id: id
            }
        })
    }

    // get specification category list
    async getSpecificationCategoryList(id) {

        return await specificationCategorySchema.findAndCountAll();
    }

}

module.exports = specificationCategoryModel
const slugify = require('slugify');
const { categories: categorySchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS } = require('../Config/constant');
const { Op } = require('sequelize');

class categoryModel {

    // add category
    async addCategory(bodyData) {

        // create slug for unique identification of category
        bodyData.slug = await slugify(bodyData?.name || '', {
            lower: true,
            strict: true
        });

        // check available slug exist or not
        let existSlug = await categorySchema.findOne({
            where: {
                slug: bodyData?.slug
            }
        });

        if (existSlug) {
            return {
                status: STATUS_CODES?.ALREADY_REPORTED
            }
        }

        // create category
        return await categorySchema.create(bodyData);
    }

    // update category
    async updateCategory(bodyData) {

        // create slug for unique identification of category
        bodyData.slug = await slugify(bodyData?.name || '', {
            lower: true,
            strict: true
        });

        // check category exist or not
        let checkCategory = await categorySchema.findOne({
            where: {
                id: bodyData?.id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkCategory) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        // check exists slug
        let checkSlug = await categorySchema.findOne({
            where: {
                slug: bodyData?.slug,
                id: { [Op.ne]: bodyData?.id }
            }
        })

        if (checkSlug) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED
            }
        }

        return await categorySchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete category
    async deleteCategory(id) {

        // check category exist or not
        let checkCategory = await categorySchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkCategory) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await categorySchema.update({ is_delete: STATUS.DELETED }, {
            where: {
                id: id
            }
        })
    }

    // get category
    async getCategory(id) { 

         // check category exist or not
         let checkCategory = await categorySchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkCategory) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await categorySchema.findOne({
            where:{
                id: id
            }
        })
    }

    // get category list
    async getCategoryList(bodyData) {

        return await categorySchema.findAndCountAll();
        
     }
}

module.exports = categoryModel
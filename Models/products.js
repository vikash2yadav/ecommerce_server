const slugify = require('slugify');
const { products: productSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS, STATUS_MESSAGES } = require('../Config/constant');
const { Op } = require('sequelize');

class productModel {

    // add product
    async addProduct(bodyData) {

        // create slug for unique identification of product
        bodyData.slug = await slugify(bodyData?.name || '', {
            lower: true,
            strict: true
        });

        // check available slug exist or not
        let existSlug = await productSchema.findOne({
            where: {
                slug: bodyData?.slug
            }
        });

        if (existSlug) {
            return {
                status: STATUS_CODES?.ALREADY_REPORTED
            }
        }

        // create product
        return await productSchema.create(bodyData);
    }

    // update product
    async updateProduct(bodyData) {

        // create slug for unique identification of product
        bodyData.slug = await slugify(bodyData?.name || '', {
            lower: true,
            strict: true
        });

        // check product exist or not
        let checkProduct = await productSchema.findOne({
            where: {
                id: bodyData?.id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkProduct) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        // check exists slug
        let checkSlug = await productSchema.findOne({
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

        return await productSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete product
    async deleteProduct(id) {

        // check product exist or not
        let checkProduct = await productSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkProduct) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await productSchema.update({ is_delete: STATUS.DELETED }, {
            where: {
                id: id
            }
        })
    }

    // get product
    async getProduct(id) {

        // check product exist or not
        let checkProduct = await productSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkProduct) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await productSchema.findOne({
            where: {
                id: id
            }
        })
    }

    // get product list
    async getProductList(bodyData) {

        let data = await productSchema.findAndCountAll();
        return data;

    }


    // --------------------- vendor product ----------------------

    // get vendor product list
    async getVendorProductList(bodyData) {

        let data = await productSchema.findAndCountAll({
            where: {
                vendor_id: 2
            }
        });
        return data;

    }

}

module.exports = productModel
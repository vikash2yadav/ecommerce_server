const slugify = require('slugify');
const { categories: categorySchema, admins: adminSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS } = require('../Config/constant');
const { Op } = require('sequelize');

class categoryModel {

    // add category
    async addCategory(bodyData, adminInfo) {

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

        if (existSlug?.name === bodyData?.name || existSlug) {
            return {
                status: STATUS_CODES?.ALREADY_REPORTED
            }
        }

        bodyData.created_by = adminInfo?.id;
        // create category
        return await categorySchema.create(bodyData);
    }

    // update category
    async updateCategory(bodyData, adminInfo) {

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

        bodyData.updated_by = adminInfo?.id;

        return await categorySchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete category
    async deleteCategory(id, adminInfo) {

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

        bodyData.updated_by = adminInfo?.id;

        return await categorySchema.update({ is_delete: STATUS.DELETED }, {
            where: {
                id: id
            }
        })
    }

    // get category
    async getCategory(id, adminInfo) {

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
            where: {
                id: id
            }
        })
    }

    // get category list
    async getCategoryList(bodyData, adminInfo) {

        var currentPage;
        var itemsPerPage;
        var lastRecordIndex;
        var firstRecordIndex;
        if (bodyData?.currentPage && bodyData?.itemsPerPage) {
            currentPage = bodyData?.currentPage;
            itemsPerPage = bodyData?.itemsPerPage;
            lastRecordIndex = currentPage * itemsPerPage;
            firstRecordIndex = lastRecordIndex - itemsPerPage;
        }
        var sortBy = [];
        if (bodyData?.sortBy && bodyData?.sortBy?.length > 0) {
            bodyData?.sortBy?.map((sort) => {
                if (sort?.id !== "" && sort?.desc !== "") {
                    if (sort?.desc == true) {
                        sortBy?.push([sort?.id, "desc"]);
                    } else {
                        sortBy?.push([sort?.id, "asc"]);
                    }
                }
            });
        }
        if (sortBy?.length < 1) {
            sortBy = [['id', 'asc']];
        }
        var filterQuery = {};
        if (bodyData?.filters && bodyData?.filters?.length > 0) {
            bodyData?.filters?.forEach((filter) => {
                if (filter?.id != "" && filter?.value != "") {
                    if (typeof (filter?.value) === 'string') {
                        filterQuery[filter?.id] = {
                            [SEQUELIZE.Op.like]: `%${filter?.value.trim()}%`,
                        }
                    }
                    else {
                        filterQuery[filter?.id] = {
                            [SEQUELIZE.Op.eq]: `${filter?.value}`
                        };
                    }
                }
            });
        }

        return await categorySchema.findAndCountAll({
            where: {
                is_delete: STATUS.NOTDELETED,
                ...filterQuery,
            },
            include: [
                {
                    model: categorySchema,
                    attributes: ["name"]
                },
                {
                    model: adminSchema,
                    attributes: ["full_name"]
                }
            ],
            offset: firstRecordIndex,
            limit: itemsPerPage,
            order: [...sortBy],
        });
        

    }
}

module.exports = categoryModel
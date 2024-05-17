const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const categoryModel = new (require("../Models/categories"));

class categoryController {

    // add category
    async addCategory(req, res) {
        try {
            let data = await categoryModel.addCategory(req?.body);

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.CATEGORY);
            }

            return res.handler.success(data, STATUS_MESSAGES.CATEGORY.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update category
    async updateCategory(req, res) {
        try {
            let data = await categoryModel.updateCategory(req?.body);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.CATEGORY);
            }

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.EXISTS.CATEGORY);
            }

            return res.handler.success(data, STATUS_MESSAGES.CATEGORY.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete category
    async deleteCategory(req, res) {
        try {

            let data = await categoryModel.deleteCategory(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.CATEGORY);
            }

            return res.handler.success(data, STATUS_MESSAGES.CATEGORY.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get category
    async getCategory(req, res) {
        try {

            let data = await categoryModel.getCategory(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.CATEGORY);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get category list
    async getCategoryList(req, res) {
        
        try {
            let data = await categoryModel.getCategoryList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = categoryController
const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const specificationCategoryModel = new (require("../Models/specification_categories.js"));

class specificationCategoryController {

    // ---------------------- admin route ------------------------
    
    // add specification category
    async addSpecificationCategory(req, res) {
        try {
            let data = await specificationCategoryModel.addSpecificationCategory(req?.body, req?.adminInfo);

            return res.handler.success(data, STATUS_MESSAGES.SPECIFICATION_CATEGORY.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update specification category
    async updateSpecificationCategory(req, res) {
        try {
            let data = await specificationCategoryModel.updateSpecificationCategory(req?.body, req?.adminInfo);
                
            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.SPECIFICATION_CATEGORY);
            }

            return res.handler.success(data, STATUS_MESSAGES.SPECIFICATION_CATEGORY.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

     // specification category status change
     async specificationCategoryStatusChange(req, res) {
        try {

            let data = await specificationCategoryModel.specificationCategoryStatusChange(req?.adminInfo, req?.body);

            if(data.status === STATUS_CODES.NOT_FOUND){
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.PRODUCT_SPECIFICATION);
            }

            return res.handler.success(data);

        } catch (error) {
            return res.handler.serverError(error);
        }
    }

    // delete specification category
    async deleteSpecificationCategory(req, res) {
        try {

            let data = await specificationCategoryModel.deleteSpecificationCategory(req?.params?.id, req?.adminInfo);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.SPECIFICATION_CATEGORY);
            }

            return res.handler.success(data, STATUS_MESSAGES.SPECIFICATION_CATEGORY.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get specification category
    async getSpecificationCategoryById (req, res) {
        try {

            let data = await specificationCategoryModel.getSpecificationCategoryById(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.SPECIFICATION_CATEGORY);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get specification category list
    async getSpecificationCategoryList(req, res) {
        
        try {
            let data = await specificationCategoryModel.getSpecificationCategoryList();

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

}

module.exports = specificationCategoryController
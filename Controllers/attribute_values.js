const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const attributeValueModel = new (require("../Models/attribute_values"));

class attributeValueController {

    // add attribute value
    async addAttributeValue(req, res) {
        try {
            let data = await attributeValueModel.addAttributeValue(req?.body);

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.ATTRIBUTE_VALUE);
            }

            return res.handler.success(data, STATUS_MESSAGES.ATTRIBUTE_VALUE.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update attribute  value
    async updateAttributeValue(req, res) {
        try {
            let data = await attributeValueModel.updateAttributeValue(req?.body);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.ATTRIBUTE_VALUE);
            }

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.ATTRIBUTE_VALUE);
            }

            return res.handler.success(data, STATUS_MESSAGES.ATTRIBUTE_VALUE.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete attribute value
    async deleteAttributeValue(req, res) {
        try {

            let data = await attributeValueModel.deleteAttributeValue(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.ATTRIBUTE_VALUE);
            }

            return res.handler.success(data, STATUS_MESSAGES.ATTRIBUTE_VALUE.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get attribute value
    async getAttributeValueById(req, res) {
        try {

            let data = await attributeValueModel.getAttributeValueById(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.ATTRIBUTE_VALUE);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get cart list
    async getAttributeValueList(req, res) {        
        try {
            let data = await attributeValueModel.getAttributeValueList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = attributeValueController
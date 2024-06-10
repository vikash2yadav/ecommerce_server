const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const attributeModel = new (require("../Models/attributes"));

class attributeController {

    // add attribute
    async addAttribute(req, res) {
        try {
            let data = await attributeModel.addAttributes(req?.body);

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.ATTRIBUTE);
            }

            return res.handler.success(data, STATUS_MESSAGES.ATTRIBUTE.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update attribute
    async updateAttribute(req, res) {
        try {
            let data = await attributeModel.updateAttributes(req?.body);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.ATTRIBUTE);
            }

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.EXISTS.ATTRIBUTE);
            }

            return res.handler.success(data, STATUS_MESSAGES.ATTRIBUTE.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete attribute
    async deleteAttribute(req, res) {
        try {

            let data = await attributeModel.deleteAttribute(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.ATTRIBUTE);
            }

            return res.handler.success(data, STATUS_MESSAGES.ATTRIBUTE.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get attribute
    async getAttributeById(req, res) {
        try {

            let data = await attributeModel.getAttributeById(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.ATTRIBUTE);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get cart list
    async getAttributeList(req, res) {        
        try {
            let data = await attributeModel.getAttributeList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = attributeController
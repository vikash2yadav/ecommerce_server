const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const moduleModel = new (require("../Models/modules"));

class moduleController {

    // add module
    async addModule(req, res) {
        try {
            let data = await moduleModel.addModule(req?.body, req?.adminInfo);

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.MODULE);
            }

            return res.handler.success(data, STATUS_MESSAGES.MODULE.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update module
    async updateModule(req, res) {
        try {
            let data = await moduleModel.updateModule(req?.body, req?.adminInfo);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.MODULE);
            }

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.EXISTS.MODULE);
            }

            return res.handler.success(data, STATUS_MESSAGES.MODULE.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete module
    async deleteModule(req, res) {
        try {

            let data = await moduleModel.deleteModule(req?.params?.id, req?.adminInfo);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.MODULE);
            }

            return res.handler.success(data, STATUS_MESSAGES.MODULE.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get module
    async getModuleById(req, res) {
        try {

            let data = await moduleModel.getModuleById(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.MODULE);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get module list
    async getModuleList(req, res) {        
        try {
            let data = await moduleModel.getModuleList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = moduleController
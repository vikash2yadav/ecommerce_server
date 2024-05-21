const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const languageModel = new (require("../Models/languages"));

class languageController {

    // add language
    async addLanguage(req, res) {
        try {
            let data = await languageModel.addLanguage(req?.body);

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.LANGUAGE);
            }

            return res.handler.success(data, STATUS_MESSAGES.LANGUAGE.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update language
    async updateLanguage(req, res) {
        try {
            let data = await languageModel.updateLanguage(req?.body);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.LANGUAGE);
            }

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.notFound(undefined, data?.message);
            }

            return res.handler.success(data, STATUS_MESSAGES.LANGUAGE.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete language
    async deleteLanguage(req, res) {
        try {

            let data = await languageModel.deleteLanguage(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.LANGUAGE);
            }

            return res.handler.success(data, STATUS_MESSAGES.LANGUAGE.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get language
    async getLanguage(req, res) {
        try {

            let data = await languageModel.getLanguage(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.LANGUAGE);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get language list
    async getLanguageList(req, res) {        
        try {
            let data = await languageModel.getLanguageList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = languageController
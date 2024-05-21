const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const ourChoiceModel = new (require("../Models/our_choices"));

class ourChoiceController {

    // add our choice
    async addOurChoice(req, res) {
        try {
            let data = await ourChoiceModel.addOurChoice(req?.body);

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.OUR_CHOICE);
            }

            return res.handler.success(data, STATUS_MESSAGES.OUR_CHOICE.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update our choice
    async updateOurChoice(req, res) {
        try {
            let data = await ourChoiceModel.updateOurChoice(req?.body);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.OUR_CHOICE);
            }

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.notFound(undefined, STATUS_MESSAGES?.EXISTS.OUR_CHOICE);
            }

            return res.handler.success(data, STATUS_MESSAGES.OUR_CHOICE.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete our choice
    async deleteOurChoice(req, res) {
        try {

            let data = await ourChoiceModel.deleteOurChoice(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.OUR_CHOICE);
            }

            return res.handler.success(data, STATUS_MESSAGES.OUR_CHOICE.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get our choice
    async getOurChoice(req, res) {
        try {

            let data = await ourChoiceModel.getOurChoice(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.OUR_CHOICE);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get our choice list
    async getOurChoiceList(req, res) {        
        try {
            let data = await ourChoiceModel.getOurChoiceList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = ourChoiceController
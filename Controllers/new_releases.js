const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const newReleaseModel = new (require("../Models/new_releases"));

class newReleaseController {

    // add new release
    async addNewRelease(req, res) {
        try {
            let data = await newReleaseModel.addNewRelease(req?.body);

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.NEW_RELEASE);
            }

            return res.handler.success(data, STATUS_MESSAGES.NEW_RELEASE.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update new release
    async updateNewRelease(req, res) {
        try {
            let data = await newReleaseModel.updateNewRelease(req?.body);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.NEW_RELEASE);
            }

            if (data.status === STATUS_CODES.ALREADY_REPORTED) {
                return res.handler.notFound(undefined, STATUS_MESSAGES?.EXISTS.NEW_RELEASE);
            }

            return res.handler.success(data, STATUS_MESSAGES.NEW_RELEASE.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete new release
    async deleteNewRelease(req, res) {
        try {

            let data = await newReleaseModel.deleteNewRelease(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.NEW_RELEASE);
            }

            return res.handler.success(data, STATUS_MESSAGES.NEW_RELEASE.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get new release
    async getNewRelease(req, res) {
        try {

            let data = await newReleaseModel.getNewRelease(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.NEW_RELEASE);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get new release list
    async getNewReleaseList(req, res) {        
        try {
            let data = await newReleaseModel.getNewReleaseList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = newReleaseController
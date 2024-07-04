const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const commonModel = new (require("../Models/common"));

class commonController {

    // get country by id
    async getCountryById(req, res) {
        try {

            let data = await commonModel.getCountryById(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.COUNTRY);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get country list
    async getCountryList(req, res) {
        
        try {
            let data = await commonModel.getCountryList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get city by id
    async getCityById(req, res) {
        try {

            let data = await commonModel.getCityById(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.CITY);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get city list
    async getCityList(req, res) {
        
        try {
            let data = await commonModel.getCityList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get state by id
    async getStateById(req, res) {
        try {

            let data = await commonModel.getStateById(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.STATE);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get state list
    async getStateList(req, res) {
        
        try {
            let data = await commonModel.getStateList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = commonController
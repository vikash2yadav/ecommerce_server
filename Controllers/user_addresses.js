const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const userAddressModel = new (require("../Models/user_addresses"));

class userAddressController {

    // add user address
    async addUserAddress(req, res) {
        try {
            let data = await userAddressModel.addUserAddress(req?.body);
            return res.handler.success(data, STATUS_MESSAGES.ADDRESS.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update user address
    async updateUserAddress(req, res) {
        try {
            let data = await userAddressModel.updateUserAddress(req?.body);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.ADDRESS);
            }

            return res.handler.success(data, STATUS_MESSAGES.ADDRESS.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete user address
    async deleteUserAddress(req, res) {
        try {

            let data = await userAddressModel.deleteUserAddress(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.ADDRESS);
            }

            return res.handler.success(data, STATUS_MESSAGES.ADDRESS.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get user address
    async getUserAddress(req, res) {
        try {

            let data = await userAddressModel.getUserAddress(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.ADDRESS);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get user address list
    async getUserAddressList(req, res) {

        try {
            let data = await userAddressModel.getUserAddressList(req?.body);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // ------------------ customer route ------------------

    // add new address 
    async addMyNewAddress(req, res) {
        try {
            let data = await userAddressModel.addMyNewAddress(req?.userInfo, req?.body);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.ADDRESS);
            }

            res.handler.success(data, STATUS_MESSAGES?.ADDRESS.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get my address list
    async getMyAddressList(req, res) {

        try {
            let data = await userAddressModel.getMyAddressList(req?.userInfo);

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get default address 
    async getMyDefaultAddress(req, res) {
        try {
            let data = await userAddressModel.getMyDefaultAddress(req?.userInfo);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.ADDRESS);
            }
            res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // change default address 
    async changeDefaultAddress(req, res) {
        try {
            let data = await userAddressModel.changeDefaultAddress(req?.userInfo, req?.params?.id);

            res.handler.success(data, STATUS_MESSAGES?.ADDRESS?.DEFAULT_CHANGED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // update address
    async updateMyAddress(req, res) {
        try {
            let data = await userAddressModel.updateMyAddress(req?.body);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.ADDRESS);
            }
            res.handler.success(data, STATUS_MESSAGES?.ADDRESS?.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete address
    async deleteMyAddress(req, res) {
        try {
            let data = await userAddressModel.deleteMyAddress(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.ADDRESS);
            }

            return res.handler.success(data, STATUS_MESSAGES.ADDRESS.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }


    // --------------------- city country state name -------------------

    async getCityNameById(req, res) {
        try {
            let data = await userAddressModel.getCityNameById(req?.params?.id);
           
            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.CITY);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    async getCountryNameById(req, res) {
        try {
            let data = await userAddressModel.getCountryNameById(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.COUNTRY);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    async getStateNameById(req, res) {
        try {
            let data = await userAddressModel.getStateNameById(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.STATE);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }


}

module.exports = userAddressController
const { STATUS_CODES, STATUS_MESSAGES } = require("../Config/constant");
const shippedAddressModel = new (require("../Models/shipped_addresses"));

class shippedAddressController {

    // get shipped address
    async getShippedAddress(req, res) {
        try {

            let data = await shippedAddressModel.getShippedAddress(req?.params?.id);

            if (data.status === STATUS_CODES.NOT_FOUND) {
                return res.handler.notFound(undefined, STATUS_MESSAGES.NOT_FOUND.ADDRESS);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

}

module.exports = shippedAddressController
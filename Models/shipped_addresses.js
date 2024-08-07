const { shipped_addresses: shippedAddressSchema, cities: citySchema, countries: countrySchema, states: stateSchema } = require('../Database/Schema');
const { STATUS_CODES } = require('../Config/constant');

class shippedAddressModel {

    // get shipped address
    async getShippedAddress(id) {
        // check shipped address exist or not
        let checkAddress = await shippedAddressSchema.findOne({
            where: {
                id: id
            }
        })

        if (!checkAddress) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await shippedAddressSchema.findOne({
            where: {
                id: id
            },
            include: [{
                model: citySchema,
                attribute: ["name"]
            },
            {
                model: stateSchema,
                attribute: ["name"]
            },
            {
                model: countrySchema,
                attribute: ["name"]
            },
            ]
        })
    }
}

module.exports = shippedAddressModel
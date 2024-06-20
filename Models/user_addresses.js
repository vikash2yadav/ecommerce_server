const { user_addresses: userAddressSchema, users: userSchema, cities: citySchema, countries: countrySchema, states: stateSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS, STATUS_MESSAGES } = require('../Config/constant');
const { Op } = require('sequelize');

class userAddressModel {

    // add user address
    async addUserAddress(bodyData) {

        // create user address
        return await userAddressSchema.create(bodyData);
    }

    // update user address
    async updateUserAddress(bodyData) {

        // check user address exist or not
        let checkAddress = await userAddressSchema.findOne({
            where: {
                id: bodyData?.id
            }
        })

        if (!checkAddress) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await userAddressSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete user address
    async deleteUserAddress(id) {

        // check user address exist or not
        let checkAddress = await userAddressSchema.findOne({
            where: {
                id: id
            }
        })

        if (!checkAddress) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await userAddressSchema.destroy({
            where: {
                id: id
            }
        })
    }

    // get user address
    async getUserAddress(id) {

        // check user address exist or not
        let checkAddress = await userAddressSchema.findOne({
            where: {
                id: id
            }
        })

        if (!checkAddress) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await userAddressSchema.findOne({
            where: {
                id: id
            }
        })
    }

    // get user address list
    async getUserAddressList(bodyData) {

        let data = await userAddressSchema.findAndCountAll();
        return data;

    }


    // ---------------------- customer route ----------------

    // add new address 
    async addMyNewAddress(userInfo, bodyData) {

        if(bodyData?.is_default === true){
           let data = await userAddressSchema.update({is_default: STATUS.NOT_DEFAULT}, {
                where: {
                    user_id: userInfo?.id
                }
            });
            
            bodyData.is_default = STATUS.DEFAULT
            
        }else{
            bodyData.is_default = STATUS.NOT_DEFAULT
        }
        
        bodyData.user_id = userInfo?.id;
        return await userAddressSchema.create(bodyData);

    }

    // get customer address list
    async getMyAddressList(userInfo) {

        let data = await userAddressSchema.findAndCountAll({
            where: {
                user_id: userInfo?.id
            },
            include: [
                {
                    model: citySchema,
                    attributes: ["name"]
                },
                {
                    model: stateSchema,
                    attributes: ["name"]
                },
                {
                    model: userSchema,
                }
            ]
        });

        if(!data){
            return{
                status: STATUS_CODES.NOT_FOUND
            }
        }
        
        return data;

    }

    // get default address
    async getMyDefaultAddress(userInfo){

        let data = await userAddressSchema.findOne({
            where:{
                user_id: userInfo?.id,
                is_default: STATUS.DEFAULT
            },
                include: [
                    {
                        model: citySchema,
                        attributes: ["name"]
                    },
                    {
                        model: stateSchema,
                        attributes: ["name"]
                    },
                    {
                        model: stateSchema,
                        attributes: ["name"]
                    }
                ]
        });

        if(!data){
            return {status: STATUS_CODES.NOT_FOUND}
        }

        return data;
    }

    // change default 
    async changeDefaultAddress(userInfo, id) {

        let data = await userAddressSchema.findOne({
            where: {
                id
            }
        });

        if (!data) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }


        userAddressSchema.update({ is_default: STATUS.NOT_DEFAULT }, {
            where: {
                user_id: userInfo?.id,
                id: { [Op.ne]: id }
            }
        })
        return await userAddressSchema.update({ is_default: STATUS.DEFAULT }, {
            where: {
                id
            }
        })
    }

    // update address 
    async updateMyAddress(bodyData){
        let data = await userAddressSchema.findOne({
            where: {
                id: bodyData?.id
            }
        });

        if(!data){
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await userAddressSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })
    }

    // delete address
    async deleteMyAddress(id){

        let data = await userAddressSchema.findOne({
            where: {
                id
            }
        });

        if(!data){
            return { status: STATUS_CODES.NOT_FOUND}
        }

        return await userAddressSchema.destroy({
            where: {
                id
            }
        }) ;
    }


    //  ----------------------  city  country state name ---------------------

    async getCityNameById(id) {
        let data = await citySchema.findOne({
            where: {
                id
            }
        });

        if (!data) {
            return { status: STATUS_CODES.NOT_FOUND }
        }

        return data;
    }

    async getCountryNameById(id) {
        let data = await countrySchema.findOne({
            where: {
                id
            }
        });

        if (!data) {
            return { status: STATUS_CODES.NOT_FOUND }
        }

        return data;
    }

    async getStateNameById(id) {
        let data = await stateSchema.findOne({
            where: {
                id
            }
        });

        if (!data) {
            return { status: STATUS_CODES.NOT_FOUND }
        }

        return data;
    }

}

module.exports = userAddressModel
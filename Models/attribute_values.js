const { attribute_values: attributeValueSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS } = require('../Config/constant');

class attributeValueModel {

    // add attribute value
    async addAttributeValue(bodyData, userInfo) {

        let existAttributeValue = await attributeValueSchema.findOne({
            where: {
                value: bodyData?.value,
            }
        });

        if (existAttributeValue) {
            return {
                status: STATUS_CODES?.ALREADY_REPORTED
            }
        }

        // add attribute
        return await attributeValueSchema.create(bodyData);
    }

    // update attribute value
    async updateAttributeValue(bodyData, userInfo) {

        // check attribute exist or not
        let checkAttributeValue = await attributeValueSchema.findOne({
            where: {
                id: bodyData?.id  
            }
        })

        if (!checkAttributeValue) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await attributeValueSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete attribute value
    async deleteAttributeValue(id, userInfo) {

        // check attribute exist or not
        let checkAttributeValue = await attributeValueSchema.findOne({
            where: {
                id: id,    
            }
        })

        if (!checkAttributeValue) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        // destroy attribute
        return await attributeValueSchema.destroy({
            where: {
                id: id,
            }
        })
    }

    // get attribute value
    async getAttributeValueById(id, userInfo) { 

         // check attribute value or not
         let checkAttributeValue = await attributeValueSchema.findOne({
            where: {
                id: id
            }
        })

        if (!checkAttributeValue) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await attributeValueSchema.findOne({
            where:{
                id: id
            }
        })
    }

    // get attribute value list
    async getAttributeValueList(bodyData) {

        return await attributeValueSchema.findAndCountAll();
        
     }
}

module.exports = attributeValueModel
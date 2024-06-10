const { attributes: attributeSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS } = require('../Config/constant');

class attributeModel {

    // add attribute
    async addAttributes(bodyData, userInfo) {

        let existAttribute = await attributeSchema.findOne({
            where: {
                name: bodyData?.name,
            }
        });

        if (existAttribute) {
            return {
                status: STATUS_CODES?.ALREADY_REPORTED
            }
        }

        // add attribute
        return await attributeSchema.create(bodyData);
    }

    // update attribute
    async updateAttributes(bodyData, userInfo) {

        // check attribute exist or not
        let checkAttribute = await attributeSchema.findOne({
            where: {
                id: bodyData?.id  
            }
        })

        if (!checkAttribute) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await attributeSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete attribute
    async deleteAttribute(id, userInfo) {

        // check attribute exist or not
        let checkAttributes = await attributeSchema.findOne({
            where: {
                id: id,    
            }
        })

        if (!checkAttributes) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        // destroy attribute
        return await attributeSchema.destroy({
            where: {
                id: id,
                // user_id: userInfo?.id 
            }
        })
    }

    // get attribute
    async getAttributeById(id, userInfo) { 

         // check product exist or not
         let checkAttribute = await attributeSchema.findOne({
            where: {
                id: id
            }
        })

        if (!checkAttribute) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await attributeSchema.findOne({
            where:{
                id: id
            }
        })
    }

    // get cart product list
    async getAttributeList(bodyData) {

        return await attributeSchema.findAndCountAll();
        
     }
}

module.exports = attributeModel
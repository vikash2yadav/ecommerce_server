const { Op } = require('sequelize');
const { STATUS_CODES, STATUS } = require('../Config/constant');
const { roles: roleSchema } = require('../Database/Schema');

class roleModel {

    // add role
    async addRole(bodyData) {

        let data = await roleSchema.findOne({
            where: {
                name: bodyData?.name
            }
        });

        if (data) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED
            }
        }

        return await roleSchema.create(bodyData);

    }

    // update role
    async updateRole(bodyData) {

        // check exist or not 
        let checkRole = await roleSchema.findOne({
            where: {
                id: bodyData?.id,
                is_delete: STATUS.NOTDELETED
            }
        });

        if (!checkRole) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        // check exist or not 
        let existRole = await roleSchema.findOne({
            where: {
                name: bodyData?.name,
                id: { [Op.ne]: bodyData?.id }
            }
        });

        if (existRole) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED
            }
        }

        return await roleSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        });
    }

    // delete role
    async deleteRole(id) {

        // check exist or not 
        let checkRole = await roleSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        });

        if (!checkRole) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await roleSchema.update({ is_delete: STATUS.DELETED }, {
            where: {
                id: id
            }
        })
    }

    // get role
    async getRole(id) { 

          // check exist or not 
          let checkRole = await roleSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        });

        if (!checkRole) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await roleSchema.findOne({
            where:{
                id: id
            }
        })
    }

    // get role list
    async getRoleList(bodyData) { 

        let data = await roleSchema.findAndCountAll();
        return data;
    }
}

module.exports = roleModel;
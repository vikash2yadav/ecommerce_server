const { modules: moduleSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS } = require('../Config/constant');
const { Op } = require('sequelize');

class moduleModel {

    // add module
    async addModule(bodyData, adminInfo) {

        let existModule = await moduleSchema.findOne({
            where: {
                name: bodyData?.name
            }
        });

        if (existModule) {
            return {
                status: STATUS_CODES?.ALREADY_REPORTED
            }
        }

        bodyData.created_by = adminInfo?.id;

        // add module
        return await moduleSchema.create(bodyData);
    }

    // update module
    async updateModule(bodyData, adminInfo) {

        // check module exist or not
        let checkModule = await moduleSchema.findOne({
            where: {
                id: bodyData?.id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkModule) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        let checkExistModuleName = await moduleSchema.findOne({
            where: {
                name: bodyData?.name,
                id: { [Op.ne]: bodyData?.id }
            }
        })

        if (checkExistModuleName) {
            return {
                status: STATUS_CODES.ALREADY_REPORTED
            }
        }

        bodyData.updated_by = adminInfo?.id;

        return await moduleSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }

    // delete module
    async deleteModule(id, adminInfo) {

        // check module exist or not
        let checkModule = await moduleSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkModule) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        // delete module
        return await moduleSchema.update({ is_delete: STATUS.DELETED,updated_by :adminInfo?.id }, {
            where: {
                id: id,
            }
        })
    }

    // get module
    async getModuleById(id, userInfo) {

        // check module exist or not
        let checkModule = await moduleSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkModule) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await moduleSchema.findOne({
            where: {
                id: id
            }
        })
    }

    // get module list
    async getModuleList(bodyData) {

        return await moduleSchema.findAndCountAll();

    }
}

module.exports = moduleModel
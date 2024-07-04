const roleModel = new(require('../Models/roles'));
const {STATUS_CODES, STATUS_MESSAGES} = require('../Config/constant');

class roleController {

    // add role
    async addRole(req, res) {
        try {
            let data = await roleModel.addRole(req?.body);

            if(data.status === STATUS_CODES.ALREADY_REPORTED){
                return res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.ROLE);
            }

            return res.handler.success(data, STATUS_MESSAGES.ROLE.ADDED);

        } catch (error) {
            res.handler.serverError(error);
        }
     }

    // update role
    async updateRole(req, res) { 
        try {
            let data = await roleModel.updateRole(req?.body);

            if(data.status === STATUS_CODES.NOT_FOUND){
                return res.handler.conflict(undefined, STATUS_MESSAGES.NOT_FOUND.ROLE);
            }

            if(data.status === STATUS_CODES.ALREADY_REPORTED){
                return res.handler.conflict(undefined, STATUS_MESSAGES.EXISTS.ROLE);
            }

            return res.handler.success(data, STATUS_MESSAGES.ROLE.UPDATED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // delete role
    async deleteRole(req, res) { 
        try {
             let data = await roleModel.deleteRole(req?.params?.id);

            if(data.status === STATUS_CODES.NOT_FOUND){
                return res.handler.conflict(undefined, STATUS_MESSAGES.NOT_FOUND.ROLE);
            }

            return res.handler.success(data, STATUS_MESSAGES.ROLE.DELETED);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get role
    async getRole(req, res) { 
        try {
            let data = await roleModel.getRole(req?.params?.id);

            if(data.status === STATUS_CODES.NOT_FOUND){
                return res.handler.conflict(undefined, STATUS_MESSAGES.NOT_FOUND.ROLE);
            }

            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }

    // get role list
    async getRoleList(req, res) { 
        try {
            
            let data = await roleModel.getRoleList(req?.body);
            return res.handler.success(data);

        } catch (error) {
            res.handler.serverError(error);
        }
    }
}

module.exports = roleController;
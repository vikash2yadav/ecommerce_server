var jwt = require('jsonwebtoken');
const { STATUS_MESSAGES } = require('../Config/constant');
const userModel = new(require('../Models/users'))

class Authentication {
    constructor() {
		this.userAuth = this.userAuth.bind(this);
        this.checkAccess = this.checkAccess.bind(this);
    }

    async userAuth(req, res, next) {
        let authToken = req.headers.authorization;

        if (!authToken) {
            res.handler.validationError(undefined, STATUS_MESSAGES.TOKEN.INVALID);
            return false
        }

        const userToken = await userModel.getUserTokenInfo(authToken);
        
        if (!userToken) {
            res.handler.unauthorized();
            return;
        }
        
        req.userInfo = userToken? userToken.user? userToken.user['dataValues'] : null : null;
        next();
    }

    checkAccess(currentModule, access, options = { }) {
        let { exception, key, value } = options;
        return async function (req, res, next) {

            let authToken = req.headers.authorization;

            if (!authToken) return res.handler.validationError(undefined, STATUS_MESSAGES.TOKEN.INVALID);

            const userToken = await userModel.getUserTokenInfo(authToken);

            if (!userToken) return res.handler.unauthorized();

            const user = await userModel.getUserById(userToken['user_id'])

            if (!user) return res.handler.unauthorized(undefined, STATUS_MESSAGES.NOT_FOUND.USER);

            /* 
                CHECK MODULE ACCESS
            */
            let plainUser = user.get({ plain: true }),
                hasAccess = !currentModule ? true : false,
                { modules } = plainUser.role

            if (currentModule)
                modules.forEach(module => {
                    if (module.name === currentModule)
                        hasAccess = module.permissions[access]
                });

            if(exception && value.includes(req.body[key])) hasAccess = true;

            if (!hasAccess)
                return res.handler.forbidden()

            req.userInfo = user['dataValues'];
            next();
        }.bind(this)

    }
}
module.exports = Authentication;
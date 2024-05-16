//GLOBAL STATUS
exports.STATUS_CODES = {
    // 1XX INFORMATIONAL
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    PROCESSING: 102,
    EARLY_HINTS: 103,

    // 2XX SUCCESS
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    MULTI_STATUS: 207,
    ALREADY_REPORTED: 208,
    IM_USED: 226,

    // 4XX CLIENT ERROR
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    CONFLICT: 409,
    PRECONDITION_FAILED: 412,
    VALIDATION_ERROR: 422,
    NOT_VALID_DATA: 422,

    // 5XX SERVER ERROR
    SERVER_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
};

//GLOBAL MESSAGES
exports.STATUS_MESSAGES = {
    SERVER_ERROR: "Internal server error! Please try again.",
    VERIFICATION_EMAIL_SENT: "We have sent you an verification email to your account",
    EMAIL_VERIFIED: "Your account has been verified successfully.",
    EMAIL_VERIFIED_ALREADY: "Your account is already verified.",
    REGISTER_SUCCESS: "You have successfully signed up.",
    LOGIN_SUCCESS: "You have successfully logged in.",
    IMAGE_SUCCESS: "Your image has been successfully saved.",
    IMAGE_REMOVED: 'Your image has been successfully removed.',
    RESET_PASSWORD_ALREADY: "You already have reset the password with this token.",

    EXISTS: {
        ACCOUNT_TYPE: 'Account Type is already exist!',
        USERNAME_OR_EMAIL: 'Username or email is already exist!',
        USER: "User already exist!",
        EMAIL: "Email is already registered!",
        EMAIL_GUEST: "It looks like you've ordered with us before! Click 'Forgot Password' to reset your password.",
        COUPON: "This coupon code already exist!",
        SLUG: "This slug already exist!",
        CONTACT: "Mobile number is already exist!",
        USERNAME: "Username is already exist!",
        TITLE: "This title already exist",
        EMAIL_ALREADY_EXISTS: "This email is already registered.!",
        ROLE: 'Role is already exist!',
        EMAIL_SUBSCRIBER: 'Email is already in our subscriber list.'
    },

    NOT_FOUND: {
        USERNAME: 'Username is not available in our system.',
        ACCOUNT_TYPE: 'Account Type is not available in our system.',
        USER: "You are not available in our system!",
        ROLE: "Role is not available in our system!",
        EMAIL: "Email is not available in our system!",
        IMAGE: "Image not available.",
        ACCOUNT: "We can't find this account",
        USER_LOOKUP: "User is not available in our system!",
        PAGE: "Page is not available in our system!",
        LEAVE_CONFIGURATION: "Leave Configuration is not available in our system!",
        ACCESS_TYPES: 'Access type is not available in our system!',
        POST_REPORT: 'Report is not available in our system!',
        POST_COMMENT: 'Comment is not available in our system!',
        SAVED_POST: 'Saved post is not available in our system!',
        POST_SHARE: "This data is not found.",
        NOTIFICATION: 'Notification is not available in our system.',
        EMOJI: 'Emoji is not available in our system.',
        EMAIL_SUBSCRIBER: 'Email is not found in our system.',
        TEAM_MEMBER: 'Team member is not found in our system.'
    },
    PASSWORD: {
        MISMATCH: "Provided password do not match",
        TOO_SIMPLE: "Please create more complicated password",
        INCORRECT: "Password incorrect",
        NOT_SAME: "New Password and confirm password are not same",
        CHANGED: "Password has been changed successfully",
        CURRENT_PASSWORD_MISMATCH: "Current password does not match."
    },
    PROCESS: {
        EMAIL_SENT: "We have sent email to your account",
        EMAIL_SENT_ACCOUNT: "We have sent email to %s"
    },
    CONTACT_US_PROCESS: {
        EMAIL_SENT: "Your email has been sent successfully"
    },
    TOKEN: {
        INVALID: "Your token is not valid.",
        EXPIRED: "Your token has been expired.",
        LOGOUT: "You have been successfully logged out."
    },
    USER: {
        SIGN_UP: 'You have signed up successfully.',
        REGISTERED: 'You have been registered successfully.',
        DELETED: 'User has been deleted successfully.',
        UPDATED: 'User has been updated successfully.',
        ADDED: 'User has been added successfully.',
        PROFILE_UPDATED: "Your profile has been updated successfully.",
        PROFILE_IMAGE_UPDATED: "Your profile image has been updated successfully.",
        PROFILE_DELETED: "Your profile has been deleted successfully.",
        NOT_VERIFIED: "Your email address is not verified.",
        INACTIVE: "Your email address is not active.",
        INVALID: "Please enter valid email & password."
    },
    ACCOUNT_TYPE: {
        ADDED: "Account type has been added successfully.",
        UPDATED: "Account type been updated successfully.",
        DELETED: "Account type been deleted successfully.",
    },
    EMAIL_SUBSCRIBER:{
        ADDED: "Email added in subscribers list.",
        UPDATED: "Email updated successfully.",
        DELETED: "Email removed from our subscribers list.",
    },
    TEAM_MEMBER:{
        ADDED: "Team member has been added successfully.",
        UPDATED: "Team member been updated successfully.",
        DELETED: "Team member been deleted successfully.",
    },
    POST_REPORT:{
        ADDED: "Report has been added successfully.",
        UPDATED: "Report been updated successfully.",
        DELETED: "Report been deleted successfully.",
    },
    POST_COMMENT:{
        ADDED: "Comment has been added successfully.",
        UPDATED: "Comment been updated successfully.",
        DELETED: "Comment been deleted successfully.",
    },
    SAVED_POST:{
        ADDED: 'Post added.',
        REMOVED: 'Post removed.'
    },
    POST_SHARE:{
        ADDED: 'Post added.',
        REMOVED: 'Post removed. '
    },
    NOTIFICATION:{
        ADDED: "Notification has been added successfully.",
        UPDATED: "Notification been updated successfully.",
        DELETED: "Notification been deleted successfully.",
    },
    ROLE: {
        ROLE_ADD: "Role has been added successfully.",
        ROLE_UPDATE: "Role has been updated successfully.",
        ROLE_DELETE: "Role has been deleted successfully.",
        ROLE_GET: "Role has been loaded successfully"
    },
    EMOJI:{
        ADDED: "Emoji has been added successfully.",
        UPDATED: "Emoji been updated successfully.",
        DELETED: "Emoji been deleted successfully.",
    },
    REQUEST: {
        LIST: "Request has been loaded successfully.",
        DELETED: "Request has been deleted successfully.",
        NOT_FOUND: "Provided request doesn't exist."
    },
    PAGE: {
        PAGE_ADD: "Your page has been added successfully.",
        PAGE_UPDATE: "Your page has been updated successfully.",
        PAGE_DELETE: "Your page has been deleted successfully.",
        PAGE_GET: "Page has been loaded successfully"
    },
    OTP: {
        INVALID: "Incorrect OTP.",
        EXPIRE: "OTP is expired. Please try again.",
        CORRECT: "OTP has been matched."
    },
    VALIDATION: {
        REQUIRED: {
            NAME: 'Please, enter name',
            DESIGNATION: 'Please, enter designation of the team member',
            DESCRIPTION: 'Please, enter description.',
            USER: 'Please, enter user id',
            ACCOUNT_TYPE: "Please, enter Account type.",
            PASSWORD: 'Please enter password.',
            NEW_PASSWORD: "Please enter new password.",
            CONTACT: 'Please enter contact number.',
            OTP: "Please enter otp.",
            IMAGE: "Please enter profile image.",
            GENDER: "Please enter gender.",
            BIRTH_DATE: "Please enter birth date.",
            PIN_CODE: "Please enter pin code.",
            COUNTRY_CODE: "Please enter country code.",
            PHONE: "Please enter phone.",
            LANGUAGE: "Please enter language.",
            CONFIRM_PASSWORD: "Please enter confirm password.",
            CURRENT_PASSWORD: "Please enter current password.",
            FIRST_NAME: "Please enter first name.",
            LAST_NAME: "Please enter last name.",
            TITLE: "Please enter title.",
            CONFIG_KEY: "Please enter configuration key.",
            CONFIG_VALUE: "Please enter configuration value.",
            CONFIG_SMTP: "Please enter port and server detail only for the emailSmtpDetail configuration.",
            RESET_TOKEN: "Please enter reset token.",
            USER_ID: "Please enter user id",
            USERNAME: "Please enter username.",
            TYPE: "Please enter clock type",
            START_DATE: "Please enter week start date",
            END_DATE: "Please enter week end date",
            ITEMS_PER_PAGE: "Per page is required",
            CURRENT_PAGE: "Current page is required",
            CUSTOMER_ID: "Missing customer id",
            KEYWORD: "Missing search keyword",
            ORDER_TRANSACTION_ID: "Missing transaction id",
            MOBILE_NUMBER: "Please enter valid mobile number",
            USER_ID: "Please enter user ID",
            ADDRESS: "Please enter address",
            ZIP_CODE: "Please enter zip code",
            STATE_ID: "Please enter state ID",
            COUNTRY_ID: "Please enter country ID",
            TABLE: "Please enter table name",
            STATUS: "Please enter valid status",
            ID: "Please enter id",
            LOCAL_PHONE1: "Please enter local phone1",
            EMAIL: "Please enter email",
            CITY: "Please enter city",
            COUNTRY: "Please enter country",
            STATE: "Please enter state",
            INVALID_EMAIL: "Invalid email address",
            USERNAMESIZE: "Username should be minimum 6 character",
            ROLE: {
                ID: "Please enter role",
                TITLE: "Please enter role name",
                STATUS: "Please enter role status",
                DEFAULT_ROLE: "You can not delete default Role"
            },
        },
        VALID: {
            USERNAME: "Please enter valid username.",
            EMAIL: "Please enter valid email address.",
            PASSWORD: "Please enter valid password.",
            ROLE_ID: "Please enter role ID.",
            STATUS: "Please enter valid status.",
            TOKEN: "Please enter valid token.",
            IDENTITY_TOKEN: "Please enter valid identity token.",
            MODULE: "Please enter valid module",
            IMAGE_FILE_TYPE: "Only support jpeg,jpg,png,gif image types",
        },
        LENGTH: {
            USERNAME_MIN: "Username must be minimum of 4 character long.",
            USERNAME_MAX: "Username must be maximum of 16 character long.",
            PASSWORD: "Password must be minimum of 6 character long."
        },
        EXISTS: {
            ROLE: "There is already one role with Same name",
            DELIVERY_MATRIX: "There is already similar delivery matrix",
        },
    },

};

// File Path
exports.IMG_FOLDER_NAME = {
    USER_PROFILE: '/User/Profile',
    COVER_PROFILE: '/User/Cover'
};

// Generic Status
exports.STATUS = {
    NO: 0,
    YES: 1,
    UNREAD: 0,
    READ: 1,
    NOTDELETED: 0,
    INACTIVE: 0,
    ACTIVE: 1,
    DELETED: 1,
    APPROVE: 3,
    REJECTED: 4,
    COMPLETED: 5,
    DEFAULT: 1,
    NOT_DEFAULT: 0,
    TRUE: true,
    FALSE: false
};

// Notifications type
exports.NOTIFICATION_TYPE ={
    INFORMATION: 1,
    SUGGESTION: 2,
    ALERT: 3,
    WARNING: 4
}

// User type
exports.ROLE_TYPES = {

}

exports.ROLE_TYPES_ID = {

}

//Role Modules
exports.MODULES = {
    USER: "Users",
}

// Role Permission
exports.ACCESS_TYPES = {
    READ: "read_access",
    WRITE: "write_access",
    DELETE: "delete_access",
};

exports.USER_ACCOUNT_TYPE = {
    PUBLIC: 1,
    PRIVATE: 2
}
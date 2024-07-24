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
    EMAIL_SENT: 'We have sent otp to your registered email',
    OLD_PASSWORD:{
        WRONG: 'You old password is not right'
    },

    EXISTS: {
        ACCOUNT_TYPE: 'Account Type is already exist!',
        USERNAME_OR_EMAIL: 'Username or email is already exist!',
        PRODUCT_VARIANT_SKU_CODE: 'This sku code is already exist for product variant',
        SKU_CODE: 'This sku is exist for primary product',
        ATTRIBUTE: 'Attribute is already exist',
        USER: "User already exist!",
        PRODUCT_VARIANT: 'This variat is already exist in our system',
        CART_ITEM: 'This cart item is already exist',
        EMAIL: "Email is already registered!",
        EMAIL_GUEST: "It looks like you've ordered with us before! Click 'Forgot Password' to reset your password.",
        COUPON: "This coupon code already exist!",
        SLUG: "This slug already exist!",
        CONTACT: "Mobile number is already exist!",
        USERNAME: "Username is already exist!",
        TITLE: "This title already exist",
        EMAIL_ALREADY_EXISTS: "This email is already registered.!",
        ROLE: 'Role is already exist!',
        EMAIL_SUBSCRIBER: 'Email is already in our subscriber list.',
        MODULE: "This Module is already exist in our system",
        PRODUCT: 'This product slug is already in our system.',
        CATEGORY: 'This category slug is already in our system.',
        PRODUCT_REVIEW: 'Your review is already in our system for this product.',
        CART_PRODUCT: 'This Product is available in the cart',
        PRODUCT_FAQ: 'This Faq is available in our system',
        WISH: 'This wish is available in our system',
        USER_COUPON: 'This coupon is already assign to this user',
        LANGUAGE: 'This language is already exist',
        ATTRIBUTE_VALUE: 'This value is already exist ',
        LANGUAGE_CODE: 'THis language code is already exist in our system',
        NEW_RELEASE: 'This data is already exist in new release',
        OUR_CHOICE: 'This data is already exist in our choice',
        BEST_SELLER: 'This data is already exist in best seller'
    },

    NOT_FOUND: {
        USERNAME: 'Username is not available in our system.',
        SKU_CODE: 'This sku is not found in our system.',
        ACCOUNT_TYPE: 'Account Type is not available in our system.',
        USER: "You are not available in our system!",
        ROLE: "Role is not available in our system!",
        ATTRIBUTE_VALUE: 'This value is not available in our system',
        CART_ITEM: 'This item is not fount in our system',
        COUNTRY: 'This country is not found in our system',
        INQUIRY: 'This inquiry is not found in our system',
        CITY: 'This city is not found',
        STATE: 'This state is not found in our system',
        EMAIL: "Email is not available in our system!",
        ORDER_ITEM: 'Order item is not found in our system',
        IMAGE: "Image not available.",
        MODULE: "This module is not found in our system",
        PRODUCT_VARIANT: 'This variant is not found in our system', 
        ATTRIBUTE: 'Attribute is not found in our system',
        ACCOUNT: "We can't find this account",
        USER_LOOKUP: "User is not available in our system!",
        PAGE: "Page is not available in our system!",
        LEAVE_CONFIGURATION: "Leave Configuration is not available in our system!",
        ACCESS_TYPES: 'Access type is not available in our system!',
        POST_REPORT: 'Report is not available in our system!',
        POST_COMMENT: 'Comment is not available in our system!',
        SAVED_POST: 'Saved post is not available in our system!',
        POST_SHARE: "This data is not found.",
        ADDRESS: 'This address is not found in our system',
        NOTIFICATION: 'Notification is not available in our system.',
        EMOJI: 'Emoji is not available in our system.',
        OUR_CHOICE: 'This data in not found in our choice',
        EMAIL_SUBSCRIBER: 'Email is not found in our system.',
        TEAM_MEMBER: 'Team member is not found in our system.',
        PRODUCT: 'Product is not available in our system.',
        CATEGORY: 'Category is not available in our system.',
        ORDER: 'Order is not available in our system.',
        PRODUCT_REVIEW: 'Product review is not found in our system.',
        CART_PRODUCT: 'Product is not found in your cart.',
        PRODUCT_FAQ: 'Product faq is not found in our system.',
        PAYMENT: 'Payment is not found in our system.',
        WISH: 'This wish is not found in our system.',
        COUPON: 'This coupon code is not found in our system.',
        USER_COUPON: 'This user coupon is not fount in our system',
        LANGUAGE: 'This language is not found in our system',
        NEW_RELEASE: 'This data is not found in our new release list',
        BEST_SELLER: 'This data is not found in our best seller'
    },
    PASSWORD: {
        MISMATCH: "Provided password do not match",
        ALREADY_CHANGED: "You have already change password by this otp verification ",
        TOO_SIMPLE: "Please create more complicated password",
        SAME_AS_OLD_PASSWORD: 'This new password is as same as current password',
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
    ADMIN: {
        ADDED: 'Admin added successfully',
        DELETED: 'Admin deleted successfully',
        UPDATED: 'Admin updated successfully',
        STATUS_CHANGED: 'Admin status changed successfully',
        SIGN_IN: 'You have logged in successfully',
        INACTIVE: 'now, You are inactive'
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
    PRODUCT: {
        ADDED: "Product has been added successfully.",
        UPDATED: "Product been updated successfully.",
        DELETED: "Product been deleted successfully.",
        INACTIVE: 'Product status is in active.',
        STATUS_CHANGED: 'Product status changed successfully',
        TRY_AGAIN: 'There is some problem detected, please try again !'
    },
    DELIVERY_PARTNER:{
        ADDED: "Delivery Partner has been added successfully.",
        UPDATED: "Delivery Partner been updated successfully.",
        DELETED: "Delivery Partner been deleted successfully.",
    },
    OUR_CHOICE: {
        ADDED: "Our choice has been added successfully.",
        UPDATED: "Our choice been updated successfully.",
        DELETED: "Our choice been deleted successfully.",
    },
    ATTRIBUTE:{
        ADDED: "Attribute has been added successfully.",
        UPDATED: "Attribute been updated successfully.",
        DELETED: "Attribute been deleted successfully.",
    },
    VENDOR: {
        ADDED: "Vendor has been added successfully.",
        UPDATED: "Vendor been updated successfully.",
        DELETED: "Vendor been deleted successfully.",
        STATUS_CHANGED: "Vendor status changed successfully"
    },
    CART_ITEM: {
        ADDED: "Cart item has been added successfully.",
        UPDATED: "Cart item been updated successfully.",
        DELETED: "Cart item been deleted successfully.",
    },
    INQUIRY: 
    {
        ADDED: "Inquiry has been added successfully.",
        UPDATED: "Inquiry been updated successfully.",
        DELETED: "Inquiry been deleted successfully.",
    },
    ORDER_ITEM: {
        ADDED: "Order item has been added successfully.",
        UPDATED: "Order item been updated successfully.",
        DELETED: "Order item been deleted successfully.",
    },
    ACCOUNT:{
        DELETED: 'Your account has been deleted successfully' 
    },
    ATTRIBUTE_VALUE: {
        ADDED: "Attribute value has been added successfully.",
        UPDATED: "Attribute value been updated successfully.",
        DELETED: "Attribute value been deleted successfully.",
    },
    ADDRESS: {
        ADDED: "Address has been added successfully.",
        UPDATED: "Address been updated successfully.",
        DEFAULT_CHANGED: 'Default Address has been changed.',
        DELETED: "Address been deleted successfully.",
    },
    MODULE: {
        ADDED: "Module has been added successfully.",
        UPDATED: "Module been updated successfully.",
        DELETED: "Module been deleted successfully.",
    },
    PRODUCT_VARIANT: {
        ADDED: "Product variant has been added successfully.",
        UPDATED: "Product variant been updated successfully.",
        DELETED: "Product variant been deleted successfully.",
    },
    CATEGORY: {
        ADDED: "Category has been added successfully.",
        UPDATED: "Category been updated successfully.",
        DELETED: "Category been deleted successfully.",
        INACTIVE: 'Category status is in active.',
        STATUS_CHANGED: 'Category status changed.'
    },
    ORDER: {
        ADDED: "Order has been placed successfully.",
        UPDATED: "Order been updated successfully.",
        DELETED: "Order been deleted successfully.",
    },
    PRODUCT_REVIEW:{
        ADDED: "Product review has been placed successfully.",
        UPDATED: "Product review been updated successfully.",
        DELETED: "Product review been deleted successfully.",
        STATUS_CHANGED: 'Product review status changed successfully'
    },
    CART_PRODUCT:{
        ADDED: "Product has been added in the cart.",
        UPDATED: "Product been updated in the cart.",
        DELETED: "Product been deleted in the cart.",
    },
    PRODUCT_FAQ: {
        ADDED: "Product faq has been added successfully.",
        UPDATED: "Product faq been updated successfully.",
        DELETED: "Product faq been deleted successfully.",
        STATUS_CHANGED: 'Faq status changed successfully'
    },
    PRODUCT_FAQ_REACTION:{
        ADDED: "Faq reaction has been added successfully.",
        UPDATED: "Faq reaction been updated successfully.",
        DELETED: "Faq reaction been deleted successfully.",
    },
    PAYMENT: {
        ADDED: "Payment has been added successfully.",
        UPDATED: "Payment been updated successfully.",
        DELETED: "Payment been deleted successfully.",
    },
    WISH: {
        ADDED: "Wish has been added successfully.",
        UPDATED: "Wish been updated successfully.",
        DELETED: "Wish been deleted successfully.",
    },
    COUPON:{
        ADDED: "Coupon has been added successfully.",
        UPDATED: "Coupon been updated successfully.",
        DELETED: "Coupon been deleted successfully.",
    },
    USER_COUPON: {
        ADDED: "Users Coupon has been added successfully.",
        UPDATED: "Users Coupon been updated successfully.",
        DELETED: "Users Coupon been deleted successfully.",
    },
    LANGUAGE: {
        ADDED: "Language has been added successfully.",
        UPDATED: "Language been updated successfully.",
        DELETED: "Language been deleted successfully.",
    },
    NEW_RELEASE: {
        ADDED: "New release has been added successfully.",
        UPDATED: "New release been updated successfully.",
        DELETED: "New release been deleted successfully.",
    },
    BEST_SELLER:{
        ADDED: "Best seller has been added successfully.",
        UPDATED: "Best seller been updated successfully.",
        DELETED: "Best seller been deleted successfully.",
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
        ADDED: "Role has been added successfully.",
        UPDATED: "Role has been updated successfully.",
        DELETED: "Role has been deleted successfully.",
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
            SKU_CODE: 'Please, enter sku code',
            NAME: 'Please, enter name',
            MODULE: 'Please, enter module',
            SLUG: 'Please, enter slug',
            PARENT_ID: 'enter parent id',
            ATTRIBUTE_VALUE: 'Please, enter attribute value',
            ATTRIBUTE: 'Please, enter attribute',
            VALUE: 'Please, enter value',
            MESSAGE: 'Please, enter message',
            PRODUCT: 'Please, enter product.',
            COUPON: 'Please, enter coupon',
            TOTAL_PRICE: 'Please, enter total amount',
            PRODUCT_VARIANT: 'Please, enter product variant',
            VENDOR: 'Please, enter Vendor',
            CART: 'Please, enter cart',
            QUANTITY: 'Please, enter quantity',
            CODE: 'Please, enter code',
            DESCRIPTION: 'Please, enter description.',
            USER: 'Please, enter user id',
            COLOR: 'Please, enter color',
            QUESTION: 'Please, enter question',
            DISCOUNT: 'Please, enter discount',
            TOTAL_DISCOUNT: 'Please, enter total discount',
            STOCK: 'Please, enter stock',
            WEIGHT: 'Please, enter weight',
            DIMENTION: 'Please, enter dimentions',
            MATERIAL: 'Please, enter material of product',
            ANSWER: 'Please, enter answer',
            ACCOUNT_TYPE: "Please, enter Account type.",
            EXPIRED_TIME: 'Please, enter expired time',
            ORDER: 'Please, enter order id',
            PRICE: 'Please, enter price',
            RATING: 'Please, enter rating',
            COMMENT: 'Please, enter comment',
            REACTION: 'Please, enter reaction',
            PAYMENT_MODE: 'Please, enter payment mode',
            PAYMENT_STATUS: 'Please, enter payment status',
            ORDER_DATE: "Please, enter order date",
            AMOUNT: 'Please, enter total amount',
            SHIPPED_ADD: 'Please, enter shipping address',
            PASSWORD: 'Please enter password.',
            NEW_PASSWORD: "Please enter new password.",
            CONTACT: 'Please enter contact number.',
            OTP: "Please enter otp.",
            CATEGORY: 'Please, enter category',
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

// payment status
exports.PAYMENT_STATUS = {
    FAILED: 0,
    SUCCESS: 1
}

// File Path
exports.IMG_FOLDER_NAME = {
    USER_PROFILE: '/User/Profile',
    COVER_PROFILE: '/User/Cover'
};

// gender
exports.GENDER = {
    Male: 1,
    Female: 2,
    Others: 3
}

// role id
exports.ROLE = {
    SUPER_ADMIN: 1,
    ADMIN: 2,
    VENDOR: 3,
    DELIVERY_PARTNER: 4,
    CUSTOMER: 5
}

// Order status
exports.ORDER_STATUS = {
    PENDING: 0,
    SHIPPED: 1,
    DELIVERED: 2,
    CANCELLED: 3
}

// Generic Status
exports.STATUS = {
    ZERO: 0,
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
    FALSE: false,
    NOT_EXPIRED: 0
};

// Notifications type
exports.NOTIFICATION_TYPE ={
    INFORMATION: 1,
    SUGGESTION: 2,
    ALERT: 3,
    WARNING: 4
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
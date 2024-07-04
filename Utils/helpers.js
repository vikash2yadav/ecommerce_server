const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const FileManager = new (require('../Utils/file_manager'))
const fs = require('fs')

// Generate Otp for forgot password
async function generateOtp() {
    return otpGenerator.generate(6, {
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false
    });
}

// To create Hash Password
async function createHashPassword(password) {
    return await bcrypt.hash(password, 10);
}

// Get File Name
async function getFileName(url) {
    return test = url.split('/').pop();
}

// Delete From Folder
async function unlinkRemoveFile(folderName, url) {
    let localPath = FileManager.resolvePath(folderName);
    let fileName = await getFileName(url);
    fs.unlink(localPath + fileName, function (err) {
        if (err) {
            return { data: err, status: false };
        } else {
            return { data: "err", status: true };
        }
    })
}

module.exports = {
    generateOtp,
    createHashPassword,
    unlinkRemoveFile,
};

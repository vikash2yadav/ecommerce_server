const multer = require('multer')
const path = require('path');
const jimp = require('jimp');
const sharp = require('sharp');
const fs = require('fs');

class FileManager {

    getFileName(file) {
        return file.originalname.split('.')[0].replace(/[^A-Z0-9]/ig, "_") + '_' + Date.now() + '_' + Math.floor(Math.random() * 999) + 99 + path.extname(file.originalname)
    }

    resolvePath(filepath) {
        // Create folder if not exist
        let utilPath = (__dirname).split("\\"); // Get Util path [ 'F:', 'Repo', 'Daily-Book', 'Utils' ]
        utilPath.pop(utilPath?.length - 1);        // remove last element from array[utils] [  'F:', 'Repo', 'Daily-Book']
        let PathJoin = utilPath.join("/") + "/Assets/images" + filepath;    // join path with Asset --> F:/Repo/Daily-Book/Assets/images/Admin
        let pathToCreateFolder = PathJoin.split("/");       // convert in to array to step by step create required folder [ 'F:', 'Repo', 'Daily-Book', 'Assets', 'images', 'Admin' ]
        let folderToCreate = utilPath.join("\\");      // get util path for concate required path ----> F:\Repo\Daily-Book
        for (let i = utilPath?.length; i <= pathToCreateFolder?.length - 1; i++) {
            folderToCreate = folderToCreate.concat("\\" + pathToCreateFolder[i])
            if (!fs.existsSync(folderToCreate)) {               // if folder doesn't exist then create
                fs.mkdirSync(folderToCreate);
            }
        }
        return path.join(__dirname, "../Assets/Images/" + filepath + "/")
    }

    userUploadImage(folderName) {
        var storage = multer.diskStorage({
            destination: function (req, file, callBack) {
                if (req?.files) {
                    if (file.fieldname === 'profile_image') {
                        callBack(null, this.resolvePath('/User/Profile'));
                    } else if (file.fieldname === 'cover_image') {
                        callBack(null, this.resolvePath('/User/Cover'));
                    }
                }
                else {
                    if (folderName) {
                        callBack(null, this.resolvePath(folderName))
                    } else {
                        callBack(null, this.resolvePath(req?.body?.folderName))
                    }
                }
            }.bind(this),
            filename: function (req, file, callBack) {
                let fileName = this.getFileName(file);
                if (!req.body[file.fieldname]) {
                    req.body[file.fieldname] = []
                    req.body[file.fieldname].push(fileName)
                } else
                    req.body[file.fieldname].push(fileName)
                callBack(null, fileName)
            }.bind(this),
        })

        return multer({ storage })
    }


    // Create Live Image URL 
    createLiveImageURL(filedata, folderName, imageCount) {
        if (imageCount === 'single') {
            return process.env.FRONTEND_IMAGE_PATH + folderName + "/" + filedata[0]
        }
        else {
            return process.env.FRONTEND_IMAGE_PATH + folderName + "/" + filedata?.filename
        }
    }

    // Get image meta data 
    async getMetaData(file) {
        try {
            let { bitmap: { width, height }, _originalMime: mimeType } = await jimp.read(file)
            return { width, height, mimeType }
        } catch (error) {
            return {}
        }
    }

    async getImageMetaData(files, filePath) {

        filePath = this.resolvePath(filePath)
        let promises = [], extensions = []
        if (files && files != undefined && files.length > 0) {
            files.forEach(async file => {
                promises.push(getMetaData(filePath + file))
                extensions.push(getExtension(file))
            });

            let fileMetaData = await Promise.all(promises);
            return fileMetaData.map((meta, index) => { return { ...meta, extension: extensions[index] } })

            async function getMetaData(file) {
                try {
                    const { width, height, format } = await sharp(file).metadata();
                    return { width, height, mimeType: format };
                } catch (error) {
                    return {}
                }
            }

            function getExtension(file) {
                return path.extname(file)
            }
        } else {
            return [];
        }
    }
}

module.exports = FileManager;
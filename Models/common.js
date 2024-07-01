const { cities: citySchema, countries: countrySchema, states: stateSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS } = require('../Config/constant');

class commonModel {

    // get country by id
    async getCountryById(id) { 

         // check country exist or not
         let checkCountry = await countrySchema.findOne({
            where: {
                id: id
            }
        })

        if (!checkCountry) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return checkCountry;
    }

    // get country list
    async getCountryList(bodyData) {

        var currentPage;
        var itemsPerPage;
        var lastRecordIndex;
        var firstRecordIndex;
        if (bodyData?.currentPage && bodyData?.itemsPerPage) {
            currentPage = bodyData?.currentPage;
            itemsPerPage = bodyData?.itemsPerPage;
            lastRecordIndex = currentPage * itemsPerPage;
            firstRecordIndex = lastRecordIndex - itemsPerPage;
        }
        var sortBy = [];
        if (bodyData?.sortBy && bodyData?.sortBy?.length > 0) {
            bodyData?.sortBy?.map((sort) => {
                if (sort?.id !== "" && sort?.desc !== "") {
                    if (sort?.desc == true) {
                        sortBy?.push([sort?.id, "desc"]);
                    } else {
                        sortBy?.push([sort?.id, "asc"]);
                    }
                }
            });
        }
        if (sortBy?.length < 1) {
            sortBy = [['id', 'asc']];
        }
        var filterQuery = {};
        if (bodyData?.filters && bodyData?.filters?.length > 0) {
            bodyData?.filters?.forEach((filter) => {
                if (filter?.id != "" && filter?.value != "") {
                    if (typeof (filter?.value) === 'string') {
                        filterQuery[filter?.id] = {
                            [SEQUELIZE.Op.like]: `%${filter?.value.trim()}%`,
                        }
                    }
                    else {
                        filterQuery[filter?.id] = {
                            [SEQUELIZE.Op.eq]: `${filter?.value}`
                        };
                    }
                }
            });
        }

        return await countrySchema.findAndCountAll({
            where: {
                ...filterQuery,
            },
            offset: firstRecordIndex,
            limit: itemsPerPage,
            order: [...sortBy],
        });
        
     }

     // get city by id
    async getCityById(id) { 

        // check city exist or not
        let checkCity = await citySchema.findOne({
           where: {
               id: id
           }
       })

       if (!checkCity) {
           return {
               status: STATUS_CODES.NOT_FOUND
           }
       }

       return checkCity;
   }

   // get city list
   async getCityList(bodyData) {

    var currentPage;
    var itemsPerPage;
    var lastRecordIndex;
    var firstRecordIndex;
    if (bodyData?.currentPage && bodyData?.itemsPerPage) {
        currentPage = bodyData?.currentPage;
        itemsPerPage = bodyData?.itemsPerPage;
        lastRecordIndex = currentPage * itemsPerPage;
        firstRecordIndex = lastRecordIndex - itemsPerPage;
    }
    var sortBy = [];
    if (bodyData?.sortBy && bodyData?.sortBy?.length > 0) {
        bodyData?.sortBy?.map((sort) => {
            if (sort?.id !== "" && sort?.desc !== "") {
                if (sort?.desc == true) {
                    sortBy?.push([sort?.id, "desc"]);
                } else {
                    sortBy?.push([sort?.id, "asc"]);
                }
            }
        });
    }
    if (sortBy?.length < 1) {
        sortBy = [['id', 'asc']];
    }
    var filterQuery = {};
    if (bodyData?.filters && bodyData?.filters?.length > 0) {
        bodyData?.filters?.forEach((filter) => {
            if (filter?.id != "" && filter?.value != "") {
                if (typeof (filter?.value) === 'string') {
                    filterQuery[filter?.id] = {
                        [SEQUELIZE.Op.like]: `%${filter?.value.trim()}%`,
                    }
                }
                else {
                    filterQuery[filter?.id] = {
                        [SEQUELIZE.Op.eq]: `${filter?.value}`
                    };
                }
            }
        });
    }

    return await citySchema.findAndCountAll({
        where: {
            ...filterQuery,
        },
        offset: firstRecordIndex,
        limit: itemsPerPage,
        order: [...sortBy],
    });
       
    }

    // get state by id
    async getStateById(id) { 

        // check state exist or not
        let checkState = await stateSchema.findOne({
           where: {
               id: id
           }
       })

       if (!checkState) {
           return {
               status: STATUS_CODES.NOT_FOUND
           }
       }

       return checkState;
   }

   // get state list
   async getStateList(bodyData) {

    var currentPage;
    var itemsPerPage;
    var lastRecordIndex;
    var firstRecordIndex;
    if (bodyData?.currentPage && bodyData?.itemsPerPage) {
        currentPage = bodyData?.currentPage;
        itemsPerPage = bodyData?.itemsPerPage;
        lastRecordIndex = currentPage * itemsPerPage;
        firstRecordIndex = lastRecordIndex - itemsPerPage;
    }
    var sortBy = [];
    if (bodyData?.sortBy && bodyData?.sortBy?.length > 0) {
        bodyData?.sortBy?.map((sort) => {
            if (sort?.id !== "" && sort?.desc !== "") {
                if (sort?.desc == true) {
                    sortBy?.push([sort?.id, "desc"]);
                } else {
                    sortBy?.push([sort?.id, "asc"]);
                }
            }
        });
    }
    if (sortBy?.length < 1) {
        sortBy = [['id', 'asc']];
    }
    var filterQuery = {};
    if (bodyData?.filters && bodyData?.filters?.length > 0) {
        bodyData?.filters?.forEach((filter) => {
            if (filter?.id != "" && filter?.value != "") {
                if (typeof (filter?.value) === 'string') {
                    filterQuery[filter?.id] = {
                        [SEQUELIZE.Op.like]: `%${filter?.value.trim()}%`,
                    }
                }
                else {
                    filterQuery[filter?.id] = {
                        [SEQUELIZE.Op.eq]: `${filter?.value}`
                    };
                }
            }
        });
    }

    return await stateSchema.findAndCountAll({
        where: {
            ...filterQuery,
        },
        offset: firstRecordIndex,
        limit: itemsPerPage,
        order: [...sortBy],
    });
       
    }
}

module.exports = commonModel
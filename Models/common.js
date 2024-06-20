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

        return await countrySchema.findAndCountAll();
        
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

       return await citySchema.findAndCountAll();
       
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

       return await stateSchema.findAndCountAll();
       
    }
}

module.exports = commonModel
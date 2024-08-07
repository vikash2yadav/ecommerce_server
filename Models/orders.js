const { orders: orderSchema, partners: shippedAddressSchema, users: userSchema, order_items: orderItemSchema, products: productSchema, partners: partnerSchema } = require('../Database/Schema');
const { STATUS_CODES, STATUS, ROLE } = require('../Config/constant');

class orderModel {

    // add order
    async addOrder(bodyData) {

        return await orderSchema.create(bodyData);
    }

    // update order
    async updateOrder(bodyData) {

        // check exists order
        let checkOrder = await orderSchema.findOne({
            where: {
                id: bodyData?.id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkOrder) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await orderSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }


    // order status change
    async orderStatusChange(adminInfo, bodyData) {

        let order = await orderSchema.findOne({
            where: {
                id: bodyData?.id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!order) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await orderSchema.update(bodyData, {
            where: {
                id: bodyData?.id
            }
        })

    }


    // delete Order
    async deleteOrder(id) {

        // check exists order
        let checkOrder = await orderSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkOrder) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await orderSchema.update({ is_delete: STATUS.DELETED }, {
            where: {
                id: id
            }
        })
    }

    // get Order
    async getOrder(id) {

        // check exists order
        let checkOrder = await orderSchema.findOne({
            where: {
                id: id,
                is_delete: STATUS.NOTDELETED
            }
        })

        if (!checkOrder) {
            return {
                status: STATUS_CODES.NOT_FOUND
            }
        }

        return await orderSchema.findOne({
            where: {
                id: id
            }
        })
    }

    // get Order list
    async getOrderList(bodyData) {

        var currentPage = null,itemsPerPage,lastRecordIndex,firstRecordIndex;
        if (bodyData?.currentPage && bodyData?.itemsPerPage) {
            currentPage = bodyData.currentPage;
            itemsPerPage = bodyData.itemsPerPage;
            lastRecordIndex = currentPage * itemsPerPage;
            firstRecordIndex = lastRecordIndex - itemsPerPage;
        }

        var sortBy = [];
        if (bodyData?.sortBy && bodyData.sortBy.length > 0) {
            bodyData.sortBy.forEach((sort) => {
                if (sort.id !== "" && sort.desc !== "") {
                    if (sort?.desc === true) {
                        sortBy.push([sort.id, 'desc'])
                    }else{
                        sortBy.push([sort.id, 'asc'])
                    }
                }
            });
        }
        if (sortBy.length < 1) {
            sortBy = [['id', 'desc']];
        }

        var filterQuery = {}, customerQuery = {}, partnerQuery = {};
        if (bodyData?.filters && bodyData.filters.length > 0) {
            bodyData.filters.forEach((filter) => {
                if (filter.id != "" && filter.value != "") {
                    if (typeof (filter.value) === 'string') {
                        if (filter.id === 'user.full_name') {
                            customerQuery["full_name"] = {
                                [SEQUELIZE.Op.like]: `%${filter.value.trim()}%`,
                            };
                        }else if (filter.id === 'partner.full_name') {
                            partnerQuery["full_name"] = {
                                [SEQUELIZE.Op.like]: `%${filter.value.trim()}%`,
                            };
                        } else if (filter.id === 'status') {
                            if (filter?.value === '2') {
                                filterQuery;
                            } else {
                                filterQuery[filter.id] = {
                                    [SEQUELIZE.Op.like]: `%${filter.value.trim()}%`,
                                };
                            }
                        }
                        else {
                            filterQuery[filter.id] = {
                                [SEQUELIZE.Op.like]: `%${filter.value.trim()}%`,
                            };
                        }
                    }
                }
            });
        }

        const includeConditions = [];
        if (Object.keys(customerQuery).length > 0) {
            includeConditions.push({
                model: userSchema,
                where: customerQuery,
            });
        } else {
            includeConditions.push({
                model: userSchema,
            });
        }

        if (Object.keys(partnerQuery).length > 0) {
            includeConditions.push({
                model: partnerSchema,
                where: partnerQuery,
            });
        } else {
            includeConditions.push({
                model: partnerSchema,
            });
        }

        return await orderSchema.findAndCountAll({
            where:{
                is_delete: STATUS.NOTDELETED,
                ...filterQuery
            },
            include: includeConditions,
            offset: firstRecordIndex,
            limit: itemsPerPage,
            order: sortBy,
        })


        return await orderSchema.findAndCountAll({
            where: {
                is_delete: STATUS.NOTDELETED
            },
            include: [
                {
                    model: userSchema
                },
                {
                    model: partnerSchema
                },
                {
                    model: shippedAddressSchema
                }
            ]
        });

    }


    // --------------------------- vendor routes ---------------------------             

    // get vendor Order list
    async getVendorOrdersList(bodyData) {

        return await orderSchema.findAndCountAll({
            where: {
                vendor_id: 1,
                is_delete: STATUS.NOTDELETED,
            }
        });

    }



        // --------------------------- customers routes ---------------------------             

    // get customer Order list
    async getMyOrdersList(userInfo) {

        return await orderSchema.findAndCountAll({
            where: {
                user_id: userInfo?.id,
                is_delete: STATUS.NOTDELETED,
            }
        });

    }

    // get update customer 
    async updateMyOrder(userInfo, bodyData) {

        return await orderSchema.update(bodyData , {
            where: {
                id: userInfo?.id
            }
        });

    }

    // get delete customer 
    async deleteMyOrder(userInfo, id) {
        return await orderSchema.update({is_delete: STATUS.DELETED} , {
            where: {
                id: id
            }
        });

    }

}

module.exports = orderModel
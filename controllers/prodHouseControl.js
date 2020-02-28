
const { ProductionHOuse } = require('../models/index')
//const { op } = require("sequelize")

class ProductionHouse{
    static show(req, res){
        ProductionHOuse.findAll({
            order: [
                ['name_prodHouse','ASC']
            ]
        })
            .then(data => res.render('prodHouse', {data}))   //res.send(data))
            .catch(e => res.send(e))
    }
    
}

module.exports = ProductionHouse
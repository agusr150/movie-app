
const { Movie } = require('../models/index')
const { Op } = require("sequelize")
//const { CastFilm } = require('../models/index')
const { Cast } = require('../models/index')
const searchAge = require('../helpers/searchAge')

class CastControl{
    static show(req, res){
        Cast.findAll()
            .then(function(data){
                res.render('cast', {data})
            })
            .catch(e=>res.send(e))
    }

    static addForm(req, res){
            res.render('addCast')
    }

    static add(req, res){
        let newdata ={
            first_name: req.body.fname,
            last_name: req.body.lname,
            phone_number: req.body.pnumber,
            birth_year: req.body.byear,
            gender: req.body.gender
        }
        Cast.create(newdata)
            .then(data=>res.redirect("/casts"))
            .catch(e=>res.send(e))
    }

    //
    static editForm(req, res){
        let searchId = req.params.id
        Cast.findOne({
            where: {id: searchId}
        })
            .then (data => res.render('editCast',{data}))
            .catch(e => res.send(e) )
    }

    static edit(req,res){
        let searchId = Number(req.params.id)
        let newdata ={
            first_name: req.body.fname,
            last_name: req.body.lname,
            phone_number: req.body.pnumber,
            birth_year: req.body.byear,
            gender: req.body.gender
        }        
        Cast.update(newdata, {
            where: {
                id: searchId
                }
            })
            .then(data=> res.redirect("/casts"))
            .catch(e => res.send(e))       
    }

    static delete(req, res){
        let searchId = Number(req.params.id)
        Cast.destroy({
            where: {
                id: searchId
            }
        })
            .then (data => res.redirect("/casts"))
            .catch (e => res.send(e))
    }

    static seeMoviesForm(req,res){
        let searchId = req.params.id
        Cast.findOne({
            where: {id: searchId},
            include: [{model: Movie}]
        })
            .then(function(actor){
                //res.send(actor)
                let movie = actor.Movies
                let age = []
                for (let i=0; i<movie.length; i++){
                    age.push(searchAge(actor.birth_year, movie[i].released_year))
                }
                res.render('seeMovie', {actor, movie, age})
             })
            .catch(e=>res.send(e))
    }


}

module.exports = CastControl

const { Movie } = require('../models/index')
const { Op } = require("sequelize")
const { ProductionHOuse } = require('../models/index')
const { Cast } = require('../models/index')
const { CastFilm } =require('../models/index')

class MovieControl{
    static show(req, res){
        Movie.findAll(
            { include : [{
                model: ProductionHOuse
            }]
            },
            { order : [['released_year','DESC']]}
            )
            .then(data =>res.render('movie', {data}))
            .catch(e=>res.send(e))
    }

    static addForm(req, res){
        ProductionHOuse.findAll()
            .then(data =>res.render('addMovie', {data}))
            .catch(e=>res.send(e))
    }

    static add(req, res){
        let phData = ''
        let phId = ''
        ProductionHOuse.findAll()
            .then (function(data) {
                phData = data
                for (let i=0; i<phData.length; i++){
                    if(phData[i].name_prodHouse===req.body.prodHouse){
                    phId = phData[i].id
                    break;
                    }
                }
                let newdata ={
                name: req.body.fname,
                released_year : Number(req.body.year),
                genre : req.body.genre,
                productionHouseId : Number(phId)
                }
                Movie.create(newdata)
                    .then(data=>res.redirect("/movies"))
                    .catch(e=>res.send(e))
                })
            .catch(e=> res.send(e))
    }

    static editForm(req, res){
        let searchId = Number(req.params.id)
        let prodHouse = ''
        ProductionHOuse.findAll()
            .then(data =>prodHouse = data)
            .catch(e=>res.send(e))
        Movie.findAll({
            include : [{
                model: ProductionHOuse
            }]
        })
            .then (data => res.render('editMovie',{data, searchId, prodHouse}))
            .catch(e => res.send(e) )
    }

    static edit(req,res){
        let searchId = Number(req.params.id)
        let phData = ''
        let phId = ''
        ProductionHOuse.findAll()
            .then (function(data) {
                phData = data
                for (let i=0; i<phData.length; i++){
                    if(phData[i].name_prodHouse===req.body.prodHouse){
                    phId = phData[i].id
                    break;
                    }
                }
                let newdata ={
                name: req.body.fname,
                released_year : Number(req.body.year),
                genre : req.body.genre,
                productionHouseId : Number(phId)
                }
                Movie.update(newdata, {
                    where: {
                        id: searchId
                        }
                    })
                    .then(data=> res.redirect("/movies"))
                    .catch(e => res.send(e))
            })       
    }

    static delete(req, res){
        let searchId = Number(req.params.id)
        Movie.destroy({
            where: {
                id: searchId
            }
        })
            .then (data => res.redirect("/movies"))
            .catch (e => res.send(e))
    }

    static addCastForm(req,res){
        let searchId = Number(req.params.id)
        Movie.findOne({
                    where: { id : searchId},
                    include : [{model: Cast}]
                })
                .then(function(movie){  // untuk ambil judul movie
                   // res.send (movie)
                   let aktor = movie.Casts
                    Cast.findAll()
                        .then(function(cast){    // untuk ambil list cast
                            res.render('addCastFilm', {cast, movie, aktor})    
                        })
                })     
        }  
                               

    static addCast(req,res){
        let searchId = Number(req.params.id)
        let nama = req.body.cast.split(" ")
        let fname = nama[0]
        let lname = nama[1]
        Cast.findOne({
            where : {
                [Op.and]: [
                    {first_name: fname},
                    {last_name: lname}]
            }
        })
            .then(function(data){
                let newData ={
                    castId : data.id,
                    movieId : searchId,
                    role : req.body.role
                }
                CastFilm.create(newData)
                    .then(data=>res.redirect('/movies/addCast/searchId'))
            })
            .catch(e => res.send(e))
        }

}

module.exports = MovieControl

const express = require('express')
const app = express()
const port = 3000
const prodHouseRouter = require('./routers/prodHouseRouter')
const movieRouter = require('./routers/movieRouter')
const castRouter = require('./routers/castRouter')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.get('/', function (req,res){
    res.send('Main Page')
})

app.use('/productionhouses', prodHouseRouter)
app.use('/movies', movieRouter)
app.use('/casts', castRouter)

app.listen(port, ()=>console.log(`Listening on port ${port}`))
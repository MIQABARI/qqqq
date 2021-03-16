const express = require('express')
const mongoose = require('mongoose')
const logger = require('./middleware/logger')
const chalk = require('chalk')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todoRoutes')
const path = require('path')

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'handlebars'
})
const application = express()


application.engine('handlebars',hbs.engine)
application.set('view engine','handlebars')
application.set('views','views')

application.use(express.urlencoded({extended:true}))

application.use(express.static(path.join(__dirname,'public')))

application.use(logger)

application.use(todoRoutes)

const PORT = process.env.PORT|| 3000

async function start() {
    try {

        await mongoose.connect('mongodb+srv://admin:miqabari@cluster0.fbmla.mongodb.net/mess',
        {
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology:true
        }
        )

        application.listen(PORT, () => console.log(
            chalk.cyan.bold(`Server started on port ${PORT}`)
        ))
    } catch (error) {
        console.error(error)
    }
}
 
start()
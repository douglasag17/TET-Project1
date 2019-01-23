const express = require('express')
const path = require('path')
const engine = require('ejs-mate')
const mongoose = require('mongoose')
const passport = require('passport')
const flash = require('connect-flash')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

const app = express()
const { url } = require('./config/database.js')

mongoose.connect(url, {
	useCreateIndex: true,
  	useNewUrlParser: true
})
	.then(db => console.log('DB is connected'))
	.catch(err => console.error(err))

require('./config/passport')(passport)

// settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine)
app.set('view engine', 'ejs')

// middlewares
app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))
// required for passport
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// routes
//require('./routes/routes.js') (app, passport)
require('./routes/index.js') (app, passport)
require('./routes/users.js') (app, passport)
require('./routes/maps') (app, passport)

// static files
app.use(express.static(path.join(__dirname, 'public')))

// start the server
app.listen(app.get('port'), () => {
	console.log('server on port ', app.get('port'))
})
module.exports = (app, passport) => {

	// index routes
	app.get('/', (req, res) => {
		res.render('index')
	})

	app.get('/about', (req, res) => {
		res.render('about')
	})

	//login view
	app.get('/login', (req, res) => {
		res.render('users/login.ejs', {
			message: req.flash('loginMessage')
		})
	})

	app.post('/login', passport.authenticate('local-login', {
		successRedirect: '/maps',
		failureRedirect: '/login',
		failureFlash: true
	}))

	// signup view
	app.get('/signup', (req, res) => {
		res.render('users/signup', {
			message: req.flash('signupMessage')
		})
	})

	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect: '/maps', //si es exitoso lo redirige a maps
		failureRedirect: '/signup', //si falla lo redirige a sign up
		failureFlash: true // allow flash messages
	}))

	// logout
	app.get('/logout', (req, res) => {
		req.logout()
		res.redirect('/')
	})
}
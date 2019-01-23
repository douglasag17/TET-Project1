module.exports = (app, passport) => {

	//maps view
	app.get('/maps', isLoggedIn, (req, res) => {
		res.render('maps/maps', {
			user: req.user
		})
	})
}

function isLoggedIn (req, res, next) {
	if (req.isAuthenticated()) {
		return next()
	}
    res.redirect('/')
}
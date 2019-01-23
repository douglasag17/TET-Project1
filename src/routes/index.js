module.exports = (app, passport) => {

	// index routes
	app.get('/', (req, res) => {
		res.render('index')
	})

	app.get('/about', (req, res) => {
		res.render('about')
	})
}

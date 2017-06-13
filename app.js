const express = require('express')
const app = express()
const nunjucks = require('nunjucks')
const port = process.env.PORT || 8080;
const router = express.Router();
app.set('view engine', 'html'); 
app.engine('html', nunjucks.render); 
nunjucks.configure('views', { noCache: true }); 
const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];


var locals = {
	title: 'An Example',
	people: [
	{ name: 'Gandalf'},
	{ name: 'Frodo' },
	{ name: 'Hermione'}
	]
}

// nunjucks.render('index', locals, function (err, output) {
// 	res.render('index', {title: 'Hall'})
// })



router.param ('name', function (req,res,next,name){
	console.log('you are ' + name)
	req.name = name;
	next();
})

router.get('/hello/:name', function (req, res) {
  res.send('hello ' + req.name + '!');
})

app.route('/login').get(function(req,res){
	res.send('this is a login form');
})
	.post(function(req, res){
		console.log('processing');
		res.send('processing the login form!')
	})


app.get ('/', function (req, res) {

	res.render ( 'index', {title: 'Hall of Fame', people: people })
})

app.listen(port)
  


app.use ('/', router);





let express = require('express');
let app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))

app.use( function (req, res, next) {
  console.log(req.method + " " + req.path + " - ::ffff:" + req.ip );
  
  next();
})

// // This functionality is using the middleware express.static(path), where the path parameter is the absolute path of the folder containing the assets.
// //public folder contains static assets
// //The /public/style.css file is referenced in the /views/index.html in the project boilerplate

app.use('/public', express.static(__dirname + '/public'))

app.get(
  '/',
  function (req, res) {
    res.sendFile(absolutePath = __dirname + '/views/index.html')
  }
)


app.get('/json', function (req, res) {
  
  const mySecret = process.env['MESSAGE_STYLE']
  
  if(mySecret === 'uppercase'){
    res.json({
    'message' : 'HELLO JSON'
    })
  }
  else {
    res.json({
      'message' : 'Hello json'
    })
  }
})

app.get('/now', function(req, res, next) {
  next();
}, function(req, res) {
  
  req.time = new Date().toString();
  res.json({
    'time': req.time
    });
});


app.get('/:word/echo', function(req, res, next) {
  next();
}, function(req, res) {
  let word = req.params.word;

  res.json({
    'echo': word
    });
});

app.route('/name')
  .get(function (req, res, next) {
    next();
  },function (req, res) {
    let name = req.query.first + ' ' + req.query.last;
    res.json({
        'name': name
    })
    // if( req.query.first !== undefined && 
    //   req.query.last !== undefined){
    //   res.json({
    //     'name': name
    //   })
    // }else{
    //   res.json({
    //     'name': 'John Doe'
    //   })
    // }
  })
  .post(function (req, res, next) {
    next();
  },function (req, res) {
    let name = req.body.first + ' ' + req.body.last;
    
    res.json({
        'name': name
    })
  })
























 module.exports = app;

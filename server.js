var express = require('express');
//var passport = require('passport');
//var Strategy = require('passport-facebook').Strategy;
const request = require('request-promise');  
//var bodyParser = require('body-parser');
var   port = process.env.PORT || 3000;
var axios = require('axios');
require('dotenv').config();



// Create a new Express application.
var app = express();
  const key = 'AIzaSyBspXmmxN0uaVfTHsoc8m4bSTvQ9nIcPFk';


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// Configure view engine to render EJS templates.
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');



// Define routes.
app.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });
  
  app.get('/new',
  function(req, res) {
    res.render('new', { user: req.user });
  });


// app.get('/axios', (req, res) => {
// var url = 'https://graph.facebook.com/v3.0/102051100136715?fields=about%2Clocation%2Ccheckins%2Cname%2Cparking%2Clink%2Crating_count%2Coverall_star_rating%2Cdescription%2Cwebsite%2Cphone%2Cphotos%7Balbum%7D%2Chours%2Cengagement%2Crestaurant_specialties%2Crestaurant_services%2Cprice_range%2Csingle_line_address%2Cis_verified%2Cpicture&access_token=2133299740261243%7CaxqRiyPS1AHTSXsP58rRHJCMelE';
// axios.get(url)
// .then(function(res){
//   const place = res.data;
//   console.log(place);
//     res.render('place', { place: place });
//   })
// .catch(function(err){
//         res.status(err).send("failed to return response - ");
// });
//   });
  //returns a page based on "mad hatters paisley" google search
 app.get('/test', (req, res) => {
  const options = {
    method: 'GET',
    uri: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Mad%20Matters%20Paisley&inputtype=textquery&fields=formatted_address,geometry,icon,id,name,permanently_closed,photos,place_id,types&key=AIzaSyBspXmmxN0uaVfTHsoc8m4bSTvQ9nIcPFk`,
    //uri: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=Museum%20of%20Contemporary%20Art%20Australia&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=AIzaSyBspXmmxN0uaVfTHsoc8m4bSTvQ9nIcPFk`,
  };
  request(options)
    .then(fbRes => {
      var place = JSON.parse(fbRes);
     //res.json(place);
     res.render('g-list', { place: place });
     //res.send(place);
     //console.log(place.hours);
    });
});


app.get('/g-place/:id', (req, res) => {
  // you need permission for most of these fields
  //const userFieldSet = 'name';
  const userFieldSet = 'address_component,adr_address,alt_id,formatted_address,geometry,icon,id,name,permanently_closed,photo,place_id,scope,type,url,utc_offset,vicinity';
  const options = {
    method: 'GET',
    //uri: `https://graph.facebook.com/v3.0/${req.params.id}?fields=about,location,checkins,name,parking,link,rating_count,overall_star_rating,description,website,phone,photos{album,images},hours,engagement,restaurant_specialties,restaurant_services,price_range,single_line_address,is_verified,picture{url},category_list,cover,is_permanently_closed&access_token=2133299740261243%7CaxqRiyPS1AHTSXsP58rRHJCMelE`,
    //uri: `https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJH474lTBJiEgRFm7n3kfUh6w&fields=name,rating,formatted_phone_number&key=AIzaSyBspXmmxN0uaVfTHsoc8m4bSTvQ9nIcPFk`,
    uri: `https://maps.googleapis.com/maps/api/place/details/json?placeid=${req.params.id}`,
    // e.g. 
    //uri: `https://maps.googleapis.com/maps/api/place/details/json?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4&fields=name,rating,formatted_phone_number&key=AIzaSyBspXmmxN0uaVfTHsoc8m4bSTvQ9nIcPFk`,

    qs: {
      
      fields: userFieldSet,
      key: key
    }
  };
  request(options)
    .then(fbRes => {
      var place = JSON.parse(fbRes);
      //if place.website does not contain http:// or https:// it simple adds to the end of current url
      //this code checks for http and adds if missing
    
      //console.log(options);
      //res.json(place);
      res.render('g-place', { place: place });
    });
});  

//--------------------------------------------------------------------------------------
app.get('/place/:id', (req, res) => {
  // you need permission for most of these fields
  const userFieldSet = 'id, about, name, location, checkins, link, rating_count, overall_star_rating, description, website, phone, photos{images}, hours, engagement, restaurant_specialties, restaurant_services, price_range, single_line_address, is_verified, picture{url}, category_list, cover, is_permanently_closed';
  const options = {
    method: 'GET',
    //uri: `https://graph.facebook.com/v3.0/${req.params.id}?fields=about,location,checkins,name,parking,link,rating_count,overall_star_rating,description,website,phone,photos{album,images},hours,engagement,restaurant_specialties,restaurant_services,price_range,single_line_address,is_verified,picture{url},category_list,cover,is_permanently_closed&access_token=2133299740261243%7CaxqRiyPS1AHTSXsP58rRHJCMelE`,
    uri: `https://graph.facebook.com/v3.0/${req.params.id}`,
    qs: {
      access_token: process.env.access_token,
      fields: userFieldSet
    }
  };
  request(options)
    .then(fbRes => {
      var place = JSON.parse(fbRes);
      //if place.website does not contain http:// or https:// it simple adds to the end of current url
      //this code checks for http and adds if missing
      if (place.website){
    var tarea = place.website;
    //console.log(tarea);
    if (tarea.indexOf("http://") == 0 || tarea.indexOf("https://") == 0) {
    } else {
      place.website = "http://"+place.website;
        //console.log(place.website);
    }
      }
      
//       function getImageDirectoryByFullURL(url){
//       return url.split('/').pop()
// }

//a step by step breakdown
// var fburl = place.link;
//     fburl = fburl.split('/'); //url = ["serverName","app",...,"bb65efd50ade4b3591dcf7f4c693042b"]
//     fburl = fburl.pop();      //url = "bb65efd50ade4b3591dcf7f4c693042b"
//   console.log("fburl " + fburl);           //return "bb65efd50ade4b3591dcf7f4c693042b"

      
//       var fbURL = place.link;
//       var lastURLSegment = fbURL.substr(fbURL.lastIndexOf('/') - 1);
//       console.log(place.link);
//       console.log(lastURLSegment);

var url = String(place.link);
// Get the last path:
url = url.split("/");
var page = url[url.length-2];
console.log(page);

      //console.log(place);
      //res.json(place);
      res.render('place', { place: place });
    });
});  

// app.get('/list', (req, res) => {
//   // you need permission for most of these fields
//   const userFieldSet = 'id, name, location, overall_star_rating, photos{images}, price_range, single_line_address, picture{url}, category_list, cover';
//   var coords = '55.8480, -4.4128';
//   var radiusKm = '1000';
//   var limit = 25;
//   const options = {
//     method: 'GET',
//   //uri: `https://graph.facebook.com/v3.0/search?type=place&fields=name,checkins,picture&categories=["FOOD_BEVERAGE"]&center=55.8480,-4.4128&distance=1000`,
//     uri: `https://graph.facebook.com/v3.0/search?type=place`,
//     //uri: `https://graph.facebook.com/v3.0/search?type=place`,
//     qs: {
//     access_token: process.env.access_token,
//       fields: userFieldSet,
//         categories: ["FOOD_BEVERAGE"],
//         center: coords,
//         distance: radiusKm,
//         limit: limit,
//     }
//   };
//   request(options)
//     .then(fbRes => {
//       var place = JSON.parse(fbRes);
//       //console.log(place);
//       //res.json(place);
//       res.render('list', { place: place });
//     });
//   //res.send(req.params.lat)
// });  
 //---------------------------------------------------------------------------------------------------------- 
   app.get('/g-result', (req, res) => {
    if(req.query.keyword){
            var keyword = req.query.keyword;
            // console.log(q);
    }
    if(req.query.longitude){
            var longitude = req.query.longitude;
            // console.log(longitude);
    }
    if(req.query.latitude){
            var latitude = req.query.latitude;
            // console.log(latitude);
    }
    if(req.query.radius){
            var radius = req.query.radius;
    } else {
            var radius = '1000';
    }
            // console.log(latitude);
  // you need permission for most of these fields
  const userFieldSet = 'address_component,adr_address,alt_id,formatted_address,geometry,icon,id,name,permanently_closed,photo,place_id,scope,type,url,utc_offset,vicinity';
  var coords = latitude + "," + longitude;
  //var coords = '55.8480, -4.4128';

  // var limit = 30;
   //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEY

  const options = {
    method: 'GET',
  //uri: `https://graph.facebook.com/v3.0/search?type=place&fields=name,checkins,picture&categories=["FOOD_BEVERAGE"]&center=55.8480,-4.4128&distance=1000`,
    uri: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`,
    qs: {
    access_token: process.env.access_token,
      fields: userFieldSet,
        location: coords,
        radius: radius,
        //distance: radiusKm,
        latitude: latitude,
        longitude: longitude,
        keyword: keyword,
        key: key,
        // limit: limit,
    }
  };
  request(options)
    .then(fbRes => {
      var place = JSON.parse(fbRes);
    //   console.log(options);
      //res.json(place);
      res.render('g-results', { place: place });
    })
    .catch(function (err) {
        // API call failed...
        res.status(err).send("failed to return response - ");
    });  
});  

//--------------------------------------------------------------------------

app.get('/g-map', (req, res) => {
    if(req.query.keyword){
            var keyword = req.query.keyword;
            // console.log(q);
    }
    if(req.query.longitude){
            var longitude = req.query.longitude;
            // console.log(longitude);
    }
    if(req.query.latitude){
            var latitude = req.query.latitude;
            // console.log(latitude);
    }
    if(req.query.radius){
            var radius = req.query.radius;
    } else {
            var radius = '1000';
    }
            // console.log(latitude);
  // you need permission for most of these fields
  //const userFieldSet = 'address_component,adr_address,alt_id,formatted_address,geometry,icon,id,name,permanently_closed,photo,place_id,scope,type,url,utc_offset,vicinity';
  var coords = latitude + "," + longitude;
  //var coords = '55.8480, -4.4128';

  // var limit = 30;
   //https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=1500&type=restaurant&keyword=cruise&key=YOUR_API_KEY

  const options = {
    //method: 'GET',
  //uri: `https://graph.facebook.com/v3.0/search?type=place&fields=name,checkins,picture&categories=["FOOD_BEVERAGE"]&center=55.8480,-4.4128&distance=1000`,
    //uri: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`,
   // qs: {
        location: coords,
        radius: radius,
        longitude: longitude,
        latitude: latitude,
        //distance: radiusKm,
        //latitude: latitude,
        //longitude: longitude,
        keyword: keyword,
        key: key,
        // limit: limit,
    //}
  };

      res.render('map-list', { options: options });
      //res.send(options);
    });

 

//-----------------------------------------------------------------------------------------------------  
  app.get('/fb-result', (req, res) => {
    if(req.query.q){
            var q = req.query.q;
            // console.log(q);
    }
    if(req.query.longitude){
            var longitude = req.query.longitude;
            // console.log(longitude);
    }
    if(req.query.latitude){
            var latitude = req.query.latitude;
            // console.log(latitude);
    }
  // you need permission for most of these fields
  const userFieldSet = 'id, name, location, checkins, link, rating_count, overall_star_rating, photos{images}, price_range, single_line_address, picture, category_list, cover, engagement, website';
  var coords = latitude + ", " + longitude;
  //var coords = '55.8480, -4.4128';
  var radiusKm = '1000';
  var limit = 30;
   
  const options = {
    method: 'GET',
  //uri: `https://graph.facebook.com/v3.0/search?type=place&fields=name,checkins,picture&categories=["FOOD_BEVERAGE"]&center=55.8480,-4.4128&distance=1000`,
    uri: `https://graph.facebook.com/v3.0/search?type=place`,
    qs: {
    access_token: process.env.access_token,
      fields: userFieldSet,
        center: coords,
        distance: radiusKm,
        q: q,
        limit: limit,
    }
  };
  request(options)
    .then(fbRes => {
      var place = JSON.parse(fbRes);
    //   console.log(options);
      //res.json(place);
      res.render('list', { place: place });
    })
    .catch(function (err) {
        // API call failed...
        res.status(err).send("failed to return response - ");
    });  
});  

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
  

app.listen(port, function(){
    console.log("APP IS RUNNING ON PORT " + process.env.PORT);
});

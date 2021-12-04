const express = require('express')
const route = express.Router();
const controller = require('../controller/controller')









route.get('/',controller.homeroute)

route.get('/a',controller.findall)

route.get('/c',controller.findcat)

route.get('/i',controller.finditem)

route.post('/search',controller.searchitem)


//post route

// Admin routes

route.post('/admin/s',controller.adminsearch)

route.get('/admin',controller.admincat)

route.get('/admin/i',controller.adminprod)

route.get('/new-data',controller.addform)

route.get('/deleteP',controller.deleteproduct)

route.get('/delete/i',controller.deleteitem)

//******************************* */
route.post('/additem',controller.postitem)


















// route.get('/b',controller.buyitem)
// route.post('/showitem',controller.showitem)


//for only development







module.exports= route
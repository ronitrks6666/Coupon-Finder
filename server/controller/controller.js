
const ItemDB = require('../model/itemdb')
const CategoryDB = require('../model/categorydb')
const ProductDB = require('../model/productdb')











exports.homeroute = (req, res) => {
    res.render('index')
}

exports.findall = async (req, res) => {
    const product = await ProductDB.find()
    const category = await CategoryDB.find()
    res.render('allitems', { product: product, category: category })
}

exports.findcat = async (req, res) => {
    const name = req.query.id
    const itemdata = await ItemDB.find({ category: name })
    res.render('product', { item: itemdata })
}


exports.finditem = async (req, res) => {
    const name = req.query.name
    const itemdata = await ItemDB.find({ name: name })
    res.render('item', { item: itemdata })
}



// FOR THE CLIENT SEARCH FEATURE
exports.searchitem= async (req,res)=>{
    const name = req.body.name
    const itemdata = await ItemDB.find({ name: name })
    res.render('item', { item: itemdata })
}













//**************************ADMIN*************** */


exports.addform = async (req, res) => {
    const id = req.query.id
    if (id) {
        const item = await ItemDB.find({ _id: id })
        res.render('updateitem', { item: item })
    }
    else {
        res.render('additem')
    }
   
}

//******************************************** */

//************************************************ */

exports.admincat = async (req, res) => {
    const product = await ProductDB.find()
    const category = await CategoryDB.find()
    res.render('admin-data', { product: product, category: category })

}




exports.adminprod = async (req, res) => {
    const name = req.query.name
    const itemdata = await ItemDB.find({ name: name })
    res.render('admin-item', { item: itemdata })
}

exports.adminsearch = async (req,res)=>{
    const name = req.body.name
    const itemdata = await ItemDB.find({ name: name })
    res.render('admin-item', { item: itemdata })
}



exports.postitem = async (req, res) => {
    const id = req.query.id
    if (id) {

        // here a if statement that if the name of "itemDB" matches the name in other DB then update that nested data
        // first get the object with that id the check the name after getting both updateit

        let item = await ItemDB.findOne({ _id: id })
        let name = item.name
        let prod = await ProductDB.findOneAndUpdate({ name: name }, {
            name: req.body.name,
            category: req.body.category,
            image: req.body.image
        })

        let doc = await ItemDB.findOneAndUpdate({ _id: id }, {
            name: req.body.name,
            category: req.body.category,
            image: req.body.image,
            price: req.body.price,
            description: req.body.description
        })
        console.log(doc.name)
        res.redirect('/admin')


    } else {
        const item = new ItemDB({
            name: req.body.name,
            category: req.body.category,
            image: req.body.image,
            price: req.body.price,
            description: req.body.description
        })
        item.save().then((item) => {
            console.log(item.name)
        }).catch(err => {
            console.log("error during posting item")
        })


        const product = await ProductDB.findOne({ name: req.body.name })
        if (!product) {
            const prod = new ProductDB({
                name: req.body.name,
                category: req.body.category,
                image: req.body.image
            })
            prod.save().then((prod) => {
                console.log("product uploaded")
            }).catch(err => {
                console.log(err)
            })
        }



        const category = await CategoryDB.findOne({ category: req.body.category })
        // here another if else statement to check if this catergory already exist then push another into 'detail'
        if (!category) {
            const categ = new CategoryDB({
                category: req.body.category,
            })
            categ.save().then((categ) => {
                res.redirect('/new-data')
                console.log("both item posted :D ")
            }).catch(err => {
                console.log("error during posting category")
            })
        } else {
            res.redirect('/new-data')
            console.log("this category is alredy existed")
        }
    }


}






exports.deleteproduct = async (req, res) => {
    const name = req.query.id
    ProductDB.deleteOne({ name: name }, function (err, obj) {
        if (err) { console.log(err) }
        else { console.log('product deleted') }
    })
    ItemDB.deleteMany({ name: name }, function (err, obj) {
        if (err) { console.log("error in items delete") }
        else (console.log("all item with this name deleted"))
    })


    res.redirect('/admin')
}


exports.deleteitem = async (req,res)=>{
    const id = req.query.id
    ItemDB.deleteOne({_id: id }, function (err, obj) {
        if (err) { console.log("error in items delete") }
        else (console.log("this item with this id deleted"))
    })

    res.redirect('/admin')
}
















// exports.homeroute =(req,res)=>{
//     UserDB.find()           // This is for homepage displaying all users data
//     .then(user=>{
//         res.render('home',{users:user})
//     }).catch(err=>{  
//         res.status(500).send({message:err.message || "Error occured in retriving data form database"})
//     })
// }

// exports.showitem =async (req,res)=>{
//     const id = req.body.id
//     console.log(`the id is ${id}`)
//     console.log(`http://${req.get('host')}${req.url}`)
//     let users = id
//     await UserDB.findById(id)
//         .then(data=>{

//                users=data
//                console.log(users.name)

//         }).catch(err=>{
//             console.log("There was an error in finding the user")
//         })
//     res.render('item',{users:users});
//     query = "Male"
//     await UserDB.find({gender : query}).then(data=>{

//         console.log(data)

//  }).catch(err=>{
//      console.log("There was an error in finding the user")
//  })

//     // res.redirect('/')
// }







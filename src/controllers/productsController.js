const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		return res.render('index')
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		res.render('detail',{
			product: products.find(product => product.id === +req.params.id),
			toThousand,
		})
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let product = {
			id:products[products.length-1].id+1,
			name: req.body.name,
			price: +req.body.price,
			discount: +req.body.discount,
			image: "default-image.png",
			category: req.body.category,
			description:req.body.description,
		};
		products.push(product)
		fs.writeFileSync(path.join(__dirname,'../data/productsDataBase.json'),JSON.stringify(products))
		res.redirect('/')
	},

	// Update - Form to edit
	edit: (req, res) => {
		res.render('product-edit-form', {
			product : products.find(product => product.id === +req.params.id)
		})
	},
	// Update - Method to update
	update: (req, res) => {
		products.forEach(product => {
			if (product.id === +req.params.id){
			product.name = req.body.name,
			product.price = +req.body.price,
			product.discount= +req.body.discount,
			product.category=req.body.category,
			product.description= req.body.description
			}
		});
		fs.writeFileSync(path.join(__dirname,'../data/productsDataBase.json'),JSON.stringify(products))
		res.redirect(`/products/detail/${req.params.id}`)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productos = products.filter(product => {
			return product.id !== +req.params.id});
	fs.writeFileSync(path.join(__dirname,'../data/productsDataBase.json'),JSON.stringify(productos));
	res.redirect('/')
}};

module.exports = controller;
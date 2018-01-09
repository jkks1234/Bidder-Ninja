var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
	name:String,
	description:String,
	price:Number,
	date:{
		type:Date,
		default:Date.now()
	},
	soldto:{
		type:String,
		default:'No Bidder'
	},
	available:{
		type:String,
		default:true
	},
	currentprice:Number

});

var userSchema = new mongoose.Schema({

	name:String,
	email:String,
	phoneno:Number,
	password:String,
	items:[itemSchema],
});

module.exports = mongoose.model('user',userSchema);
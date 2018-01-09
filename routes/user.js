var express = require('express');
var user = require('../models/user');
var router = express.Router();
var config = require('../config/database');
var passport = require('passport');
var fs = require('fs');
var jwt = require('jsonwebtoken');

router.post('/login',(req,res)=>{
	var email = req.body.email;
	var	password = req.body.password;
	
	user
		.findOne({
			email : req.body.email,
			password : req.body.password
		},function(err,users)
		{
			if(err)
			{
				res
				   .json({success : false,msg :'ERROR OCCURED'});
			}
			else if(!users)
			{
				res
				   .json({success : false,msg :'invalid credentials'});
			}
			else
			{
				
				var token = jwt.sign({data:users},config.secret, {
          			expiresIn: 604800 	
       				 });
				res.json({
					success:true,
					token:'JWT '+token,
					user:{
						id:users._id,
						name:users.name,
						email:users.email
					}
				});
			}
		});
});

router.post('/signup',(req,res)=>{
	console.log(req.body);
	if(req.body.name!=null && req.body.phoneno!=null && req.body.email!=null && req.body.password!=null){
	console.log('here');
	user.findOne({email:req.body.email },function(err,user1)
	{
		if(user1)
		{
				console.log('here1');

			res.status(200)
			   .json({succes : false,msg :'email already exists'});

		}
	

else{
	

	user.create({

		name :req.body.name,
		phoneno : req.body.phoneno,
		email : req.body.email,
		password : req.body.password,
		
	},function(err,users)
	{
		if(err)
		{
			res
			   .json({success : false,msg :'failed to Register'});

		}
		else
		{
			console.log(users);
			
			res.json({success : true,msg :'User registered'});
		}

	});
}
});
}
});


router.get('/showall',(req,res)=>{
	var item1=[];
	var item2=[];
	user.find().exec(function(err,product){
		
		for (var i = 0; i < product.length; i++){
			if(product[i].items!=undefined)
			{
				for(var j=0;j<product[i].items.length;j++)
				{
					console.log(product[i].items[j]);
					if( product[i].items[j].available=='true')
					{
						
							item2.push(product[i].items[j]);
						
					}

				}
			}
		}
			console.log(item2);
			res.json(item2);


	});
});

router.get('/who',passport.authenticate('jwt',{session:false}),(req,res)=>{
	user.findById(req.user._id).exec(function(err,user2)
	{	
		
		name=user2.email;
		console.log(name);
		res.json(name);
	});

});

router.get('/mypurchased',passport.authenticate('jwt',{session:false}),(req,res)=>{
	var item1=[];
	var item2=[];
	user.findById(req.user._id).exec(function(err,user2)
	{	
		name=user2.email;
		console.log(user2,name);
	user.find().exec(function(err,product){
		
		for (var i = 0; i < product.length; i++){
			if(product[i].items!=undefined)
			{
				for(var j=0;j<product[i].items.length;j++)
				{
					if( product[i].items[j].available=='false' && product[i].items[j].soldto==name)
					{
						
							item2.push(product[i].items[j]);
						
					}

				}
			}
		}
			console.log(item2);
			res.json(item2);


	});
});
});
router.post('/up',passport.authenticate('jwt',{session:false}),(req,res)=>{
	console.log('it worked '+req.user._id);
	var id1 = req.body.id1;
	var price = req.body.price3;
	var name;
	user.findById(req.user._id).exec(function(err,user2)
	{	
		name=user2.email;
		console.log(user2,name);
	user.find({"items._id":id1},(err,user1)=>
	{
		if(user1[0]!=undefined){

			var p1={};

			pro = user1[0].items.id(id1);
			if(pro.available=='true')
			{
				console.log("hello="+price);
				pro.currentprice = parseInt(price);
				pro.soldto=name;
				user1[0].save(function(err,p)
				{
					p1.price=pro.currentprice;
					p1.soldto=pro.soldto;
					console.log(p1);
					res.json(p1);
				});
			}
			else{
				res.json({success:false,available:true,msg:'item bid over'});
			}
		}
		else{
			res.json({success:false,available:false,msg:'item no longer available'});
		}

	});
	});

});
router.get('/listone/:id',(req,res)=>{
	var obj={};

	var id1 = req.params.id;
	console.log(id1);
	var id2;
	user.find({"items._id":id1},(err,user1)=>
	{
		if(user1[0]!=undefined)
		{
			obj.ownername=user1[0].name;
			obj.ownerphoneno=user1[0].phoneno;
			obj.owneremail=user1[0].email;
			id2=user1[0].items.id(id1);
			obj.name=id2.name;
			obj.id=id2._id;
			obj.description=id2.description;
			obj.price=id2.price;
			obj.date=id2.date;
			obj.currentprice=id2.currentprice;
			obj.soldto=id2.soldto;
			obj.available=id2.available;
			console.log(obj);
			res.json(obj);
		}
		else{
			res.json({success:false,available:false,msg:'item no longer available'});
		}
	});
});
router.post('/additem',passport.authenticate('jwt',{session:false}),(req,res)=>{
	console.log('it worked '+req.user._id);
	var newitem ={
		name:req.body.name,
		description:req.body.description,
		price:req.body.price,
		currentprice:req.body.price
	}
	var olditems=[];
	user.findById(req.user._id,function(err,user){olditems=user.items})
	.exec(function(err,user){
			if(user.items==undefined)
			{
				user.items=[];
				user.items.push(newitem);
			}
			else
			{
                user.items.push(newitem);
			}
			user.save(function(err,ur){
				console.log(ur);
				res.json(user.items[user.items.length-1]);
				}
			);

	});
});

router.get('/myproducts',passport.authenticate('jwt',{session:false}),(req,res)=>{

		var item1=[];
	var item2=[];
	console.log(req.user._id);
	user.findById(req.user._id).exec(function(err,product){
		
			if(err)
			{
				res.json({success:false,msg:err});
			}
			else if(product.items){
				console.log(product);
				var m=[];
				for(var i=0;i<product.items.length;i++)
				{
					if(product.items[i].available=='true')
					{
						m.push(product.items[i]);
					}
				}
				res.json(m);
			}

	});

});
router.get('/soldproducts',passport.authenticate('jwt',{session:false}),(req,res)=>{

	var item1=[];
	var item2=[];
	console.log(req.user._id);
	user.findById(req.user._id).exec(function(err,product){
		
			if(err)
			{
				res.json({success:false,msg:err});
			}
			else if(product.items){
				console.log(product);
				var m=[];
				for(var i=0;i<product.items.length;i++)
				{
					if(product.items[i].available=='false')
					{
						m.push(product.items[i]);
					}
				}
				res.json(m);
			}

	});
});
router.get('/delete/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{

		var id=req.params.id;
		console.log(id);
		var p1;
		user.findById(req.user._id).exec((err,pro)=>
		{
			console.log(pro);
			p1=pro.items.id(id);
			console.log(p1);
			for(var i=0;i<pro.items.length;i++)
			{
				console.log(pro.items[i]._id);
				if(pro.items[i]._id==id)
				{
					console.log('here');
					pro.items.splice(i,1);
				}
			}
			pro.save();
			res.json({success:true,msg :'successfully deleted'});
			
		});
});
router.get('/change/:id',passport.authenticate('jwt',{session:false}),(req,res)=>{

		var id=req.params.id;
		console.log(id);
		var p1;
		user.findById(req.user._id).exec((err,pro)=>
		{
			console.log(pro);
			p1=pro.items.id(id);
			console.log(p1);
			p1.available=false;
			pro.save();
			console.log(pro);
			res.json({success:true,msg :'successfully changed'});
			
		});
});
module.exports=router;
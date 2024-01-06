import {db} from '../db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

// jwt jsonwebtoken
//cookie-parser bax kandwzo session li dar jwt


// 5as t installer bcryptjs
export const register=(req,res)=>{
    //check existing user
    const q="select * from users where email=? or username=?"
    db.query(q,[req.body.email,req.body.username],(err,data)=>{
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("user already exist");

        //hash the password and create a user

        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);


    const q="insert into users(`username`,`email`,`password`) values(?)";
    const values=[
        req.body.username,
        req.body.email,
        hash
    ]

    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.status(200).json("user has been created")
    })

    })
}

export const login=(req,res)=>{
    //check if user existe
    const q='select * from users where username=?'
    db.query(q,[req.body.username],(err,data)=>{
       if(err) return res.json(err)
       if(data.length===0) return res.status(404).json("user not found!")
 
       //check password
       const isCorrect=bcrypt.compareSync(req.body.password, data[0].password);
       if(!isCorrect) return res.status(400).json(" wrong username or password !!!")
 
 
       // hadi drnaha mnin kolxi mzn 4adi ya5d l id f session w ay87to fl cookie li lt7t
       const token=jwt.sign({id:data[0].id},"hhhhabdo");
       //hadi bax na5do le info w nsftohom m3a l cookie mn 4ir password li mkripti
 
       const {password,...other}=data[0]
 
       res.cookie("access_token",token,{
        // domaine:'.blog-client-cn05.onrender.com',
        secure:true,
        sameSite:'none',
         httpOnly:true
         //hadi kandiroha l securiter makay5dm had l cookie 4ir f http
       }).status(200).json(other)
    })
 }
export const logout=(req,res)=>{

    res.clearCookie("access_token",{
        sameSite:'none',secure:true
    }).status(200).json("user has been logged out")
}

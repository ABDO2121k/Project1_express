import {db} from '../db.js'
import jwt from 'jsonwebtoken'
export const getPosts=(req,res)=>{
    // query hia dakxi li kaykon f lien mire ?
    const q= req.query.cat? "select * from posts where category=?":"select * from posts "
    db.query(q,[req.query.cat],(err,data)=>{
        if(err) return res.status(500).send(err)


        return res.status(200).json(data)
    })
}
export const getPost=(req,res)=>{
    const q="select p.id, `username`,`title`,`description`,p.img,u.img as userImg,`category`,`date` from users u inner join posts p on u.id = p.uId where p.id=?";
    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.status(500).json(err)

        return res.status(200).json(data[0])
    })
}
export const addPost=(req,res)=>{
     const token=req.cookies.access_token // access_token hia smiya li 3tinaha l cookie
     if(!token) return res.status(401).json(" Not authenticated !")
     jwt.verify(token,"hhhhabdo",(err,userInfo)=>{ // had userInfo hia dak l object li 3tinah l jwt f sign
         if(err) return res.status(403).json("Token is not valid")
        const q ="insert into posts values(null,?,?,?,?,?,?)"

        const values=[
            req.body.title,
            req.body.description,
            req.body.img,
            userInfo.id,
            req.body.date,
            req.body.category
        ]

        db.query(q,[...values],(err,data)=>{
            if(err) return res.status(500).json(err)
        console.log(values)
            return res.json(values)
        })
     })
}




export const deletePost=(req,res)=>{
    // 4adi na4do jwt bax nxofo wax kayn f cookie ila kan donc rah logged in
    const token=req.cookies.access_token // access_token hia smiya li 3tinaha l cookie
    if(!token) return res.status(401).json(" Not authenticated !")
    // db more ma xfna wax lcookie kayn w user rah logged in ana5do jwt w nxofo wax valid :
    // had hhhhabdo howa lcode li drna f jwt f sign
    jwt.verify(token,"hhhhabdo",(err,userInfo)=>{ // had userInfo hia dak l object li 3tinah l jwt f sign
        if(err) return res.status(403).json("Token is not valid")

        const postId=req.params.id;
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ?";
        db.query(q,[postId,userInfo.id],(err,data)=>{
            if (err) return res.status(403).json("you can delete only your posts")
            return res.status(200).json('post has been deleted!')
        })
    })
    // w moraha anxofo wax f session dak l post dyalna wla la
}





// export const deletePost = (req, res) => {
    
  
  
//       const postId = req.params.id;
//       const q = "DELETE FROM posts WHERE id=?";
  
//       db.query(q, [postId], (err, data) => {
//         if (err) return res.status(403).json("You can delete only your post!");
  
//         return res.json("Post has been deleted!");
//       });
//   };









export const updatePosts=(req,res)=>{
    const token=req.cookies.access_token // access_token hia smiya li 3tinaha l cookie
    if(!token) return res.status(401).json(" Not authenticated !")
    jwt.verify(token,"hhhhabdo",(err,userInfo)=>{ // had userInfo hia dak l object li 3tinah l jwt f sign
        if(err) return res.status(403).json("Token is not valid")
       const q=req.body.img?"update posts set title=?, description=?,img=?,category=? where id=? and uId=?":"update posts set title=?, description=?,category=? where id=? and uId=?";
        const postId=req.params.id

       const values=req.body.img?[
           req.body.title,
           req.body.description,
           req.body.img,
           req.body.category
       ]:[
        req.body.title,
        req.body.description,
        req.body.category
    ];

       db.query(q,[...values,postId,userInfo.id],(err,data)=>{
           if(err) return res.status(500).json(values)
        console.log(values)
           return res.json({"post hax been Updated":values})
       })
    })
}


import delet from '../img/delete.png'
import edit from '../img/edit.png'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Menu from '../components/Menu';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { authContext } from '../components/context/authContext';
import HtmlRenderer from '../components/html_To_text/F';


const Single = () => {
  const {currentUser}=useContext(authContext)
  const {id}=useParams()
  const [post,setPost]=useState([])
  const navigator=useNavigate()
  useEffect(()=>{
    const fetchData= async()=>{
      try{
         const res=await axios.get(`/posts/${id}`)
         setPost(res.data)
      }catch(err){
        console.log(err)
      }
    }
    fetchData()
  },[id])


const handleDelete=async ()=>{
  try{
    await axios.delete(`/posts/${id}`)
    navigator('/home')

 }catch(err){
   console.log(err)
 }
}

  return (
    <div className='single'>
      <div className='content'>
        <img src={post?.img} alt=''/>
        <div className='user'>
        {post?.userImg&&
          <img src={post?.userImg} alt=''/>
        }
          <div className='info'>
             <span>{post.username} </span>
             <p> Posted {moment(post.date).fromNow()}</p>
          </div>
          {currentUser?.username==post.username&&
            <div className='edit'>
             <Link to={`/write?edit=${post.id}`} state={post}><img src={edit} alt=''/></Link>
             <img src={delet} alt='' onClick={handleDelete}/>
          </div>
          }
          
        </div>
        <h1>{post.title}</h1>
        <HtmlRenderer htmlContent={post.description}/>
    </div>
      <Menu cat={post.category}/>
    </div>
  )
}

export default Single
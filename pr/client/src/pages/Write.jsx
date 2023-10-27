import { ref, uploadBytes,getDownloadURL} from 'firebase/storage';
import React, { useContext, useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { storage } from '../components/fire/fire';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { authContext } from '../components/context/authContext.js'


const Write = () => {
  const {currentUser}=useContext(authContext)
  const [obj,setObj]=useState(null)
  //anjibo state li kayna f url w an testiw 3liha
  const state=useLocation().state
  const [value, setValue] = useState(state?.description||'');
  const [title, setTitle] = useState(state?.title||'');
  const [img, setImg] = useState(null);
  const [cat, setCat] = useState(state?.category||'');



  const handleSunmit= async (e)=>{
    e.preventDefault();
    
    // upload image :
  
    const imgRef=ref(storage,`images/${currentUser.id}${Math.random()}`)
    await uploadBytes(imgRef,img)

    // njibo lient :

    const url=await getDownloadURL(imgRef)
  
    setObj({
      title,
      description:value,
      category:cat,
      img:url
    })

 // nbdaw

 try{
     
  // ila knt state andiro ubdate ila makntx andiro ajouter

if(state){
  await axios.put(`/posts/${state.id}`,{
    title:title,
    description:value,
    category:cat,
    img:url
  })

}else{

  await axios.post(`/posts/`,{
    title:title,
     description:value,
     category:cat,
     img:url,
   date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
 })
}
}catch(err){
  console.log(err)
 }
  

}



  return (
    <div className="add">
      <div className="content">
        <input type="text" placeholder='Title' onChange={e=>setTitle(e.target.value)} value={title}/>
        <div className="editorContainer">
        <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <input type="file" name="" id="file" style={{display:'none'}} onChange={e=>setImg(e.target.files[0])}/>
          <label htmlFor="file" className='label'>Upload image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleSunmit}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category: </h1>
          <div className="cat">
          <input type="radio" name='cat' value='art' id='art'/>
           <label htmlFor="art">Art</label>
          </div>
          <div className="cat">
          <input type="radio" name='cat' value='science' id='science' onChange={e=>setCat(e.target.value)}/>
           <label htmlFor="science">Science</label>
           </div>
           <div className="cat">
          <input type="radio" name='cat' value='technology' id='technology' onChange={e=>setCat(e.target.value)}/>
           <label htmlFor="technology">Technology</label>
           </div>
           <div className="cat">
          <input type="radio" name='cat' value='cinema' id='cinema' onChange={e=>setCat(e.target.value)}/>
           <label htmlFor="cinema">Cinema</label>
           </div>
           <div className="cat">
          <input type="radio" name='cat' value='design' id='design' onChange={e=>setCat(e.target.value)}/>
           <label htmlFor="design">Design</label>
           </div>
           <div className="cat">
          <input type="radio" name='cat' value='food' id='food' onChange={e=>setCat(e.target.value)}/>
           <label htmlFor="food">Food</label>
           </div>
        </div>
      </div>
    </div>
  )
}

export default Write
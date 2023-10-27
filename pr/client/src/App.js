import React from 'react';
import{Routes,Route,BrowserRouter} from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Single from './pages/Single';
import Write from './pages/Write';
import Layout from './components/Layout';
import Undifined from './pages/Undifined';
import './style.scss'
function App() {
  return (
    <div className='app'>
    <BrowserRouter>
       <Routes>
         <Route path='/' element={<Layout/>}>
           <Route index element={<Home/>}/>
           <Route path='/home' element={<Home/>}/>
           <Route path='single/:id' element={<Single/>}/>
           <Route path='write' element={<Write/>}/>
         </Route>
         <Route path='/register' element={<Register/>}/>
         <Route path='/login' element={<Login/>}/>
         <Route path='*' element={<Undifined/>}/>
       </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

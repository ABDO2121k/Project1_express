import { createContext, useEffect, useState } from "react";

import axios from 'axios';

export const authContext = createContext()

//had l provider 4adi y3tina lm3lomat dial l user li lpded in f ga3 l app



// had l fonction hia li katjiblna le valeur mn l user w kat7tha f currenUser w kadirha f proider
export const AuthProvider=({children})=>{
    const [currentUser,setCurrentUser]=useState(JSON.parse(localStorage.getItem("user"))||null)
    const login= async(inputs)=>{
        const res= await axios.post("auth/login",inputs)
        setCurrentUser(res.data)
    }
    const logout= async()=>{
        await axios.post("auth/logout")
        setCurrentUser(null)
    }

    useEffect(()=>{
         localStorage.setItem("user",JSON.stringify(currentUser))
    },[currentUser])

return(
    <authContext.Provider value={{currentUser,login,logout}}>
        {children}
    </authContext.Provider>
)
}
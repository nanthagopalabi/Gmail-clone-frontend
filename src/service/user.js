import axios from "axios"
const url=`https://gmail-clone-backend-z2zd.onrender.com`

export const login=async(user)=>{
try {
    const response= await axios.post(url,user);
    console.log(response)
        
 } catch (error) {
    console.log(error);
 }
}
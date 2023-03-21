import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { getUsernameExists } from '../services/firebase'
import * as ROUTES from '../constants/routes';
import Header from '../components/header'
import UserProfile from '../components/profile';

export default function Profile(){
 const{ username} = useParams()
 const [ user,setUser] = useState()
 const [userExists, setUserExists] = useState(false)
 const history = useNavigate()

useEffect(()=>{
 if(username){
    console.log(username)
  checkUserExists()
 }
     async function checkUserExists(){
      const doesUserExists = await getUsernameExists(username)
      if(doesUserExists.length>0){
       setUser(doesUserExists[0])
       setUserExists(true)
      }else{
       setUserExists(false)
       history(ROUTES.NOT_FOUND)
      }
     }
},[username, history])


 return (
  userExists? (
   <div className='bg-gray-background'>
    <Header/>
    <UserProfile username={username}/>
    <div className='mx-auto max-w-screen-lg'>
    {user.fullName}
    </div>
   </div>

  ):(
  console.log('null')
  )

 )

}
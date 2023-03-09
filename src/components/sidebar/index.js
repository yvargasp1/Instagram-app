import useUser from '../../hooks/use-user'
import User from './user'
import Suggestions from './suggestions'
import { useState } from 'react'

export default function Sidebar() {
  const user2 = useUser()
  let name = ''
  let username = ''
  let userId = ''
  let following 
  let docId

  getDataUser(user2)
  function getDataUser(user2) {
    if (user2.user[0]) {
      name = user2.user[0].fullName
      username = user2.user[0].username
      userId = user2.user[0].userId
      following = user2.user[0].following
      docId =  user2.user[0].docId
    }
  }

  console.log(following)

  return (
    <div className='p-4'>
      <User username={username} fullName={name} />
      <Suggestions userId={userId} following={following}  docId={docId}/>
    </div>
  )
}

Sidebar.whyDidYouRender = true

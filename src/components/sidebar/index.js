import useUser from '../../hooks/use-user'
import User from './user'
import Suggestions from './suggestions'

export default function Sidebar() {
  const user2 = useUser()

  console.log('user', user2.user[0].fullName)
  return (
    <div className='p-4'>
      <User />
      <Suggestions />
    </div>
  )
}

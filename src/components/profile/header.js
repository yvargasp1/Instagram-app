import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import useUser from '../../hooks/use-user'
import { isUserFollowingProfile } from '../../services/firebase'

export default function Header({
  photosCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullname,
    following = [],
  },
  followerCount,
  setFollowerCount,
}) {

  
  const { user } = useUser()
  const [isFollowing, setFollow] = useState(false)

  useEffect(() => {
    if (user) {
      isLoggedInUserFollowingProfile()
    }

    async function isLoggedInUserFollowingProfile() {
      if (profileUserId) {
        const isFollowing = await isUserFollowingProfile(
          user[0].username,
          profileUserId
        )

        if (isFollowing) {
          setFollow(true)
        }
      }
    }
  }, [profileUserId])

  console.log(isFollowing)

  return (
    <div className='grid grid-cols-3 gap-4 justify-between max-w-screen-lg'>
      <div className='container flex justify-center '>
        {isFollowing ? (
          <img
            src={`/images/avatars/${user[0].username}.jpg`}
            alt=''
            className='rounded-full h-40 w-40  flex'
          />
        ) : (
          console.log(null)
        )}
      </div>
    </div>
  )
}

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

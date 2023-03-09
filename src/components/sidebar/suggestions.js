import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import SuggestedProfile from '../sidebar/suggested-profile'
import { getsuggestedProfiles } from '../../services/firebase'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
export default function Suggestions({ userId, following, docId }) {
  const [profiles, setProfile] = useState(null)

  useEffect(() => {
    if (userId) {
      suggestedProfiles()
    }
    async function suggestedProfiles() {
      const response = await getsuggestedProfiles(userId, following)
      setProfile(response)
    }
  }, [userId])

  console.log('profiles', profiles)
  return !profiles ? (
    <Skeleton count={1} height={150} className='mt-5'></Skeleton>
  ) : profiles.length > 0 ? (
    <div className='rounded flex flex-col'>
      <div className='text-sm flex item-center align-middle justify-between mb-2'>
        <p className='font-semibold text-gray-base'>Sugeridos</p>
      </div>
      <div className='mt-5 grid gap-5'>
        {profiles.map((profile, index) => (
          <SuggestedProfile
            key={index}
            docId={profile.docId}
            username={profile.username}
            profileId={profile.userId}
            userId={userId}
            userdocId={docId}
          ></SuggestedProfile>
        ))}
      </div>
    </div>
  ) : null
}

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  docId: PropTypes.string
}

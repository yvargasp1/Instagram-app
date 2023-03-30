import usePhotos from '../../hooks/user-photos-history'
import useUser from '../../hooks/use-user'
import { getFollowingProfiles } from '../../services/firebase'
import Skeleton from 'react-loading-skeleton'
import { useEffect, useState } from 'react'
export default function PhotosHistory() {
  const { photos } = usePhotos()
  const [profiles, setProfile] = useState(null)

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
      docId = user2.user[0].docId
    }
  }

  console.log('siguiendo', following, userId, profiles)

  useEffect(() => {
    if (user2.user[0]) {
      getFollowerPhoto()
    }

    async function getFollowerPhoto() {
      const result = await getFollowingProfiles(userId, following)
      setProfile(result)
    }
  }, [userId, following])

  return (
    <>
      {!profiles
        ? Array(8)
            .fill()
            .map((item, index) => (
              <div className='px-3'>
                <Skeleton
                  key={index}
                  count={1}
                  width={60}
                  height={60}
                  borderRadius='160px'
                ></Skeleton>
                <span className='text-sm px-4'>
                  {' '}
                  <Skeleton
                    key={index}
                    count={1}
                    width={50}
                    height={4}
                  ></Skeleton>
                </span>
              </div>
            ))
        : profiles.map((item, index) => (
            <div key={index} className='px-3'>
              <span class='relative flex h-3 w-3'>
                <span class='animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75'>
                  <svg
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    viewBox='0 0 24 24'
                    height='1em'
                    width='1em'
                  >
                    <path d='M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0' />
                  </svg>
                </span>
                <span class='relative inline-flex rounded-full h-3 w-3 bg-sky-500'></span>
              </span>
              <img
                src={`/images/avatars/${item.username}.jpg`}
                alt=''
                className='rounded-full'
                width={60}
                height={60}
              />
              <span className='text-sm px-4'>{item.username}</span>
            </div>
          ))}
    </>
  )
}

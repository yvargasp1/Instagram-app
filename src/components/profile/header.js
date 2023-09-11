import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Skeleton from 'react-loading-skeleton'
import useUser from '../../hooks/use-user'
import {
  isUserFollowingProfile,
  toggleFollow,
  uploadImage,
} from '../../services/firebase'
import { func } from 'prop-types'

export default function Header({
  photosCount,
  profile: {
    docId: profileDocId,
    userId: profileUserId,
    fullName,
    following = [],
    followers = [],
  },
  followerCount,
  setFollowerCount,
  username,
}) {
  const { user } = useUser()
  const [isFollowing, setFollow] = useState(false)
  const [myProfile, setProfile] = useState(true)
  //const myButton = user[0].name && user[0].name != username}
  const [imageUpload, setImage] = useState(null)

  async function handleToggleButton() {
    setFollow((isFollowing) => !isFollowing)
    setFollowerCount({
      followerCount: isFollowing ? followerCount - 1 : followerCount + 1,
    })

    await toggleFollow(
      isFollowing,
      user[0].docId,
      profileDocId,
      profileUserId,
      user[0].userId
    )
      .then((e) => {
        console.log(e)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  const  uploadImageLocal = ( event)=> {
  
       setImage(null)
       uploadImage(imageUpload)
       event.preventDefault()
    
  }

  useEffect(() => {
    if (user.length) {
      isLoggedInUserFollowingProfile()
    }

    async function isLoggedInUserFollowingProfile() {
      if (profileUserId) {
        const isFollowing = await isUserFollowingProfile(
          user[0].username,
          profileUserId
        )

        if (user[0].username == username) {
          setProfile(false)
        }
        if (isFollowing) {
          setFollow(true)
        }
      }
    }
  }, [user, profileUserId])

  console.log(isFollowing, user, 'Myprofile', myProfile, 'myButton:')

  return (
    <div className='grid grid-cols-3 gap-4 justify-between max-w-screen-xl'>
      <div className='container flex justify-center '>
        {!user[0] ? (
          <>
            <Skeleton
              shape='circle'
              width={160}
              height={160}
              borderRadius='160px'
            ></Skeleton>
          </>
        ) : user?.length > 0 ? (
          <img
            src={`/images/avatars/${username}.jpg`}
            alt=''
            className='rounded-full h-40 w-40  flex'
          />
        ) : (
          console.log('null')
        )}
      </div>
      <div className='flex items-center justify-center flex-col col-span-1'>
        <div className='container flex items-center'>
          <p className='text-2xl mr-4'>{username}</p>
          {myProfile &&
            (!user[0] ? (
              <Skeleton count={1} width={50} height={24}></Skeleton>
            ) : isFollowing ? (
              <svg
                viewBox='0 0 1024 1024'
                fill='currentColor'
                height='2em'
                width='2rem'
                onClick={handleToggleButton}
                className='cursor-pointer border  rounded-sm text-green-primary  p-2'
              >
                <path d='M678.3 642.4c24.2-13 51.9-20.4 81.4-20.4h.1c3 0 4.4-3.6 2.2-5.6a371.67 371.67 0 00-103.7-65.8c-.4-.2-.8-.3-1.2-.5C719.2 505 759.6 431.7 759.6 349c0-137-110.8-248-247.5-248S264.7 212 264.7 349c0 82.7 40.4 156 102.6 201.1-.4.2-.8.3-1.2.5-44.7 18.9-84.8 46-119.3 80.6a373.42 373.42 0 00-80.4 119.5A373.6 373.6 0 00137 888.8a8 8 0 008 8.2h59.9c4.3 0 7.9-3.5 8-7.8 2-77.2 32.9-149.5 87.6-204.3C357 628.2 432.2 597 512.2 597c56.7 0 111.1 15.7 158 45.1a8.1 8.1 0 008.1.3zM512.2 521c-45.8 0-88.9-17.9-121.4-50.4A171.2 171.2 0 01340.5 349c0-45.9 17.9-89.1 50.3-121.6S466.3 177 512.2 177s88.9 17.9 121.4 50.4A171.2 171.2 0 01683.9 349c0 45.9-17.9 89.1-50.3 121.6C601.1 503.1 558 521 512.2 521zM880 759h-84v-84c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v84h-84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h84v84c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-84h84c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z' />
              </svg>
            ) : !isFollowing ? (
              <svg
                viewBox='0 0 1024 1024'
                fill='currentColor'
                height='2em'
                width='2rem'
                onClick={handleToggleButton}
                className='cursor-pointer border  rounded-sm text-red-primary  p-2'
              >
                <path d='M678.3 642.4c24.2-13 51.9-20.4 81.4-20.4h.1c3 0 4.4-3.6 2.2-5.6a371.67 371.67 0 00-103.7-65.8c-.4-.2-.8-.3-1.2-.5C719.2 505 759.6 431.7 759.6 349c0-137-110.8-248-247.5-248S264.7 212 264.7 349c0 82.7 40.4 156 102.6 201.1-.4.2-.8.3-1.2.5-44.7 18.9-84.8 46-119.3 80.6a373.42 373.42 0 00-80.4 119.5A373.6 373.6 0 00137 888.8a8 8 0 008 8.2h59.9c4.3 0 7.9-3.5 8-7.8 2-77.2 32.9-149.5 87.6-204.3C357 628.2 432.2 597 512.2 597c56.7 0 111.1 15.7 158 45.1a8.1 8.1 0 008.1.3zM512.2 521c-45.8 0-88.9-17.9-121.4-50.4A171.2 171.2 0 01340.5 349c0-45.9 17.9-89.1 50.3-121.6S466.3 177 512.2 177s88.9 17.9 121.4 50.4A171.2 171.2 0 01683.9 349c0 45.9-17.9 89.1-50.3 121.6C601.1 503.1 558 521 512.2 521zM880 759h-84v-84c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v84h-84c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h84v84c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-84h84c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z' />
              </svg>
            ) : (
              <Skeleton count={1} width={50} height={24}></Skeleton>
            ))}
        </div>
        <div className='container flex mt-4'>
          {followers == undefined || following == undefined ? (
            <Skeleton count={1} width={677} height={24}></Skeleton>
          ) : !photosCount ? (
            <Skeleton count={1} width={300} height={24}></Skeleton>
          ) : (
            <>
              <p className='mr-10'>
                <span className='font-bold'>{photosCount}</span>
                {` Fotos`}
              </p>
              <p className='mr-10'>
                <span className='font-bold'>{followerCount}</span>
                {followerCount == 1 ? ` Seguidor` : ` Seguidores`}
              </p>
              <p className='mr-10'>
                <span className='font-bold'>{following.length}</span>
                {` Siguiendo`}
              </p>
            </>
          )}
        </div>
        <div className='container mt-4'>
          <p className='font-medium'>
            {!fullName ? (
              <Skeleton count={1} width={300} height={24}></Skeleton>
            ) : (
              fullName
            )}
          </p>
        </div>
      </div>
      <div className='flex items-center justify-center flex-col col-span-1'>
        <div className='container  w-8 h-8'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            stroke-width='1.5'
            stroke='currentColor'
            height='2em'
            width='2rem'
            onClick={uploadImageLocal}
            className='cursor-pointer align-middle rounded-sm text-green-primary'
          >
            <path
              stroke-linecap='round'
              stroke-linejoin='round'
              d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5'
            />
          </svg>
          <input
            type='file'
            onChange={(event) => {
              setImage(event.target.files[0])
            }}
            
          />
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
  photosCount: PropTypes.number.isRequired,
  followerCount: PropTypes.number.isRequired,
  setFollowerCount: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  user: PropTypes.array,
}

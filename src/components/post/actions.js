import { useState, useContext } from 'react'
import PropTypes from 'prop-types'
import UserContext from '../../context/user'
import { updateLikes, getUsersId } from '../../services/firebase'
import { useEffect } from 'react'
export default function Actions({
  docId,
  totalLikes,
  like,
  LikedPhoto,
  handleFocus,
}) {
  const {
    user: { uid: userId = '' },
  } = useContext(UserContext)

  const [toggleLiked, setToggleLiked] = useState(LikedPhoto)
  const [likes, setlikes] = useState(totalLikes)
  const [likeUser, setUserLike] = useState(null)

  useEffect(() => {
    if (like) {
      getUserLikes(like)
    }
    async function getUserLikes(like) {
      if (like.length) {
        const users = await getUsersId(like)
        setUserLike(users)
      }
    }
  }, [like])

  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked)

    updateLikes(docId, userId, toggleLiked)

    setlikes((likes) => (toggleLiked ? likes - 1 : likes + 1))
  }

  if (likeUser) {
    console.log(likeUser)
  }

  return (
    <>
      <div className='flex justify-between p-5'>
        <div className='flex'>
          <svg
            onClick={handleToggleLiked}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleToggleLiked()
              }
            }}
            viewBox='0 0 1024 1024'
            fill='black'
            stroke='currentColor'
            height='1em'
            width='1em'
            className={`select-none cursor-pointer mr-2 ${
              toggleLiked ? 'fill-red text-red-primary' : 'text-black-light'
            }`}
          >
            <path d='M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z' />
          </svg>
          <svg
            viewBox='0 0 512 512'
            fill='currentColor'
            height='1em'
            width='1em'
          >
            <path d='M144 208c-17.7 0-32 14.2-32 31.1 0 18.6 14.3 32.9 32 32.9s31.1-14.25 31.1-32-13.3-32-31.1-32zm112-.9c-17.75 0-31.1 14.25-31.1 32s14.25 31.1 31.1 31.1 31.1-14.25 31.1-31.1-13.3-32-31.1-32zm112 .9c-17.75 0-31.1 14.25-31.1 32s14.25 32 31.1 32c17.75 0 31.99-14.25 31.99-32 .01-17.8-14.19-32-31.99-32zM256 31.1C114.6 31.1.9 124.22.9 239.1c0 47.62 19.91 91.25 52.91 126.3-14.87 39.5-45.87 72.88-46.37 73.25-6.624 7-8.373 17.25-4.624 26C5.818 474.2 14.38 480 24 480c61.49 0 109.1-25.75 139.1-46.25 28.87 9 60.16 14.25 92.9 14.25 141.4 0 255.1-93.13 255.1-207.1S397.4 31.1 256 31.1zm0 368.9c-26.75 0-53.12-4.125-78.36-12.12l-22.75-7.125L135.4 394.5c-14.25 10.12-33.87 21.38-57.49 29 7.374-12.12 14.37-25.75 19.87-40.25l10.62-28-20.62-21.87C69.81 314.1 48.06 282.2 48.06 240c0-88.25 93.24-160 207.1-160s207.1 71.75 207.1 160S370.8 400 256 400z' />
          </svg>
        </div>
      </div>
      <div className='p-4 py-0'>
        <p className='font-bold text-sm'>
          {likes ? (
            <div>
              {likeUser ? (
                likeUser.length > 1 ? (
                  <div className='flex items-center'>
                    <p className='font-light mr-1'>Le gusta a</p>
                    {likeUser[0].fullName}
                    <img
                      className='rounded-full w-8 flex mx-2 my-2'
                      src={`/images/avatars/${likeUser[0].username}.jpg`}
                    ></img>
                    y {likes - 1} usuarios más
                  </div>
                ) : (
                  <div className='flex items-center'>
                    <p className='font-light mr-1'>Le gusta a</p>
                    {likeUser[0].fullName}
                    <img
                      className='rounded-full w-8 flex mx-2 my-2'
                      src={`/images/avatars/${likeUser[0].username}.jpg`}
                    ></img>
                  </div>
                )
              ) : (
                console.log('null')
              )}
            </div>
          ) : (
            <></>
          )}
        </p>
      </div>
    </>
  )
}

Actions.propTypes = {
  docId: PropTypes.string.isRequired,
  totalLikes: PropTypes.number.isRequired,
  LikedPhoto: PropTypes.bool.isRequired,
  handleFocus: PropTypes.func.isRequired,
}

import { useRef } from 'react'
import PropTypes from 'prop-types'
import Header from './header'
import Image from './image'
import Actions from './actions';
import Comments from './comment'

export default function Post({ content }) {
  const commentInput =  useRef (null)

  const handleFocus = () => commentInput.current.focus()
  return (
    <div className='rounded col-span-4 border bg-white border-gray-primary ml-20 mb-16  max-w-[440px] '>
      <Header username={content.username}/>
      <Image src={content.imageSrc} caption={content.caption} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        like={content.likes}
        LikedPhoto={content.userLikePhoto}
        handleFocus={handleFocus}

      ></Actions>
      <Comments docId={content.docId}  comments={content.comments} posted={content.dateCreated} commentInput={commentInput}></Comments>
    </div>
  )
}

Post.protTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    userLikePhoto: PropTypes.bool.isRequired,
    likes: PropTypes.string.isRequired,
    comments: PropTypes.string.isRequired,
    dateCreated: PropTypes.number.isRequired,
  }),
}

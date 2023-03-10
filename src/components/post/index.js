import { useRef } from 'react'
import PropTypes from 'prop-types'
import Header from './header'
import Image from './image'

export default function Post({ content }) {
  return (
    <div className='rounded col-span-4 border bg-white border-gray-primary mb-16  max-w-[480px] '>
      <Header username={content.username} />
      <Image src={content.imageSrc} caption={content.caption} />
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

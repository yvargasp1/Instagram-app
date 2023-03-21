import { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import UserContext from '../../context/user'
import { updateComments } from '../../services/firebase'

export default function AddComment({
  docId,
  comments,
  setComments,
  commentInput,
}) {
  const [comment, setComment] = useState('')

  const {
    user: { displayName },
  } = useContext(UserContext)

  const handleSubmitComment = (event) => {


   setComments([{displayName,comment},...comments])
   setComment('')
   updateComments(docId, displayName, comment )
    event.preventDefault()
    return null
  }

  return (
    <div className='border-t border-gray-primary'>
      <form
        className='flex justify-between pl-0 pr-5'
        method='POST'
        onSubmit={(e) =>
          comment.length >= 1 ? handleSubmitComment(e) : e.preventDefault()
        }
      >
        <input
          aria-label='Add comment'
          autoComplete='off'
          className='text-sm text-gray-base w-full mr-3 py-5 px-4'
          type='text'
          name='add-comment'
          placeholder='Comentar...'
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />
        <button
          className={`text-sm font-bold text-blue-medium ${
            !comment && 'opacity-25'
          }`}
          type='button'
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          <svg
            fill='currentColor'
            viewBox='0 0 16 16'
            height='1em'
            width='1em'
          >
            <path d='M15.854.146a.5.5 0 01.11.54l-5.819 14.547a.75.75 0 01-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 01.124-1.33L15.314.037a.5.5 0 01.54.11zM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493z' />
          </svg>
        </button>
      </form>
    </div>
  )
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  commentInput: PropTypes.object,
}

import { useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistance } from 'date-fns'
import { Link } from 'react-router-dom'
import AddComment from './add-comment'

 
export default function Comments({
  docId,
  comments: allComments,
  posted,
  commentInput,
}) {
  const [comments, setComments] = useState(allComments)
  const [ showModal,setShowModal] =  useState(false)
  return (
    <>
      <div className='p-4 pt-1 pb-4'>
        {comments.length >= 3 && (
          <p
            onClick={() => setShowModal(true)}
            className='text-sm text-gray-base mb-1 cursor-pointer'
          >
            Ver los {comments.length} comentarios
          </p>
        )}
        {comments.slice(0, 2).map((item) => (
          <p
            key={`${item.comment}-${item.displayName}`}
            className='mb-1 font-light'
          >
            <Link to={`/p/${item.displayName}`}>
              <span className='mr-1 font-bold'>{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        <p className='text-gray-base uppercase text-xs py-2'>
          {formatDistance(posted, new Date())}
        </p>
      </div>

      {showModal ? (
        <>
          <div className='fixed inset-0 z-5 overflow-y-auto'>
            <div
              className='fixed inset-0 w-full h-full bg-black opacity-40'
              onClick={() => setShowModal(false)}
            ></div>
            <div className='flex items-center min-h-screen px-4 py-2'>
              <div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg'>
                <div className=''>
                  <div className='float-right'>
                    <svg
                    onClick={()=>setShowModal(false)}
                      fill='none'
                      viewBox='0 0 24 24'
                      height='1em'
                      width='1em'
                      className='select-none cursor-pointer'
                      
                    >
                      <path
                        fill='currentColor'
                        d='M16.396 7.757a1 1 0 010 1.415l-2.982 2.981 2.676 2.675a1 1 0 11-1.415 1.415L12 13.567l-2.675 2.676a1 1 0 01-1.415-1.415l2.676-2.675-2.982-2.981A1 1 0 119.02 7.757L12 10.74l2.981-2.982a1 1 0 011.415 0z'
                      />
                      <path
                        fill='currentColor'
                        fillRule='evenodd'
                        d='M4 1a3 3 0 00-3 3v16a3 3 0 003 3h16a3 3 0 003-3V4a3 3 0 00-3-3H4zm16 2H4a1 1 0 00-1 1v16a1 1 0 001 1h16a1 1 0 001-1V4a1 1 0 00-1-1z'
                        clipRule='evenodd'
                      />
                    </svg>
                  </div>
                  <div className='mt-2 text-left  sm:text-left'>
                    <h4 className='text-lg font-medium text-gray-800 pb-2'>
                      Comentarios
                    </h4>
                    {comments.map((item) => (
                      <p
                        key={`${item.comment}-${item.displayName}`}
                        className='mb-1 font-light'
                      >
                        <Link to={`/p/${item.displayName}`}>
                          <span className='mr-1 font-bold'>
                            {item.displayName}
                          </span>
                        </Link>
                        <span>{item.comment}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
      <AddComment
        docId={docId}
        comments={comments}
        setComments={setComments}
        commentInput={commentInput}
      ></AddComment>
    </>
  )
}

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired,
}

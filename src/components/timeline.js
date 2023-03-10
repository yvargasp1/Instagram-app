import Skeleton from 'react-loading-skeleton'
import usePhotos from '../hooks/use-photos'
import Post from '../components/post/index'
export default function Timeline() {
  const { photos } = usePhotos()

  console.log('photos', photos)
  return (
    <div className='container col-span-2'>
      {!photos ? (
        <>
          {[...new Array(4)].map((_, index) => (
            <Skeleton
              key={index}
              count={4}
              width={520}
              height={620}
              className='mb-5'
            ></Skeleton>
          ))}
        </>
      ) : photos?.length > 0 ? (
        photos.map((content) => (
          <Post key={content.docId} content={content}></Post>
        ))
      ) : (
        <p className='text-center text-2xl'>Sigue gente para ver fotos.</p>
      )}
    </div>
  )
}

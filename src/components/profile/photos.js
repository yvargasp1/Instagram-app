import Skeleton from 'react-loading-skeleton'
export default function Photos({ photos }) {

  return (
    <div className='h-16 border-t border-gray-primary mt-12 pt-4'>
      <div className='grid grid-cols-3 gap-4 mx-10 mt-4 mb-12'>
        {!photos.length ? (
          <>
            {Array(9)
              .fill()
              .map((item, index) => (
                <Skeleton
                  key={index}
                  count={1}
                  width={400}
                  height={450}
                ></Skeleton>
              ))}
          </>
        ) : photos.length > 0 ? (
          photos.map((photo, index) => (
            <div key={index} className='relative group'>
              <img
                className='col-span-4 border bg-white border-gray-primary'
                src={photo}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover', // Esto mantendrá la relación de aspecto y ajustará la imagen para que encaje completamente.
                }}
              />
            </div>
          ))
        ) : (
          console.log('null')
        )}
      </div>
    </div>
  )
}

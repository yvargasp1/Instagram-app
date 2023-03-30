import PhotosHistory from './photos'

export default function BarHistory() {
  return (
    <div className='grid grid-cols-1  mx-auto max-w-screen-md'>
      <div className='container col-span-1 bg-white rounded h-30 my-4 py-2 px-2 grid grid-cols-8 gap-2'>
        <PhotosHistory></PhotosHistory>
      </div>
    </div>
  )
}

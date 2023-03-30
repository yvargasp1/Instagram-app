import { useEffect } from 'react'
import Header from '../components/header'
import BarHistory from '../components/history'
import Sidebar from '../components/sidebar-suggested/index'
import Timeline from '../components/timeline'

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Instagram'
  }, [])

  return (
    <div className='bg-gray-background'>
      <Header />
      <BarHistory></BarHistory>

      <div
        className='grid grid-cols-3 gap-2 justify-between
      mx-auto max-w-screen-xl
      '
      >
        <Timeline></Timeline>
        <Sidebar></Sidebar>
      </div>
    </div>
  )
}

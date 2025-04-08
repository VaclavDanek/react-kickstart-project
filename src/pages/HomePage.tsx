import { FC } from 'react'
import { observer } from 'mobx-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'

// types
import type { JSX } from 'react'

interface HomePageProps {}

const HomePage: FC<HomePageProps> = observer((props: Readonly<HomePageProps>): JSX.Element => {
  return (
    <div className='mt-10'>
      <h1 className='text-center text-2xl'>
        <FontAwesomeIcon icon={faDoorOpen} /> Hello World!
      </h1>
    </div>
  )
})

export default HomePage
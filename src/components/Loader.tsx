import { default as Loader } from 'react-loaders'
import { observer } from 'mobx-react'

// stores
import GeneralStore from '../stores/GeneralStore'

// types
import type { JSX } from 'react'
import type { LoaderType } from 'react-loaders'

// styles
import 'loaders.css/src/animations/ball-pulse-sync.scss'
// import 'loaders.css/src/animations/ball-pulse.scss'
// import 'loaders.css/src/animations/ball-clip-rotate.scss'
// import 'loaders.css/src/animations/ball-scale-multiple.scss'
// import 'loaders.css/src/animations/line-scale.scss'

interface LoaderProps {
  className?: string;
  innerClassName?: string;
  active?: boolean;
  type?: LoaderType;
  color?: string;
}

export default observer((props: Readonly<LoaderProps>): JSX.Element | null => {
  const { 
    className = 'vh-center', 
    type = 'ball-pulse-sync', 
    color = '#0d6efd', 
    active = GeneralStore.fetching > 0, 
    innerClassName, 
  } = props

  return !active ? null : (
    <div className='bg-white bg-opacity-80 w-full h-full top-0 absolute'>
      <Loader
        {...{
          className,
          innerClassName,
          active,
          type,
          color,
        }}
      />
    </div>
  )
})

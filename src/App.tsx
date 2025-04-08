import { Component } from 'react'
import { observer } from 'mobx-react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { withTranslation } from 'react-i18next'

// stores
import GeneralStore from './stores/GeneralStore'

// pages
import { HomePage } from './pages'

// components
import { Loader } from './components'

// config
import { basename } from './config'

// types
import type { CustomErrorEvent } from './types/errorTypes'
import type { WithTranslation } from 'react-i18next'
import type { JSX } from 'react'

// styles
import './styles/tailwind.css'
import './styles/main.scss'

interface AppContainerProps extends Readonly<WithTranslation> {}

interface AppContainerState {
  hasError?: boolean;
}

const App = observer(
  class extends Component<Readonly<AppContainerProps>, AppContainerState> {
    state: AppContainerState = {};

    constructor(props: AppContainerProps) {
      super(props);
      window.addEventListener('error', this.handleOnError);
    }

    static getDerivedStateFromProps(nextProps: AppContainerProps, prevState: AppContainerState): Partial<AppContainerState> | null {
      return null;
    }

    static getDerivedStateFromError(error: Error): Partial<AppContainerState> {
      return { hasError: true };
    }

    componentDidMount(): void {}

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
      const errorEvent: CustomErrorEvent = {
        message: error.message,
        stack: errorInfo.componentStack,
      };
      this.handleOnError(errorEvent);
    }

    componentWillUnmount(): void {
      window.removeEventListener('error', this.handleOnError)
    }

    handleOnError = (errorEvent?: ErrorEvent | CustomErrorEvent): void => {
      if (errorEvent) {
        GeneralStore.onActionFailure(errorEvent);
        console.error(errorEvent);
      }
    }

    render(): JSX.Element {
      const router = createBrowserRouter([
        { path: '/', element: <HomePage /> },
      ], { basename: process.env.NODE_ENV === 'production' ? basename : undefined });

      return <>
        <RouterProvider router={router} />
        <Loader />
      </>
    }
})

export default withTranslation()(App)

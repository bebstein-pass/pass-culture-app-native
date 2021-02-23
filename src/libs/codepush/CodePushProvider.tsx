import React, { createContext, useContext } from 'react'
import CodePush from 'react-native-code-push' // @codepush

import { env } from 'libs/environment'

interface CodePushContext {
  status: null | CodePush.SyncStatus
}

const codePushOptionsAuto = {
  installMode: CodePush.InstallMode.IMMEDIATE,
  checkFrequency: CodePush.CheckFrequency.ON_APP_RESUME,
}

// @codepush
const shouldWrapWithCodePush = env.FEATURE_FLAG_CODE_PUSH

const CodePushWrapper = (AppComponent: React.Component) =>
  shouldWrapWithCodePush ? CodePush(codePushOptionsAuto)(AppComponent) : AppComponent

// @ts-ignore no-param
const CodePushContext = createContext<CodePushContext>({})

export const useCodePush = () => useContext<CodePushContext>(CodePushContext)

export const CodePushProvider = CodePushWrapper(
  // @ts-ignore no-param
  class App extends React.Component<Record<string, unknown>, CodePushContext> {
    state = {
      status: null,
    }

    codePushStatusDidChange(nextStatus: CodePush.SyncStatus) {
      /* The other parts of our code rely on the fact that the code push sync status does not change once it is up-to-date */
      if (isUpToDate(nextStatus) && !isUpToDate(this.state.status)) {
        this.setState({
          status: nextStatus,
        })
      }
    }

    render() {
      return (
        <CodePushContext.Provider value={this.state}>
          {isUpToDate(this.state.status) && this.props.children}
        </CodePushContext.Provider>
      )
    }
  }
)

function isUpToDate(status: null | CodePush.SyncStatus) {
  return status === CodePush.SyncStatus.UP_TO_DATE
}

export default CodePushProvider

import { deleteTabStorage, updateTabStorage } from '../../Routes/CrmLayout/redux/navigationSlice'
import { replaceState } from './actions'
import { globalInitialStates, store } from './store'

export const subscribeForTabs = () => {
    let prevState = store.getState()
    let isUpdatingFromSubscriber = false

    store.subscribe(() => {
        const currentState = store.getState()
        const currentActiveTab = currentState.navigation.activeTab
        const prevActiveTab = prevState.navigation.activeTab
        const currentTabs = currentState.navigation.userTabs
        if (isUpdatingFromSubscriber) {
            isUpdatingFromSubscriber = false
            prevState = currentState
            return
        }

        if (prevActiveTab !== currentActiveTab) {
            const prevTabInfo = prevState.navigation.userTabs.find(tab => tab?.uuid === prevActiveTab?.uuid)
            if (!currentTabs.find(item => item.uuid === prevActiveTab?.uuid)) {
                isUpdatingFromSubscriber = true
                if (prevActiveTab) {
                    store.dispatch(deleteTabStorage({ uuid: prevActiveTab?.uuid }))
                    store.dispatch(
                        replaceState({
                            ...store.getState(),
                            [prevActiveTab.type]: globalInitialStates[prevActiveTab.type],
                        })
                    )
                }
            } else if (prevTabInfo) {
                const prevTabStorage = prevState[prevTabInfo.type]
                isUpdatingFromSubscriber = true
                if (prevActiveTab) {
                    store.dispatch(updateTabStorage({ uuid: prevActiveTab.uuid, storage: prevTabStorage || {} }))
                }
            }
        }

        prevState = currentState
    })
}

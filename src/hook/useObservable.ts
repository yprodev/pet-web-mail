import { useState, useLayoutEffect } from 'react'
import { BehaviorSubject } from 'rxjs'

export const useObservable = <TState>(stateSubject: BehaviorSubject<TState>) => {
  const [state, setState] = useState<TState>(stateSubject.getValue())

  useLayoutEffect(() => {
    const subsription = stateSubject.subscribe((currState: TState): void => {
      setState(currState)
    })
    return () => {
      subsription.unsubscribe()
    }
  }, [])

  return state
}

import { useEffect, useState, useCallback } from 'react'
import { Subject, takeUntil } from 'rxjs'

import { ViewAreaHook, EmailComplete } from '../../interfaces'
import { setReadStateNew, selectedEmailId$, fetchEmail$, findCachedEmail$ } from '../../service'

export const isEmail = (email: unknown): email is EmailComplete => email !== undefined
export const isEmailId = (id: unknown): id is string => id !== undefined

const useViewArea = (): ViewAreaHook => {
  const componentDestroyed$ = new Subject<void>()
  const [email, setEmail] = useState<EmailComplete>()
  const [emailId, setEmailId] = useState<string>()

  const toggleEmailReadState = useCallback(() => {
    if (emailId) {
      console.log('toolbar set read', emailId)
      setReadStateNew(emailId)
    }
  }, [emailId])

  useEffect(() => {
    selectedEmailId$.pipe(takeUntil(componentDestroyed$)).subscribe((emailId) => {
      setEmailId(emailId)
    })

    //TODO: Uncomment after testing
    // fetchEmail$.pipe(takeUntil(componentDestroyed$)).subscribe((email) => setEmail(email))

    findCachedEmail$.pipe(takeUntil(componentDestroyed$)).subscribe((email) => setEmail(email))

    return () => {
      componentDestroyed$.next()
      componentDestroyed$.complete()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    email,
    emailId,
    toggleEmailReadState,
  }
}

export default useViewArea

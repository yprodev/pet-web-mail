import { useEffect, useState, useCallback } from 'react'
import { Subject, takeUntil } from 'rxjs'

import { ViewAreaHook, EmailComplete } from '../../interfaces'
import {
  toggleReadState,
  selectedEmailId$,
  getFullEmail$,
  putIntoTrash,
  resetSelectedEmailId,
} from '../../service'

//FIXME: use lodash
export const isEmail = (email: unknown): email is EmailComplete =>
  email !== undefined && email !== null
export const isEmailId = (id: unknown): id is string => id !== undefined && id !== null

const useViewArea = (): ViewAreaHook => {
  const componentDestroyed$ = new Subject<void>()
  const [email, setEmail] = useState<EmailComplete | unknown>(null)
  const [emailId, setEmailId] = useState<string | unknown>(null)

  const removeEmail = useCallback((): void => {
    isEmailId(emailId) && putIntoTrash(emailId)
    resetSelectedEmailId()
    setEmail(null)
    setEmailId(null)
  }, [emailId])

  const toggleEmailReadState = useCallback((): void => {
    if (isEmailId(emailId)) {
      toggleReadState(emailId)
    }
  }, [emailId])

  useEffect(() => {
    selectedEmailId$.pipe(takeUntil(componentDestroyed$)).subscribe((emailId) => {
      console.log('new email id', emailId)
      setEmailId(emailId)
    })

    getFullEmail$.pipe(takeUntil(componentDestroyed$)).subscribe((email) => setEmail(email))

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
    removeEmail,
  }
}

export default useViewArea

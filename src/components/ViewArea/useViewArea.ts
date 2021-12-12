import { useEffect, useState, useCallback } from 'react'
import { Subject, takeUntil } from 'rxjs'

import { ViewAreaHook, EmailComplete } from '../../interfaces'
import { selectedEmail$, setReadState } from '../../service'

export const isFullEmail = (email: unknown): email is EmailComplete => email !== undefined

const useViewArea = (): ViewAreaHook => {
  const componentDestroyed$ = new Subject<void>()
  const [fullEmail, setFullEmail] = useState<EmailComplete>()

  const toggleEmailReadState = useCallback(() => {
    if (fullEmail) {
      setReadState(fullEmail.id, !fullEmail.meta.isRead)
    }
  }, [fullEmail])

  useEffect(() => {
    selectedEmail$
      .pipe(takeUntil(componentDestroyed$))
      .subscribe((emailFull: EmailComplete) => setFullEmail(emailFull))

    return () => {
      componentDestroyed$.next()
      componentDestroyed$.complete()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    fullEmail,
    toggleEmailReadState,
  }
}

export default useViewArea

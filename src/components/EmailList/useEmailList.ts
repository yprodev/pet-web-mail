import { useEffect, useState, useCallback } from 'react'
import { Subject } from 'rxjs'

import { EmailListHook, Email } from '../../interfaces'
import { selectedFolder$ } from '../../observables'
import { displayFullEmail, listSelectedEmails } from '../../selectors'

const useEmailList = (): EmailListHook => {
  const [emails, setEmails] = useState<Email[]>([])

  const handleEmailDisplay = useCallback((emailId: string) => {
    displayFullEmail(emailId)
  }, [])

  useEffect(() => {
    const componentDestroyed$ = new Subject<void>()

    listSelectedEmails(selectedFolder$, componentDestroyed$, setEmails)

    return () => {
      componentDestroyed$.next()
      componentDestroyed$.complete()
    }
  }, [])

  return {
    emails,
    handleEmailDisplay,
  }
}

export default useEmailList

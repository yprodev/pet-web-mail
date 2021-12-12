import { useEffect, useState, useCallback } from 'react'
import { Subject, takeUntil } from 'rxjs'

import { EmailListHook, EmailShort } from '../../interfaces'
import { displayFullEmail, selectedEmails$ } from '../../service'

const useEmailList = (): EmailListHook => {
  const [emails, setEmails] = useState<EmailShort[]>([])

  const handleEmailDisplay = useCallback((emailId: string) => {
    displayFullEmail(emailId)
  }, [])

  useEffect(() => {
    const componentDestroyed$ = new Subject<void>()

    selectedEmails$()
      .pipe(takeUntil(componentDestroyed$))
      .subscribe((emails) => setEmails(emails))

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

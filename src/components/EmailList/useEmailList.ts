import { useEffect, useState, useCallback } from 'react'
import { Subject, takeUntil } from 'rxjs'

import { EmailListHook, EmailShort } from '../../interfaces'
import { setEmailId, selectedEmails$ } from '../../service'

const useEmailList = (): EmailListHook => {
  const componentDestroyed$ = new Subject<void>()
  const [emails, setEmails] = useState<EmailShort[]>([])

  const handleEmailDisplay = useCallback((emailId: string) => {
    setEmailId(emailId)
  }, [])

  useEffect(() => {
    selectedEmails$()
      .pipe(takeUntil(componentDestroyed$))
      .subscribe((emails) => setEmails(emails))

    return () => {
      componentDestroyed$.next()
      componentDestroyed$.complete()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    emails,
    handleEmailDisplay,
  }
}

export default useEmailList

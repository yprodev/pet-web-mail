import { takeUntil } from 'rxjs/operators'

import { SetReadState, ListEmails, ListSelectedEmailsSubscription } from '../types'
import { Email, EmailFull } from '../interfaces'
import {
  emailsRequest$,
  emailFullRequest$,
  _emails$,
  _selectedEmail$,
  selectedEmails$,
} from '../observables'

export const setReadState: SetReadState = (emailId, status) => {
  const emails = _emails$.getValue()

  const updateEmails = emails.map<Email>((email) => {
    if (email.id === emailId) {
      return {
        ...email,
        meta: {
          ...email.meta,
          isRead: status,
        },
      }
    }

    return email
  })

  _emails$.next(updateEmails)
}

export const listEmails: ListEmails = (componentDestroyed) => {
  emailsRequest$()
    .pipe(takeUntil(componentDestroyed))
    .subscribe((emails: Email[]) => _emails$.next(emails))
}

export const listSelectedEmails: ListSelectedEmailsSubscription = (
  selectedFolders$,
  componentDestroyed,
  stateSetter
): void => {
  selectedEmails$(selectedFolders$)
    .pipe(takeUntil(componentDestroyed))
    .subscribe((emails) => stateSetter(emails))
}

export const displayFullEmail = (emailId: string): void => {
  emailFullRequest$(emailId).subscribe((fullEmail: EmailFull) => {
    setReadState(emailId, true)
    _selectedEmail$.next(fullEmail)
  })
}

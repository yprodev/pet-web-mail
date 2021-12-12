import { combineLatest, Subject, BehaviorSubject, Observable, takeUntil } from 'rxjs'
import { take, map, distinctUntilChanged } from 'rxjs/operators'

import {
  EmailsRequest,
  GetFullEmail,
  SetReadState,
  ListEmails,
  ListSelectedEmailsSubscription,
} from '../types'
import { EmailComplete, EmailShort } from '../interfaces'
import observableHttpClient from '../service/httpClient'

// TODO: Have questions???
import { selectedFolder$ } from './folder.service'

export const _emails$ = new BehaviorSubject<EmailShort[]>([])
export const _selectedEmail$ = new Subject<EmailComplete>()

export const emails$ = _emails$.asObservable().pipe(
  distinctUntilChanged((prev, curr) => {
    return JSON.stringify(prev) === JSON.stringify(curr)
  })
)
export const selectedEmail$ = _selectedEmail$.asObservable().pipe(
  distinctUntilChanged((prev, curr) => {
    return JSON.stringify(prev) === JSON.stringify(curr)
  })
)

export const selectedEmails$ = (): Observable<EmailShort[]> =>
  combineLatest([emails$, selectedFolder$]).pipe(
    map(([emails, selectedFolder]) =>
      emails.filter((email) => email.meta.folder === selectedFolder)
    )
  )

export const emailsRequest$: EmailsRequest = () =>
  observableHttpClient.get<EmailShort[]>('emails').pipe(
    take(1),
    map<EmailShort[], EmailShort[]>((emails) =>
      emails.sort((firstDate, secondElement) => secondElement.header.date - firstDate.header.date)
    )
  )

export const emailFullRequest$: GetFullEmail = (emailId) =>
  observableHttpClient.get<EmailComplete>(`emailsFull/${emailId}`).pipe(take(1))

export const setReadState: SetReadState = (emailId, status) => {
  const emails = _emails$.getValue()

  const updateEmails = emails.map<EmailShort>((email) => {
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
    .subscribe((emails: EmailShort[]) => _emails$.next(emails))
}

export const listSelectedEmails: ListSelectedEmailsSubscription = (
  componentDestroyed,
  stateSetter
): void => {
  selectedEmails$()
    .pipe(takeUntil(componentDestroyed))
    .subscribe((emails) => stateSetter(emails))
}

export const displayFullEmail = (emailId: string): void => {
  //FIXME: Something is wrong with the type
  combineLatest([emailFullRequest$(emailId) as Observable<EmailComplete>, emails$])
    .pipe(
      distinctUntilChanged((prev, curr) => {
        return JSON.stringify(prev) === JSON.stringify(curr)
      })
    )
    .subscribe(([emailContent, emails]) => {
      const selectedEmail = emails.find((email: EmailShort) => email.id === emailContent.id)

      const emailFull = {
        ...selectedEmail,
        ...emailContent,
      }

      setReadState(emailId, true)
      _selectedEmail$.next(emailFull)
    })
}

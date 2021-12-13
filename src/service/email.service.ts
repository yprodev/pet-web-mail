import { combineLatest, Subject, BehaviorSubject, Observable, takeUntil } from 'rxjs'
import { take, map, distinctUntilChanged, switchMap } from 'rxjs/operators'

import {
  EmailsRequest,
  GetFullEmail,
  SetReadState,
  ListEmails,
  ListSelectedEmailsSubscription,
  SetReadStateNew,
} from '../types'
import { EmailComplete, EmailShort } from '../interfaces'
import observableHttpClient from '../service/httpClient'

// TODO: Have questions???
import { selectedFolder$ } from './folder.service'

export const _emails$ = new BehaviorSubject<EmailShort[]>([])
export const _selectedEmailId$ = new Subject<string>()

export const emails$ = _emails$.asObservable().pipe(
  distinctUntilChanged((prev, curr) => {
    return JSON.stringify(prev) === JSON.stringify(curr)
  })
)

export const selectedEmailId$ = _selectedEmailId$.asObservable()

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

export const setReadStateNew: SetReadStateNew = (emailId) => {
  const emails = _emails$.getValue()
  console.log('show the toggler')
  const updateEmails = emails.map<EmailShort>((email) => {
    if (email.id === emailId) {
      return {
        ...email,
        meta: {
          ...email.meta,
          isRead: !email.meta.isRead,
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

export const setEmailId = (emailId: string): void => {
  setReadStateNew(emailId)
  _selectedEmailId$.next(emailId)
}

export const getFullEmailNew$ = selectedEmailId$.pipe(
  switchMap<string, Observable<EmailComplete>>((emailId) => emailFullRequest$(emailId))
)

export const fetchEmail$: Observable<EmailComplete> = combineLatest([
  getFullEmailNew$,
  emails$,
]).pipe(
  map(([fullEmail, emails]) => {
    const emailFound = emails.find((email: EmailShort) => email.id === fullEmail.id)

    return {
      ...emailFound,
      ...fullEmail,
    }
  })
)

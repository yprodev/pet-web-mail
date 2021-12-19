import { combineLatest, Subject, BehaviorSubject, Observable, takeUntil, of, EMPTY } from 'rxjs'
import { take, map, distinctUntilChanged, switchMap } from 'rxjs/operators'

import {
  EmailsRequest,
  GetFullEmail,
  ListEmails,
  ListSelectedEmailsSubscription,
  ToggleReadState,
  PutIntoTrash,
} from '../types'
import { EmailComplete, EmailContent, EmailShort } from '../interfaces'
import observableHttpClient from '../service/httpClient'

// TODO: Have questions???
import { selectedFolder$ } from './folder.service'

export const _emails$ = new BehaviorSubject<EmailShort[]>([])
export const _emailsContentCached$ = new BehaviorSubject<EmailComplete[]>([])
export const _selectedEmailId$ = new BehaviorSubject<string>('')

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
  observableHttpClient.get<EmailContent>(`emailsFull/${emailId}`).pipe(take(1))

export const putIntoTrash: PutIntoTrash = (emailId) => {
  const emails = _emails$.getValue()
  const cachedEmails = _emailsContentCached$.getValue()

  const updateEmails = emails.map<EmailShort>((email) => {
    if (email.id === emailId) {
      return Object.assign({}, email, { meta: { ...email.meta, folder: 'trash' } })
    }

    return email
  })

  const updatedCachedEmails = cachedEmails.map<EmailComplete>((email) => {
    if (email.id === emailId) {
      return Object.assign({}, email, { meta: { ...email.meta, folder: 'trash' } })
    }

    return email
  })

  _emails$.next(updateEmails)
  _emailsContentCached$.next(updatedCachedEmails)
}

export const resetSelectedEmailId = (): void => {
  _selectedEmailId$.next('')
}

export const toggleReadState: ToggleReadState = (emailId) => {
  const emails = _emails$.getValue()
  const cachedEmails = _emailsContentCached$.getValue()

  const updateEmails = emails.map<EmailShort>((email) => {
    if (email.id === emailId) {
      return Object.assign({}, email, { meta: { ...email.meta, isRead: !email.meta.isRead } })
    }

    return email
  })

  const updatedCachedEmails = cachedEmails.map<EmailComplete>((email) => {
    if (email.id === emailId) {
      return Object.assign({}, email, { meta: { ...email.meta, isRead: !email.meta.isRead } })
    }

    return email
  })

  _emails$.next(updateEmails)
  _emailsContentCached$.next(updatedCachedEmails)
}

export const setReadState = (emailId: string): void => {
  const emails = _emails$.getValue()
  const cachedEmails = _emailsContentCached$.getValue()

  const updateEmails = emails.map<EmailShort>((email) => {
    if (email.id === emailId) {
      return Object.assign({}, email, { meta: { ...email.meta, isRead: true } })
    }

    return email
  })

  const updatedCachedEmails = cachedEmails.map<EmailComplete>((email) => {
    if (email.id === emailId) {
      return Object.assign({}, email, { meta: { ...email.meta, isRead: true } })
    }

    return email
  })

  _emails$.next(updateEmails)
  _emailsContentCached$.next(updatedCachedEmails)
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
  setReadState(emailId)
  _selectedEmailId$.next(emailId)
}

//FIXME: Probably we need to use here mergeMap
const mergeEmailContent$ = (selectedEmailId: string) =>
  combineLatest([emailFullRequest$(selectedEmailId), emails$]).pipe(
    switchMap<[EmailContent, EmailShort[]], Observable<EmailComplete>>(
      ([fetchedEmailContent, emails]) => {
        const emailFound = emails.find((email: EmailShort) => email.id === fetchedEmailContent.id)

        if (emailFound) {
          const emailDataJoined = {
            ...emailFound,
            ...fetchedEmailContent,
          }

          const ems_cached = _emailsContentCached$.getValue()
          ems_cached.push(emailDataJoined)
          _emailsContentCached$.next(ems_cached)

          return of(emailDataJoined)
        }

        return EMPTY
      }
    )
  )

export const getFullEmail$ = combineLatest([selectedEmailId$, _emailsContentCached$]).pipe(
  switchMap(([selectedEmailId, cachedEmails]) => {
    const cachedEmail = cachedEmails.find((email) => selectedEmailId === email.id)

    return cachedEmail ? of(cachedEmail) : mergeEmailContent$(selectedEmailId)
  })
)

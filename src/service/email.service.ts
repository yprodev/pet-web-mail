import { combineLatest, Subject, BehaviorSubject, Observable, takeUntil, of, EMPTY } from 'rxjs'
import { take, map, distinctUntilChanged, switchMap } from 'rxjs/operators'

import {
  EmailsRequest,
  GetFullEmail,
  SetReadState,
  ListEmails,
  ListSelectedEmailsSubscription,
  SetReadStateNew,
} from '../types'
import { EmailComplete, EmailContent, EmailShort } from '../interfaces'
import observableHttpClient from '../service/httpClient'

// TODO: Have questions???
import { selectedFolder$ } from './folder.service'

export const _emails$ = new BehaviorSubject<EmailShort[]>([])
export const _emailsFullCached$ = new BehaviorSubject<EmailComplete[]>([])

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
  observableHttpClient.get<EmailContent>(`emailsFull/${emailId}`).pipe(take(1))

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

//FIXME: Why do we need here switchMap?
export const getFullEmailCustom1$ = selectedEmailId$.pipe(
  switchMap<string, Observable<EmailContent>>((emailId) => {
    return emailFullRequest$(emailId)
  })
)

// 1. Get selected id
// 2. Find an email in the list of emails with the id selected
// 3a. If found, return the cached email
// 3b. If not, fetch an email by selected id
// 4. Write the found email to the cache
// 5. return the found email

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

          const ems_cached = _emailsFullCached$.getValue()
          ems_cached.push(emailDataJoined)
          _emailsFullCached$.next(ems_cached)

          return of(emailDataJoined)
        }

        return EMPTY
      }
    )
  )

export const findCachedEmail$ = combineLatest([selectedEmailId$, _emailsFullCached$]).pipe(
  switchMap(([selectedEmailId, cachedEmails]) => {
    const cachedEmail = cachedEmails.find((email) => selectedEmailId === email.id)

    return cachedEmail ? of(cachedEmail) : mergeEmailContent$(selectedEmailId)
  })
)

//TODO: Rename this observable - it is not fetching an email
export const fetchEmail$: Observable<EmailContent> = combineLatest([
  getFullEmailCustom1$,
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

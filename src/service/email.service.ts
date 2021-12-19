import { combineLatest, BehaviorSubject, Observable, of, EMPTY } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

import { SetEmails, ToggleReadState, PutIntoTrash } from '../types'
import { EmailComplete, EmailContent, EmailShort } from '../interfaces'
import { emailFullRequest$ } from '../resource'

// TODO: Have questions???
import { selectedFolder$ } from './folder.service'

const _emails$ = new BehaviorSubject<EmailShort[]>([])
const _emailsContentCached$ = new BehaviorSubject<EmailComplete[]>([])
const _selectedEmailId$ = new BehaviorSubject<string>('')

const emails$ = _emails$.asObservable()

const selectedEmailId$ = _selectedEmailId$.asObservable()

//TODO: Move out the type
const selectedEmails$ = (): Observable<EmailShort[]> =>
  combineLatest([emails$, selectedFolder$]).pipe(
    map(([emails, selectedFolder]) =>
      emails.filter((email) => email.meta.folder === selectedFolder)
    )
  )

const putIntoTrash: PutIntoTrash = (emailId) => {
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

const resetSelectedEmailId = (): void => {
  _selectedEmailId$.next('')
}

const toggleReadState: ToggleReadState = (emailId) => {
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

const setReadState = (emailId: string): void => {
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

const setEmails: SetEmails = (emails) => {
  _emails$.next(emails)
}

const setEmailId = (emailId: string): void => {
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

const getFullEmail$ = combineLatest([selectedEmailId$, _emailsContentCached$]).pipe(
  switchMap(([selectedEmailId, cachedEmails]) => {
    const cachedEmail = cachedEmails.find((email) => selectedEmailId === email.id)

    return cachedEmail ? of(cachedEmail) : mergeEmailContent$(selectedEmailId)
  })
)

export {
  selectedEmails$,
  selectedEmailId$,
  putIntoTrash,
  resetSelectedEmailId,
  toggleReadState,
  setReadState,
  setEmails,
  setEmailId,
  getFullEmail$,
}

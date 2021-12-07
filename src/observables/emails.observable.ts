import { combineLatest, Subject, BehaviorSubject, Observable } from 'rxjs'
import { take, map } from 'rxjs/operators'

import { EmailsRequest, GetFullEmail } from '../types'
import { Email, EmailFull } from '../interfaces'
import { FolderTypes } from '../enums/folder-types.enum'
import observableHttpClient from '../service/httpClient'

export const _emails$ = new BehaviorSubject<Email[]>([])
export const _selectedEmail$ = new Subject<EmailFull>()

export const emails$ = _emails$.asObservable()
export const selectedEmail$ = _selectedEmail$.asObservable()

export const selectedEmails$ = (selectedFolder$: Observable<FolderTypes>): Observable<Email[]> =>
  combineLatest([emails$, selectedFolder$]).pipe(
    map(([emails, selectedFolder]) =>
      emails.filter((email) => email.meta.folder === selectedFolder)
    )
  )

export const emailsRequest$: EmailsRequest = () =>
  observableHttpClient.get<Email[]>('emails').pipe(
    take(1),
    map<Email[], Email[]>((emails) =>
      emails.sort((firstDate, secondElement) => secondElement.header.date - firstDate.header.date)
    )
  )

export const emailFullRequest$: GetFullEmail = (emailId) =>
  observableHttpClient.get<EmailFull>(`emailsFull/${emailId}`).pipe(take(1))

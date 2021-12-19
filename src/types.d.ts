import { Observable } from 'rxjs'
import { FolderTypes } from './enums/folder-types.enum'
import { EmailContent, EmailShort } from './interfaces'

// Requests
export type InitHttpClient = (config: AxiosRequestConfig) => AxiosInstance
export type Request<T> = () => Observable<T>

// Emails
export type GetFullEmail = (emailId: string) => Observable<EmailContent>
export type SetEmails = (emails: EmailShort[]) => void

// Folders
export type UpdateSelectedFolder = (folderName: FolderTypes) => void

// Actions
export type ToggleReadState = (emailId: string) => void
export type PutIntoTrash = (emailId: string) => void

// Utils
export type CompareDates = (elementOne: EmailShort, elementTwo: EmailShort) => number

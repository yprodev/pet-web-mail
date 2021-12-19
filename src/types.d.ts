import { Observable } from 'rxjs'
import { FolderTypes } from './enums/folder-types.enum'
import { EmailContent, EmailShort } from './interfaces'

export type InitHttpClient = (config: AxiosRequestConfig) => AxiosInstance

export type ListEmails = (componentDestroyed: Subject<void>) => void
export type ToggleReadState = (emailId: string) => void
export type PutIntoTrash = (emailId: string) => void

export type EmailsRequest = () => Observable<EmailShort[]>
export type FoldersRequest = () => Observable<FolderTypes[]>

export type UpdateSelectedFolder = (folderName: FolderTypes) => void
export type GetFullEmail = (emailId: string) => Observable<EmailContent>
export type ListSelectedEmailsSubscription = (
  componentDestroyed: Subject<void>,
  stateSetter: Dispatch<SetStateAction<EmailShort[]>>
) => void
export type ListFoldersSubscription = (
  componentDestroyed: Subject<void>,
  stateSetter: Dispatch<SetStateAction<FolderTypes[]>>
) => void

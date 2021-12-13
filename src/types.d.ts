import { Observable } from 'rxjs'
import { FolderTypes } from './enums/folder-types.enum'
import { EmailComplete, EmailShort } from './interfaces'

export type InitHttpClient = (config: AxiosRequestConfig) => AxiosInstance

export type ListEmails = (componentDestroyed: Subject<void>) => void
export type SetReadState = (emailId: string, status: boolean) => void
export type SetReadStateNew = (emailId: string) => void

export type EmailsRequest = () => Observable<EmailShort[]>
export type FoldersRequest = () => Observable<FolderTypes[]>

export type UpdateSelectedFolder = (folderName: FolderTypes) => void
export type GetFullEmail = (emailId: string) => Observable<EmailComplete>
export type ListSelectedEmailsSubscription = (
  componentDestroyed: Subject<void>,
  stateSetter: Dispatch<SetStateAction<EmailShort[]>>
) => void
export type ListFoldersSubscription = (
  componentDestroyed: Subject<void>,
  stateSetter: Dispatch<SetStateAction<FolderTypes[]>>
) => void

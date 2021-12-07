import { FolderTypes } from './enums/folder-types.enum'

export type InitHttpClient = (config: AxiosRequestConfig) => AxiosInstance

export type ListEmails = (componentDestroyed: Subject<void>) => void
export type SetReadState = (emailId: string, status: boolean) => void
export type EmailsRequest = () => Observable<Email[]>
export type FoldersRequest = () => Observable<FolderTypes[]>

export type UpdateSelectedFolder = (folderName: FolderTypes) => void
export type GetFullEmail = (emailId: string) => Observable<EmailFull>
export type ListSelectedEmailsSubscription = (
  selectedFolder$: Observable<FolderTypes>,
  componentDestroyed: Subject<void>,
  stateSetter: Dispatch<SetStateAction<Email[]>>
) => void
export type ListFoldersSubscription = (
  componentDestroyed: Subject<void>,
  stateSetter: Dispatch<SetStateAction<FolderTypes[]>>
) => void

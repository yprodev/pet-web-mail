import { FolderTypes } from '../enums/folder-types.enum'
import { EmailShort, EmailComplete } from '.'

export interface AsideHook {
  foldersList: FolderTypes[]
  handleFolderSelect(folderType: FolderTypes): void
}

export interface EmailListHook {
  emails: EmailShort[]
  handleEmailDisplay(emailId: string): void
}

export interface ViewAreaHook {
  fullEmail: EmailComplete | unknown
  toggleEmailReadState(): void
}

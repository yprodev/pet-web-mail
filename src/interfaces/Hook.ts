import { FolderTypes } from '../enums/folder-types.enum'
import { Email } from '.'

export interface AsideHook {
  foldersList: FolderTypes[]
  handleFolderSelect(folderType: FolderTypes): void
}

export interface EmailListHook {
  emails: Email[]
  handleEmailDisplay(emailId: string): void
}

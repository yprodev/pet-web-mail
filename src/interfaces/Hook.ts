import { FolderTypes } from '../enums/folder-types.enum'

export interface AsideHook {
  foldersList: FolderTypes[]
  handleFolderSelect(folderType: FolderTypes): void
}

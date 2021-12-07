import { takeUntil } from 'rxjs/operators'

import { ListFoldersSubscription, UpdateSelectedFolder } from '../types'
import { FolderTypes } from '../enums/folder-types.enum'
import { _selectedFolder$, foldersRequest, _folderList$ } from '../observables'

export const listFoldersSubscription$: ListFoldersSubscription = (
  componentDestroyed,
  stateSetter
) => {
  foldersRequest()
    .pipe(takeUntil(componentDestroyed))
    .subscribe((folderList: FolderTypes[]) => {
      _folderList$.next(folderList)

      if (folderList[0]) {
        _selectedFolder$.next(folderList[0])
      }

      stateSetter(folderList)
    })
}

export const updateSelectedFolder: UpdateSelectedFolder = (folderName) => {
  _selectedFolder$.next(folderName)
}

import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { take, distinctUntilChanged } from 'rxjs/operators'

import { FoldersRequest, ListFoldersSubscription, UpdateSelectedFolder } from '../types'
import { FolderTypes } from '../enums/folder-types.enum'
import observableHttpClient from '../service/httpClient'

export const _folderList$ = new Subject<FolderTypes[]>()
export const _selectedFolder$ = new Subject<FolderTypes>()

export const folderList$ = _folderList$.asObservable().pipe(
  distinctUntilChanged((prev, curr) => {
    return JSON.stringify(prev) === JSON.stringify(curr)
  })
)
export const selectedFolder$ = _selectedFolder$.asObservable().pipe(
  distinctUntilChanged((prev, curr) => {
    return JSON.stringify(prev) === JSON.stringify(curr)
  })
)

export const foldersRequest: FoldersRequest = () =>
  observableHttpClient.get<FolderTypes[]>('folderList').pipe(take(1))

//FIXME: Just use it within the component
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

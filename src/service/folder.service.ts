import { Subject, BehaviorSubject } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'

import { UpdateSelectedFolder } from '../types'
import { FolderTypes } from '../enums/folder-types.enum'

export const _folderList$ = new Subject<FolderTypes[]>()
export const _selectedFolder$ = new BehaviorSubject<FolderTypes>(FolderTypes.INBOX)

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

export const updateSelectedFolder: UpdateSelectedFolder = (folderName) => {
  _selectedFolder$.next(folderName)
}

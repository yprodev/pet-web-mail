import { Subject, BehaviorSubject } from 'rxjs'

import { UpdateSelectedFolder } from '../types'
import { FolderTypes } from '../enums/folder-types.enum'

export const _folderList$ = new Subject<FolderTypes[]>()
export const _selectedFolder$ = new BehaviorSubject<FolderTypes>(FolderTypes.INBOX)

export const folderList$ = _folderList$.asObservable()
export const selectedFolder$ = _selectedFolder$.asObservable()

export const updateSelectedFolder: UpdateSelectedFolder = (folderName) =>
  _selectedFolder$.next(folderName)

import { Subject } from 'rxjs'
import { take } from 'rxjs/operators'

import { FoldersRequest } from '../types'
import { FolderTypes } from '../enums/folder-types.enum'
import observableHttpClient from '../service/httpClient'

export const _folderList$ = new Subject<FolderTypes[]>()
export const _selectedFolder$ = new Subject<FolderTypes>()

export const folderList$ = _folderList$.asObservable()
export const selectedFolder$ = _selectedFolder$.asObservable()

export const foldersRequest: FoldersRequest = () =>
  observableHttpClient.get<FolderTypes[]>('folderList').pipe(take(1))

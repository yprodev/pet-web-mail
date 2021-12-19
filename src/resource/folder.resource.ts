import { take } from 'rxjs/operators'

import { Request } from '../types'
import { FolderTypes, EndPointsList } from '../enums'
import { get } from '../service/httpClient'

const foldersRequest$: Request<FolderTypes[]> = () =>
  get<FolderTypes[]>(EndPointsList.FOLDER_LIST).pipe(take(1))

export { foldersRequest$ }

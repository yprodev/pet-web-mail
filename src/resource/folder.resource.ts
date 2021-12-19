import { take } from 'rxjs/operators'

import { FoldersRequest } from '../types'
import { FolderTypes, EndPointsList } from '../enums'
import observableHttpClient from '../service/httpClient'

export const foldersRequest: FoldersRequest = () =>
  observableHttpClient.get<FolderTypes[]>(EndPointsList.FOLDER_LIST).pipe(take(1))

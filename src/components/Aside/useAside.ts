import { useEffect, useState, useCallback } from 'react'
import { Subject } from 'rxjs'

import { FolderTypes } from '../../enums/folder-types.enum'
import { AsideHook } from '../../interfaces'
import { updateSelectedFolder, listFoldersSubscription$ } from '../../service'

const useAside = (): AsideHook => {
  const componentDestroyed$ = new Subject<void>()
  const [foldersList, setFoldersList] = useState<FolderTypes[]>([])

  const handleFolderSelect = useCallback((folderType: FolderTypes): void => {
    updateSelectedFolder(folderType)
  }, [])

  useEffect(() => {
    listFoldersSubscription$(componentDestroyed$, setFoldersList)

    return () => {
      componentDestroyed$.next()
      componentDestroyed$.complete()
    }
  }, [])

  return {
    foldersList,
    handleFolderSelect,
  }
}

export default useAside

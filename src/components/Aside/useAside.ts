import { useEffect, useState, useCallback } from 'react'
import { Subject } from 'rxjs'

import { FolderTypes } from '../../enums/folder-types.enum'
import { AsideHook } from '../../interfaces'
import { updateSelectedFolder, listFoldersSubscription$ } from '../../selectors'

const useAside = (): AsideHook => {
  const [foldersList, setFoldersList] = useState<FolderTypes[]>([])

  const handleFolderSelect = useCallback((folderType: FolderTypes) => {
    updateSelectedFolder(folderType)
  }, [])

  useEffect(() => {
    const componentDestroyed$ = new Subject<void>()

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

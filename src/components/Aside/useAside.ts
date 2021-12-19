import { useEffect, useState, useCallback } from 'react'
import { Subject, takeUntil } from 'rxjs'

import { FolderTypes } from '../../enums/folder-types.enum'
import { AsideHook } from '../../interfaces'
import { updateSelectedFolder } from '../../service'
import { foldersRequest$ } from '../../resource'

const useAside = (): AsideHook => {
  const componentDestroyed$ = new Subject<void>()
  const [foldersList, setFoldersList] = useState<FolderTypes[]>([])

  const handleFolderSelect = useCallback((folderType: FolderTypes): void => {
    updateSelectedFolder(folderType)
  }, [])

  useEffect(() => {
    foldersRequest$()
      .pipe(takeUntil(componentDestroyed$))
      .subscribe((folders) => {
        setFoldersList(folders)
      })

    return () => {
      componentDestroyed$.next()
      componentDestroyed$.complete()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    foldersList,
    handleFolderSelect,
  }
}

export default useAside

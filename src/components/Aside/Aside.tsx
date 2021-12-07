import { FC } from 'react'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import { SxProps } from '@mui/system'
import { Theme } from '@mui/material/styles'

import { FolderTypes } from '../../enums/folder-types.enum'
import useAside from './useAside'

interface AsideProps {}

const buttonStyle: SxProps<Theme> = {
  display: 'flex',
  color: 'common.white',
  fontWeight: 'bold',
}

const Aside: FC<AsideProps> = () => {
  const { foldersList, handleFolderSelect } = useAside()

  return (
    <Grid
      item
      xs={2}
      sx={{ display: 'flex', flexDirection: 'column', pt: 8, bgcolor: 'background.paper' }}
    >
      {foldersList.map((folderName: FolderTypes, idx: number) => {
        return (
          <Button sx={buttonStyle} key={idx} onClick={() => handleFolderSelect(folderName)}>
            {folderName}
          </Button>
        )
      })}
    </Grid>
  )
}

export default Aside

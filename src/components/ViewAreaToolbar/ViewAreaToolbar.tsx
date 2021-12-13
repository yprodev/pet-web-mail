import { FC, memo } from 'react'
import { Box } from '@mui/system'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'

interface ViewAreaToolbarProps {
  handleClick: Function
}

const ViewAreaToolbar: FC<ViewAreaToolbarProps> = ({ handleClick }) => (
  <Box component='header' sx={{ bgcolor: 'Background.default' }}>
    <IconButton
      onClick={() => handleClick()}
      aria-label='mark as read'
      component='span'
      size='small'
    >
      <CheckIcon fontSize='small' />
    </IconButton>
    <IconButton aria-label='remove email' component='span' size='small'>
      <DeleteIcon fontSize='small' />
    </IconButton>
  </Box>
)

export default ViewAreaToolbar

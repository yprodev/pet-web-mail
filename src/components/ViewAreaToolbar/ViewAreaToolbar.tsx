import { FC } from 'react'
import { Box } from '@mui/system'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'
import CancelIcon from '@mui/icons-material/Cancel'

interface ViewAreaToolbarProps {
  handleClick: Function
  isRead: boolean
}

const ViewAreaToolbar: FC<ViewAreaToolbarProps> = ({ handleClick, isRead }) => (
  <Box component='header' sx={{ mb: 3, bgcolor: 'Background.default' }}>
    <IconButton
      onClick={() => handleClick()}
      aria-label='mark as read'
      component='span'
      size='small'
    >
      {isRead ? (
        <CheckIcon fontSize='small' color='primary' />
      ) : (
        <CancelIcon fontSize='small' color='error' />
      )}
    </IconButton>
    <IconButton aria-label='remove email' component='span' size='small'>
      <DeleteIcon fontSize='small' />
    </IconButton>
  </Box>
)

export default ViewAreaToolbar

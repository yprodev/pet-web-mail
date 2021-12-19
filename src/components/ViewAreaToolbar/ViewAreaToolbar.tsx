import { FC, MouseEventHandler } from 'react'
import { Box } from '@mui/system'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check'
import CancelIcon from '@mui/icons-material/Cancel'

import { EmailComplete } from '../../interfaces'
import { emails$ } from '../../service'

interface ViewAreaToolbarProps<T> {
  toggleIsRead: MouseEventHandler<T>
  removeEmail: MouseEventHandler<T>
  email: EmailComplete
}

const ViewAreaToolbar: FC<ViewAreaToolbarProps<HTMLAnchorElement>> = ({
  toggleIsRead,
  removeEmail,
  email,
}) => (
  <Box component='header' sx={{ mb: 3, bgcolor: 'Background.default' }}>
    <IconButton onClick={toggleIsRead} aria-label='mark as read' component='span' size='small'>
      {email.meta.isRead ? (
        <CancelIcon fontSize='small' color='error' />
      ) : (
        <CheckIcon fontSize='small' color='primary' />
      )}
    </IconButton>
    {email.meta.folder !== 'trash' && (
      <IconButton onClick={removeEmail} aria-label='remove email' component='span' size='small'>
        <DeleteIcon fontSize='small' />
      </IconButton>
    )}
  </Box>
)

export default ViewAreaToolbar

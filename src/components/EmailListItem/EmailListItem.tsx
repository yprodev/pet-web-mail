import { FC } from 'react'
import { format } from 'date-fns'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import CircleIcon from '@mui/icons-material/Circle'

interface EmailListItemProps {
  emailId: string
  from: string
  date: string
  subject: string
  isRead: boolean
  preview: string
  handleClick: Function
}

const EmailListItem: FC<EmailListItemProps> = ({
  emailId,
  from,
  date,
  subject,
  isRead,
  preview,
  handleClick,
}) => {
  return (
    <Box
      onClick={() => handleClick(emailId)}
      component='section'
      sx={{ display: 'flex', flexDirection: 'column', py: 2 }}
    >
      <Box component='header' sx={{ display: 'flex', pl: 1, pr: 4, alignContent: 'center' }}>
        {!isRead && (
          <CircleIcon
            sx={{
              width: 10,
              color: 'blue',
              mr: 1,
            }}
          />
        )}
        <Box
          component='div'
          sx={{
            display: 'flex',
            flexGrow: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant='body1' component='p' sx={{ display: 'flex' }}>
            {from}
          </Typography>
          <Typography
            variant='body1'
            component='p'
            color='background.paper'
            sx={{ display: 'flex' }}
          >
            {format(new Date(date), 'do MMMM yyyy')}
          </Typography>
        </Box>
      </Box>
      <Box component='article' sx={{ pl: 4, pr: 2 }}>
        <Typography variant='h4' component='h4'>
          {subject}
        </Typography>
        <Typography variant='body1' component='p'>
          {preview}
        </Typography>
        <hr />
      </Box>
    </Box>
  )
}

export default EmailListItem

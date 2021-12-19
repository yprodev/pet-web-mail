import { FC } from 'react'
import { Typography, Card, CardContent, Box, Chip, Stack, Divider } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import DeleteIcon from '@mui/icons-material/Delete'

import { EmailComplete } from '../../interfaces'

interface EmailProps {
  email: EmailComplete
}

const Email: FC<EmailProps> = ({ email }) => {
  return (
    <Card sx={{ bgcolor: 'white' }}>
      <CardContent>
        <Box
          component='header'
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 70,
            mb: 3,
          }}
        >
          <Stack direction='row' spacing={1}>
            {email.meta.isRead && (
              <Chip size='small' color='primary' label='Email is read' deleteIcon={<DoneIcon />} />
            )}
            <Chip
              size='small'
              label='Email is deleted'
              deleteIcon={<DeleteIcon />}
              variant='outlined'
            />
          </Stack>
          <Typography variant='h4' component='h4'>
            {email.header.subject}
          </Typography>
          <Typography variant='body1' component='p' sx={{ display: 'flex' }}>
            {email.header.from} sent this message on {email.header.date}
          </Typography>
          <Divider />
        </Box>
        <Box component='section' sx={{ display: 'flex' }}>
          <Typography variant='body1' component='p' sx={{ display: 'flex' }}>
            {email.message}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Email

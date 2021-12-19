export interface EmailShort {
  id: string
  meta: {
    isRead: boolean
    folder: string
  }
  header: {
    subject: string
    from: string
    date: string
    preview: string
  }
}

export interface EmailContent {
  id: string
  attachments: []
  message: string
}

export type EmailComplete = EmailShort & EmailContent

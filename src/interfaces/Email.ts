export interface Email {
  id: string
  meta: {
    isRead: boolean
    folder: string
  }
  header: {
    subject: string
    from: string
    date: number //FIXME: Date type in UTC format
    preview: string
  }
}

export interface EmailFull {
  id: string
  content: {
    attachments: []
    message: string
  }
}

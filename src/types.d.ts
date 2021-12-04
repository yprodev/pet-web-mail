export interface Email {
  id: string
  header: {
    subject: string
    from: string
    data: number //FIXME: Date type in UTC format
  }
  body: {
    message: string
  }
}

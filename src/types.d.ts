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

export interface ResourceEmail {
  list(client: AxiosInstance): Promise<AxiosResponse<Email[]>>
}

export interface InitialState {
  emails: Email[]
  loading: boolean
  error: string
}

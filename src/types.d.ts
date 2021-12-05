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

export type InitHttpClient = (config: AxiosRequestConfig) => AxiosInstance

export type OFuncList = (emails: Email[]) => void
export type OFuncListing = (status: boolean) => void
export type OFuncError = (msg: string) => void
export type OFuncSetStateNext = (payload: EmailPayload) => void
export type OFuncSubjectGetter = () => BehaviorSubject<AppState>

export interface ResourceEmail {
  list(client: AxiosInstance): Promise<AxiosResponse<Email[]>>
}

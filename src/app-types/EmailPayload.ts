import { Email } from '../types'
import { ErrorPayload } from './ErrorPayload'
import { StatusPayload } from './StatusPayload'

export type EmailPayload = { emails: Email[] } | { email: Email } | ErrorPayload | StatusPayload

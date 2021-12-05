import { EmailState } from './EmailState'
import { StatusState } from './StatusState'
import { ErrorState } from './ErrorState'

export type AppState = EmailState & StatusState & ErrorState

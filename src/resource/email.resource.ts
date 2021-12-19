import { take, map } from 'rxjs/operators'

import { Request, GetFullEmail } from '../types'
import { EmailContent, EmailShort } from '../interfaces'
import { EndPointsList } from '../enums'
import { get } from '../service/httpClient'
import { compareDates } from '../util'

const emailsRequest$: Request<EmailShort[]> = () =>
  get<EmailShort[]>(EndPointsList.EMAIL_LIST).pipe(
    take(1),
    map<EmailShort[], EmailShort[]>((emails) => emails.sort(compareDates))
  )

const emailFullRequest$: GetFullEmail = (emailId) =>
  get<EmailContent>(`${EndPointsList.EMAIL_FULL}/${emailId}`).pipe(take(1))

export { emailsRequest$, emailFullRequest$ }

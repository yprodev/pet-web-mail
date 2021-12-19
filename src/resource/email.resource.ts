import { take, map } from 'rxjs/operators'

import { EmailsRequest, GetFullEmail } from '../types'
import { EmailContent, EmailShort } from '../interfaces'
import { EndPointsList } from '../enums'
import observableHttpClient from '../service/httpClient'

//TODO: Refactor comparison function
export const emailsRequest$: EmailsRequest = () =>
  observableHttpClient.get<EmailShort[]>(EndPointsList.EMAIL_LIST).pipe(
    take(1),
    map<EmailShort[], EmailShort[]>((emails) =>
      emails.sort(
        (firstDate, secondElement) =>
          new Date(secondElement.header.date).getDate() - new Date(firstDate.header.date).getDate()
      )
    )
  )

export const emailFullRequest$: GetFullEmail = (emailId) =>
  observableHttpClient.get<EmailContent>(`${EndPointsList.EMAIL_FULL}/${emailId}`).pipe(take(1))

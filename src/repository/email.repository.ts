import { httpClientOptions } from '../config'
import { initHttpClient } from '../service'
import { resourceEmail } from '../resource'
import { initObservableEmail } from '../observable'

const initRepositoryEmail = () => {
  const httpClient = initHttpClient(httpClientOptions)
  const emails = initObservableEmail()

  const list = async () => {
    try {
      emails.listing(true)
      const emailsResponse = await resourceEmail.list(httpClient)
      emails.list(emailsResponse.data)
    } catch (error) {
    } finally {
      emails.listing(false)
    }
  }

  const getEmailObservable = () => emails.getObservable()

  return {
    list,
    getEmailObservable,
  }
}

export default initRepositoryEmail

import { Email } from '../types'
import HttpClient from '../service/httpClient'

//FIXME: Define the types of the responses
//FIXME: Move into the interfaces
interface ResourceEmail {
  getAll(): Promise<Array<Email>> //FIXME: define the type
}

const resourceEmail: ResourceEmail = {
  getAll: () => HttpClient.get('all'),
}

export default resourceEmail

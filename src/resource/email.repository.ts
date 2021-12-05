import { ResourceEmail, Email } from '../types'

const resourceEmail: ResourceEmail = {
  list: (client) => client.get<Email[]>('emails'),
}

export default resourceEmail

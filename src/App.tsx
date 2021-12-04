import { useState, useEffect } from 'react'

import resourceMail from './resource/email'
import { Email } from './types'

function App() {
  const [emails, setEmails] = useState<Array<Email>>([])

  const handlerFetch = async () => {
    const res = await resourceMail.getAll()
    setEmails(res)
    console.log('result', res)
  }

  useEffect(() => {
    const data = handlerFetch()
    console.log('data: --->', data)

    return () => {}
  }, [])

  return (
    <div className='App'>
      {emails.map((email: Email, idx: number) => {
        return <div key={idx}>{email.id}</div>
      })}
    </div>
  )
}

export default App

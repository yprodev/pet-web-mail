import { BehaviorSubject } from 'rxjs'

import {
  OFuncList,
  OFuncListing,
  OFuncError,
  OFuncSetStateNext,
  OFuncSubjectGetter,
} from '../types'
import { AppState } from '../app-types'
import { initialState } from '../config'

const emailsSubject: BehaviorSubject<AppState> = new BehaviorSubject<AppState>(initialState)

const initObservableEmail = () => {
  const list: OFuncList = (emails) => {
    setStateNext({ emails, error: '' })
  }

  const listing: OFuncListing = (status) => {
    setStateNext({ listing: status })
  }

  const error: OFuncError = (msg) => {
    setStateNext({ error: msg })
  }

  const setStateNext: OFuncSetStateNext = (payload) => {
    const state: AppState = emailsSubject.getValue()

    emailsSubject.next({ ...state, ...payload })
  }

  const getObservable: OFuncSubjectGetter = () => emailsSubject

  return {
    list,
    listing,
    error,
    getObservable,
  }
}

export default initObservableEmail

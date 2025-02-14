import { SignedTransaction } from './SignedTransaction'
import { Constants } from '../../utils/constants'

export class PushTransaction extends SignedTransaction {

  ENDPOINT: string = 'chain/push_transaction'
  ACTION: string = ''
  ACCOUNT: string = Constants.defaultAccount
  data: any

  constructor(action: string, account: string, data: any) {
    super()
    this.ACTION = action
    if (account) this.ACCOUNT = account
    this.data = data
  }

  async getData() {
    let actor = this.getActor()
    let data = {
      ...this.data,
      actor: actor
    }
    return data
  }

}

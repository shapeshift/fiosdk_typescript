import { SignedTransaction } from './SignedTransaction'
import { Constants } from '../../utils/constants'

export class RegisterFioDomain extends SignedTransaction {

  ENDPOINT: string = 'chain/register_fio_domain'
  ACTION: string = 'regdomain'
  ACCOUNT: string = Constants.defaultAccount
  fioDomain: string
  maxFee: number
  walletFioAddress: string

  constructor(fioDomain: string, maxFee: number, walletFioAddress: string = '') {
    super()
    this.fioDomain = fioDomain
    this.maxFee = maxFee
    this.walletFioAddress = walletFioAddress
  }

  getData(): any {
    let actor = this.getActor()
    let data = {
      fio_domain: this.fioDomain,
      owner_fio_public_key: this.publicKey,
      max_fee: this.maxFee,
      tpid: this.walletFioAddress,
      actor: actor
    }
    return data
  }

}
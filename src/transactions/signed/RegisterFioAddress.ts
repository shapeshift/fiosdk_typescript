import { SignedTransaction } from './SignedTransaction'
import { validationRules } from '../../utils/validation'
import { Constants } from '../../utils/constants'

export class RegisterFioAddress extends SignedTransaction {

  public ENDPOINT: string = 'chain/register_fio_address'
  public ACTION: string = 'regaddress'
  public ACCOUNT: string = Constants.defaultAccount
  public fioAddress: string
  public ownerPublicKey: string
  public maxFee: number
  public technologyProviderId: string

  constructor(fioAddress: string, ownerPublicKey: string | null, maxFee: number, technologyProviderId: string = '') {
    super()
    this.fioAddress = fioAddress
    this.ownerPublicKey = ownerPublicKey || ''
    this.maxFee = maxFee
    this.technologyProviderId = technologyProviderId

    this.validationData = { fioAddress: fioAddress, tpid: technologyProviderId || null }
    this.validationRules = validationRules.registerFioAddress
  }

  public async getData() {
    const actor = this.getActor()
    const data = {
      fio_address: this.fioAddress,
      owner_fio_public_key: this.ownerPublicKey || this.publicKey,
      max_fee: this.maxFee,
      tpid: this.technologyProviderId,
      actor,
    }
    return data
  }

}

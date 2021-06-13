import { PrivateKey } from '@shapeshiftoss/fiojs'
import { Transactions } from '../Transactions'

export abstract class Query<T> extends Transactions {
  abstract ENDPOINT: string

  abstract getData(): Promise<any>

  async decrypt(result: any): Promise<any> {
  }

  isEncrypted = false

  async execute(publicKey: string, privateKey: PrivateKey = ''): Promise<any> {
    this.publicKey = publicKey
    this.privateKey = privateKey
    if (!this.isEncrypted) {
      return this.executeCall(this.getEndPoint(), JSON.stringify(await this.getData()))
    } else {
      try {
        const result = await this.executeCall(this.getEndPoint(), JSON.stringify(await this.getData()))
        return await this.decrypt(result)
      } catch (error) {
        throw error
      }
    }
  }

  getEndPoint(): string {
    return this.ENDPOINT
  }

}

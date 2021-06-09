import { Authorization } from './Authorization'

export class RawAction {
  account: string = '' //'testeostoken',
  name: string = '' //'transfer',
  authorization: Array<Authorization> = new Array<Authorization>()
  data: any
}
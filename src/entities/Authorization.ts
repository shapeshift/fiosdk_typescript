export class Authorization {
  actor: string
  permission: string

  constructor(actor: string, permission = 'active') {
    this.actor = actor
    this.permission = permission
  }
}
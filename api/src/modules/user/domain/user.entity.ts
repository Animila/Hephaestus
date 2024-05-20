export class User {
  constructor(
    public readonly id: number,
    public readonly first_name: string,
    public readonly last_name: string,
    public readonly phone: string,
    public readonly email: string,
    public readonly activated: boolean,
    public readonly role_id: number,
    public readonly created_at: Date
  ) {}
}
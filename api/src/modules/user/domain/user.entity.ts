export class User {
  constructor(
    public readonly id: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly phone: string,
    public readonly email: string,
    public readonly password: string,
    public readonly activated: boolean,
    public readonly roleId: number,
    public readonly createdAt: Date
  ) {}
}
export class Token {
  constructor(
    public readonly id: number,
    public readonly userId: number,
    public readonly token: string,
    public readonly type: string,
    public readonly numberCode: number,
    public readonly isValid: boolean,
    public readonly createdAt: Date,
    public readonly usedAt: Date | null,
  ) {}
}

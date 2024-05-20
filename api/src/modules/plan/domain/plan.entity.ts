export class Plan {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly scopes: any,
    public readonly price: number,
  ) {}
}

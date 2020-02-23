export class User {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public password: string,
    public phone?: string,
    public website?: string,
    public address?: string,
    public country?: string,
    public city?: string,
    public state?: string,
    public zipCode?: number,
    ) {}
}

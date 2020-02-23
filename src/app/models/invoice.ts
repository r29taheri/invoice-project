export interface InvoiceItem {
  id: string;
  name: string;
  description: string;
  cost: number;
  qtyHr: number;
  amount: number;
}
export class Invoice {
  constructor(
    public id: string,
    public userId: string,
    public clientId: string,
    public name: string,
    public date: Date,
    public subTotal: number,
    public tax: number,
    public total: number,
    public items: InvoiceItem[],
    // public name: string,
    // public description: string,
    // public cost: number,
    // public qtyHr: number,
    // public amount: number,
    ) {}
}

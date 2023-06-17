import { Roupa } from './roupa.model';

export type StatusType = 'EM ABERTO' | 'REJEITADO' | 'CANCELADO' | 'AGUARDANDO';

export class ItemRoupa extends Roupa {
  public quantity?: number;
  public totalPrice?: number;
}

export class Pedido {
  public constructor(
    public id?: number,
    public data?: Date,
    public status?: StatusType,
    public price?: number,
    public deadline?: number,
    public roupas?: ItemRoupa[]
  ) {}
}

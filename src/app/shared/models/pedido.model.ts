import { Roupa } from './roupa.model';

export enum ColorStatus {
  TUDO = 'info',
  EM_ABERTO = 'warning',
  REJEITADO = 'danger',
  CANCELADO = 'danger',
  RECOLHIDO = 'light',
  AGUARDANDO_PAGAMENTO = 'primary',
  PAGO = 'warning2',
  FINALIZADO = 'success',
}

export type StatusType =
  | 'EM ABERTO'
  | 'REJEITADO'
  | 'CANCELADO'
  | 'RECOLHIDO'
  | 'AGUARDANDO PAGAMENTO'
  | 'PAGO'
  | 'FINALIZADO';

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

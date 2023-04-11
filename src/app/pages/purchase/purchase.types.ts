import { dateFormatter } from "../utils";

const today = dateFormatter(new Date())

export type IClothing = {
    id: number;
    quantity: number;
    price: number;
    deadline: string | Date
}

export type IPurchase = {
    id: number;
    deadline: string | Date;
    price: number;
    status: string
    items: IClothing[]
}

const PURCHASE_ITEMS: IClothing[] = [
    { id: 1, quantity: 2, price: 4, deadline: today},
    { id: 2, quantity: 1, price: 5, deadline: today},
    { id: 1, quantity: 1, price: 10, deadline: today}
]

const PURCHASE: IPurchase = {
    id: 1,
    deadline: today,
    price: 55,
    status: 'ABERTO',
    items: PURCHASE_ITEMS
}
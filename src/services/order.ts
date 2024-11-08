import { create } from "zustand";
import { Item } from "./menu";

export interface Order {
    item: Item;
    quantity: number;
}

export interface OrderSummary {
    orders: Order[];
}

export interface OrderState {
    orderSummary: OrderSummary;
    upsert: (order: Order) => void;
    add: (order: Order) => void;
    subtract: (order: Order) => void;
    remove: (order: Order) => void;
}

export const useOrderStore = create<OrderState>()((set) => ({
    orderSummary: { orders: [{ item: { name: 'test', description: '', modifications: [], options: [], price: 8.0 }, quantity: 2 }] },
    upsert: (order) => set((orderState) => {
        const copy: OrderState = JSON.parse(JSON.stringify(orderState))
        const existing = copy.orderSummary.orders.find(o => o.item.name === order.item.name);
        if (!existing) {
            copy.orderSummary.orders.push(order);
        } else {
            existing.quantity = order.quantity;
        }
        return copy;
    }),
    add: (order) => set((orderState) => {
        const copy: OrderState = JSON.parse(JSON.stringify(orderState))
        const existing = copy.orderSummary.orders.find(o => o.item.name === order.item.name);
        if (!existing) {
            copy.orderSummary.orders.push(order);
        } else {
            existing.quantity += order.quantity;
        }
        return copy;
    }),
    subtract: (order) => set((orderState) => {
        const copy: OrderState = JSON.parse(JSON.stringify(orderState))
        const existing = copy.orderSummary.orders.find(o => o.item.name === order.item.name);
        if (!existing) {
            return orderState;
        }
        if (existing.quantity === 1) {
            copy.orderSummary.orders = orderState.orderSummary.orders.filter(o => o.item.name !== order.item.name)
        } else {
            existing.quantity -= 1;
        }
        return copy;
    }),
    remove: (order) => set((orderState) => {
        return { ...orderState, orderSummary: { orders: orderState.orderSummary.orders.filter(o => o.item.name !== order.item.name) } }
    })
}))

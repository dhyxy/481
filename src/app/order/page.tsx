'use client'

import Nav from "@/components/Nav";
import { Order, useOrderStore } from "@/services/order";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApplePay, faGooglePay, faPaypal } from "@fortawesome/free-brands-svg-icons"
import Link from "next/link";
import { Button } from "@headlessui/react";


export default function OrderPage() {
    const orderStore = useOrderStore()

    const subTotal = orderStore.orderSummary.orders.reduce((sum, curr) => sum + (curr.item.price * curr.quantity), 0)
    const tax = subTotal * 0.05;
    const total = subTotal + tax;

    return <>
        <Nav />
        <div className="h-fit w-screen flex flex-col items-center mt-4">
            <div className="w-5/6 bg-zinc-100 h-5/6 rounded p-6">
                <span className="text-2xl font-bold">Order Summary</span>
                <table className="table-auto w-[100%] ">
                    <thead className="text-gray-600 font-extralight border-b-2">
                        <tr>
                            <th className="text-left">Item Name</th>
                            <th className="text-left">Quantity </th>
                            <th className="text-left">Total</th>
                            <th className="hidden">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderStore.orderSummary.orders.map(order => {
                            const cost = order.item.price * order.quantity;
                            return <tr key={order.item.name} className="border-b-2">
                                <td className="font-semibold">{order.item.name}</td>
                                <td>
                                    <ItemQuantity order={order} />
                                </td>
                                <td>${cost.toFixed(2)}</td>
                                <td><Button className="items-center align-middle py-4" onClick={() => orderStore.remove(order)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                    </svg>
                                </Button></td>
                            </tr>
                        })}
                    </tbody>
                </table>

                <table className="table-auto w-full my-4 font-bold border-separate border-spacing-y-4">
                    <tbody>
                        <tr>
                            <td>Subtotal</td>
                            <td>${subTotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Taxes (5%)</td>
                            <td>${tax.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td className="border-t-2 border-slate-600">Total</td>
                            <td className="border-t-2 border-slate-600">${total.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="flex flex-col mx-4 gap-1">
                    <input type="text" name="Discount" placeholder="Enter discount code" className="rounded p-3" />
                    <Button className="bg-zinc-900 text-slate-100 rounded p-3">Apply</Button>
                </div>
            </div>
            <div className="w-5/6 flex flex-row items-stretch pt-4 gap-4">
                <div className="bg-zinc-100 rounded h-16 w-1/3 flex items-center"><FontAwesomeIcon className="block m-auto top-auto h-1/2" icon={faPaypal} /></div>
                <div className="bg-zinc-100 rounded h-16 w-1/3 flex items-center"><FontAwesomeIcon className="block m-auto top-auto h-1/2" icon={faApplePay} /></div>
                <div className="bg-zinc-100 rounded h-16 w-1/3 flex items-center"><FontAwesomeIcon className="block m-auto top-auto h-1/2" icon={faGooglePay} /></div>
            </div>

            <span className="w-full text-center mt-4">or pay using credit card</span>
            <div className="pt-4 w-5/6 flex flex-col gap-4">
                <div className="flex flex-col">
                    <span className="text-sm font-light text-gray-600">Card Holder Full Name</span>
                    <input className="bg-zinc-100 rounded py-2 px-4" type="text" placeholder="Enter your full name" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-light text-gray-600">Card Number</span>
                    <input className="bg-zinc-100 rounded py-2 px-4" type="text" placeholder="0000 0000 0000 0000" />
                </div>
                <div className="flex flex-col">
                    <span className="text-sm font-light text-gray-600">Expiry Date / CVV</span>

                    <div className="grid grid-cols-2 grid-rows-1 gap-4">
                        <input className="bg-zinc-100 rounded py-2 px-4" type="text" placeholder="Expiry Date" />
                        <input className="bg-zinc-100 rounded py-2 px-4" type="text" placeholder="CVV" />
                    </div>

                </div>
            </div>
            <Link className="w-5/6" href={'/order_status'}>
                <Button className="bg-zinc-800 text-slate-50 w-full h-full mt-4 p-4 rounded-lg ">Checkout</Button>
            </Link>
        </div>
    </>
}

function ItemQuantity(props: { order: Order }) {
    const orderStore = useOrderStore();

    return (
        <div className="flex flex-row items-center">
            <Button className="mx-2" onClick={() => orderStore.subtract(props.order)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
            </Button>
            <span>{props.order.quantity}</span>
            <Button className="mx-2" onClick={() => orderStore.add(props.order)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </Button>
        </div>
    )
}
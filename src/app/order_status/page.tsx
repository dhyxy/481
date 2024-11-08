'use client'
import Nav from "@/components/Nav";
import { Order, useOrderStore } from "@/services/order";
import { Button } from "@headlessui/react";
import Link from "next/link";

export default function OrderStatusPage() {
    const orderState = useOrderStore();

    return <>
        <Nav />
        <div className="h-fit w-screen flex flex-col mt-4 items-center">
            <div className="w-5/6 bg-zinc-100 flex flex-col h-5/6 rounded p-6">
                <h2 className="text-center font-thin text-2xl mb-4">Your Orders</h2>
                <div className="">
                    {orderState.orderSummary.orders.map(ord => {
                        return <OrderStatus order={ord} key={ord.item.name} />
                    })}
                </div>
            </div>
        </div>
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
            <Link href="/request_service">
                <Button className="transition-colors bg-zinc-900 px-3 py-2 hover:bg-zinc-600 text-slate-200 font-bold rounded-full shadow-lg">
                    Request Service
                </Button>
            </Link>
        </div>
    </>
}

function OrderStatus(props: { order: Order }) {
    const timeLeft = getRandomInt(20);
    return <div className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50">
        <div className="px-6 py-4 flex flex-col">
            <div className="font-bold text-xl mb-2">Entrees</div>
            <p className="text-gray-700 text-base font-bold">
                Est Time Left: {timeLeft} min
            </p>
            <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-1 bg-slate-700 rounded"></div>
                </div>
                <span className="bottom-2">preparing</span>
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-1 bg-slate-700 rounded"></div>
                </div>
            </div>
            <span>Order ID: 123123</span>
            <span className="text-xl">{props.order.item.name}</span>
        </div>

    </div>
}

function getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
}
'use client';

import { Button, Description, Dialog, DialogPanel, DialogTitle, Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { Item } from "../services/menu";
import { useState } from "react";
import { useOrderStore } from "@/services/order";
import Image from 'next/image';

interface CardProps {
    item: Item
}
export default function (props: CardProps) {
    const [showModal, setShowModal] = useState(false);
    const AddItemModal = (props: { item: Item }) => {
        const orderStore = useOrderStore();
        const modifications = props.item.modifications;
        const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
        return <Dialog open={showModal} onClose={() => setShowModal(false)} className={'relative z-50'}>
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <DialogPanel className="space-y-4 bg-slate-100 px-6 py-4 flex flex-col rounded shadow w-full h-[90%]">
                    <DialogTitle className="font-bold text-xl">{props.item.name}</DialogTitle>
                    <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains" />
                    <Description>
                        {props.item.description}
                    </Description>
                    <span className="inline-block py-1 text-md font-bold text-gray-700">${props.item.price.toFixed(2)}</span>
                    {props.item.isVegetarian && <div className="inline-block"><span className=" bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">V</span></div>}
                    {
                        props.item.options.map(opt => {
                            return <div key={opt.choices.join(',')}>
                                <span>Make selection below <span className="text-semibold">(required)</span></span>
                                <select
                                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer">
                                    {opt.choices.map(choice => <option value={choice} key={choice}>{choice}</option>)}
                                </select>
                            </div>
                        })
                    }
                    {props.item.modifications && (
                        <div className="py-6">
                            <Listbox value={selectedAddOns} onChange={setSelectedAddOns} multiple>
                                <ListboxButton className={'w-full text-left bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md appearance-none cursor-pointer'}>
                                    {selectedAddOns.join(', ') || <span className="text-zinc-800">select modifications</span>}
                                </ListboxButton>
                                <ListboxOptions className={'w-full'}>
                                    {modifications.map((mod) => (
                                        <ListboxOption key={mod} value={mod} className="data-[focus]:bg-blue-100 bg-slate-200 w-full rounded py-1">
                                            {mod}
                                        </ListboxOption>
                                    ))}
                                </ListboxOptions>
                            </Listbox>
                        </div>
                    )}
                    <Button className="my-2 py-1 bg-slate-200 transition-colors hover:bg-slate-500 text-gray-700 font-bold rounded shadow" onClick={() => {
                        orderStore.add({ item: props.item, quantity: 1 });
                        setShowModal(false)
                    }}>
                        Add to order
                    </Button>
                </DialogPanel>
            </div>
        </Dialog>
    }

    return (
        <>
            <AddItemModal item={props.item} />
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4 flex flex-col">
                    {props.item.image && <Image src={props.item.image} className="w-full h-48" alt="image" />}
                    <div className="font-bold text-xl mb-2">{props.item.name}</div>
                    <p className="text-gray-700 text-base">
                        {props.item.description}
                    </p>
                    <span className="inline-block py-1 text-md font-bold text-gray-700">${props.item.price.toFixed(2)}</span>
                    <Button className="my-2 py-1 bg-slate-200 transition-colors hover:bg-slate-500 text-gray-700 font-bold rounded shadow" onClick={() => setShowModal(true)}>
                        Add to order
                    </Button>
                </div>
            </div>
        </>
    )
}
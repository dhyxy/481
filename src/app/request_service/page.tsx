'use client'

import Nav from "@/components/Nav";
import { REQUESTS } from "@/services/requests";
import { Button, Field, Label, Select } from "@headlessui/react";
import { useState } from "react";

export default function () {
    const [selectedService, setSelectedService] = useState(REQUESTS[0]);
    return <>
        <Nav />
        <div className="h-screen bg-zinc-100 w-screen flex flex-col pt-4 items-center">
            <div className="w-5/6 bg-zinc-50 flex flex-col h-5/6 rounded p-6 shadow gap-6">
                <h2 className="text-center font-thin text-2xl">Request Service</h2>
                <Field className={'flex flex-col'}>
                    <Label>Service</Label>
                    <Select name="service" value={selectedService.name} onChange={e => setSelectedService(REQUESTS.find(r => r.name === e.target.value) || selectedService)}>
                        {REQUESTS.map(req => <option value={req.name} key={req.name}>{req.name}</option>)}
                    </Select>
                </Field>
                {selectedService.options && <Field className={'flex flex-col'}>
                    <Label>Select {selectedService.options.name}</Label>
                    <Select name="service">
                        {selectedService.options.choices.map(req => <option value={req} key={req}>{req}</option>)}
                    </Select>
                </Field>}
                <Button className={'bg-zinc-800 rounded text-slate-50 py-2 shadow'}>Submit</Button>
            </div>
        </div >
    </>
}

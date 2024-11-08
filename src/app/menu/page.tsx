import { MENU } from "@/services/menu"
import { REQUESTS } from "@/services/requests"
import { Button } from "@headlessui/react"
import Link from "next/link"

export default function () {
    return <>
        <div className="h-screen m-4 flex flex-col">
            <Link className="ml-auto" href={'/'}>
                <Button className="text-zinc-900 text-3xl" >X</Button>
            </Link>

            <div className="flex flex-col m-4 justify-between h-full">
                <Link href={'/order'}>
                    <span className="text-2xl">MY ORDER</span>
                </Link>
                <div className="flex flex-col">
                    <Link className='mb-4' href={'/'}>
                        <span className="text-2xl">MENU</span>
                    </Link>
                    <div className="ml-12 flex flex-col gap-4">
                        {MENU.map(course => {
                            return <Link key={course.name.toUpperCase()} href={`/#${course.name}`}><span className="text-xl" >{course.name.toUpperCase()}</span></Link>
                        })}
                    </div>
                </div>
                <div className="flex flex-col pb-4">
                    <Link href={'/request_service'}>
                        <span className="text-2xl mb-4">REQUEST WAITSTAFF</span>
                    </Link>
                    <div className="ml-12 flex flex-col gap-4">
                        {REQUESTS.map(request => {
                            return <Link href="/request_service" key={request.name}><span className="text-xl" key={request.name.toUpperCase()}>{request.name.toUpperCase()}</span></Link>
                        })}
                    </div>
                </div>
            </div>
        </div>
    </>
}
'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";


export default function Nav() {
    const pathname = usePathname()
    const pageName = pathname.slice(1).split("_").join(" ").toUpperCase() || "MENU"
    return <>
        <nav className="bg-zinc-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-6">
                <Link href={'/menu'}>
                    <div className="tham tham-e-squeeze tham-w-6">
                        <div className="tham-box">
                            <div className="tham-inner bg-slate-50"></div>
                        </div>
                    </div>
                </Link>
                <span className="text-slate-50 font-bold text-2xl">{pageName}</span>
                <span className="text-slate-100 font-semibold">Table #1</span>
            </div>
        </nav>
    </>
}



import { MENU } from "../services/menu";
import Card from "./Card";
import Nav from "@/components/Nav";
import Link from "next/link";
import { Button } from "@headlessui/react";

export default function Home() {
  return (
    <>
      <Nav />
      <Menu />
    </>
  );
}


function Menu() {
  return <section className="grid gap-6 p-8 justify-center">
    {MENU.map(course => {
      return (
        <div className="m-2" key={course.name}>
          <span id={course.name} className="text-3xl font-thin">{course.name}</span>
          <ul>
            {course.items.map(item => {
              return <Card item={item} key={item.name} />
            })}
          </ul>
        </div>
      )
    })}
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
      <Link href="/order">
        <Button className="transition-colors bg-zinc-900 px-3 py-2 hover:bg-zinc-600 text-slate-200 font-bold rounded-full shadow-lg">
          View Order
        </Button>
      </Link>
    </div>
  </section>
}
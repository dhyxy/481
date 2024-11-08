import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Lasagna from '@/img/lasagna.jpeg'
import LavaCake from '@/img/lavacake.webp'
import Margarita from '@/img/margarita.jpg'
import Pancake from '@/img/pancake.jpg'
import Pizza from '@/img/pizza.jpg'

export interface Course {
    name: string;
    items: Item[];
}

export interface Item {
    name: string;
    image?: StaticImport;
    description: string;
    price: number;
    options: Option[];
    modifications: string[];
    isVegetarian?: boolean;
}

export interface Option {
    choices: string[];
}

export const MENU: Course[] = [
    {
        name: "Breakfast",
        items: [
            {
                name: "Pancakes",
                image: Pancake,
                description: "Fluffy pancakes served with maple syrup and butter",
                isVegetarian: true,
                price: 8.0,
                options: [{ choices: ["Bacon", "Sausage", "Hashbrowns"] }],
                modifications: ["Extra Syrup", "Extra Butter"]
            }
        ]
    },
    {
        name: "Lunch",
        items: [
            {
                name: "Pizza",
                image: Pizza,
                description: "Cheesy, saucy pizza served with parmesan and chilli flakes",
                price: 12.0,
                options: [{ choices: ['Cheese', "Pepperoni", "Hawaiian"] }],
                modifications: ["Extra Sauce", "Extra Cheese"]
            }
        ]
    },
    {
        name: "Dinner",
        items: [{
            name: "Lasagna",
            image: Lasagna,
            description: "Cheesy, fragrant italian cuisine",
            price: 18.0,
            options: [],
            modifications: ["No cheese"]
        }]
    },
    {
        name: "Drinks",
        items: [{
            name: "Margarita",
            image: Margarita,
            description: "Give me one margarita ima open my",
            price: 12.0,
            options: [],
            modifications: []
        }]
    },
    {
        name: "Deserts",
        items: [
            {
                name: "Hot Lava Cake",
                image: LavaCake,
                description: "Fudgy, chewy",
                price: 8.0,
                options: [],
                modifications: [],
            }
        ]
    },
    {
        name: "🍦 Happy Hour 🫶",
        items: [
            {
                name: "Margarita",
                image: Margarita,
                description: "Give me one margarita ima open my",
                price: 6.0,
                options: [],
                modifications: []
            }
        ]
    }
]
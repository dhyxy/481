export interface Request {
    name: string;
    options?: RequestOption;
}

interface RequestOption {
    name: string;
    choices: string[];
}

export const REQUESTS: Request[] = [
    {
        name: "Refill Beverage"
    },
    {
        name: "Extra Napkins"
    },
    {
        name: "Cutlery",
        options: { name: "Cutlery Type", choices: ["Fork", "Knife", "Spoon"] }
    },
    {
        name: "Call Server"
    }
]

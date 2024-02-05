"use server"

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";


export type State={
    errors?:{
        title ?:string[];
    },
    message?:string | null; 
}

const createBoard = z.object({
    title: z.string().min(3, {message:"Minimum length of 3 characters"})
})

export async function create(prevState:State, formData: FormData) {

    const { title } = createBoard.parse({
        title: formData.get("title")
    })

    await db.board.create({
        data: {
            title
        }
    })

    revalidatePath("/organization/org_2ZzqmagkrUUll30x2A3jEXzuBNH")
}
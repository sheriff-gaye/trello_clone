"use server"

import { z } from "zod";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

const createBoard = z.object({
    title: z.string()

})

export async function create(formData: FormData) {

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
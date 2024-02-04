"use server"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache";

export async function deleteBoard(id: number) {
    await db.board.delete({
        where: {
            id
        }
    });

    revalidatePath("/organization/org_2ZzqmagkrUUll30x2A3jEXzuBNH")
}
"use server"
import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { CreateList } from "./schema";
import { createSafeAction } from "@/lib/create-safe-action";


const handler = async (data: InputType): Promise<ReturnType> => {

    const { userId, orgId } = auth();

    if (!orgId || !userId) {
        return {
            error: "Unauthorized"
        }
    }

    const { title, boardId } = data
    let list;

    try {

        const baord = await db.board.findUnique({
            where: {
                id: boardId,
                orgId
            }
        });

        if (!baord) {
            return {
                error: "Board Not Found"
            }
        }


        const lastList = await db.list.findFirst({
            where: { boardId: boardId },
            orderBy: { order: "desc" },
            select: { order: true }
        });


        const newOrder = lastList ? lastList.order + 1 : 1;


        list = await db.list.create({
            data: {
                title,
                boardId,
                order: newOrder

            }
        });

    } catch (error) {
        return {
            error: "Failed to Create List"
        }

    }

    revalidatePath(`/board/${boardId}`);
    return { data: list };
}

export const createList = createSafeAction(CreateList, handler);
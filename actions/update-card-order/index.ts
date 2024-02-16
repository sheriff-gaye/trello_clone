"use server"

import { auth } from "@clerk/nextjs";
import { InputType, ReturnType } from "./types"
import { revalidatePath } from "next/cache";
import { createSafeAction } from "@/lib/create-safe-action";
import { UpdateCardOrder } from "./schema";
import { db } from "@/lib/db";


const handler = async (data: InputType): Promise<ReturnType> => {

    const { userId, orgId } = auth();

    if (!userId || !orgId) {
        return {
            error: "Unauthorized"
        }
    }

    const { items, boardId } = data;
    let updateCards;

    try {
        const transactions = items.map((card) => (
            db.card.update({
                where: {
                    id: card.id,
                    list: {
                        boardId,
                        board: {
                            orgId
                        }
                    }
                },
                data: {
                    order: card.order,
                    listId: card.listId
                }
            })
        ));

        updateCards = await db.$transaction(transactions);



    } catch (error) {
        return {
            error: "Failed to Update Card Order"
        }

    }

    revalidatePath(`/board/${boardId}`)

    return { data: updateCards }

}

export const updateCardOrder = createSafeAction(UpdateCardOrder, handler)
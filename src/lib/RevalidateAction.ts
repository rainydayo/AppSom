'use server'

import { revalidatePath } from "next/cache"

const ServerActionRevalidate = async () => {
    revalidatePath("/board");
}

export default ServerActionRevalidate;
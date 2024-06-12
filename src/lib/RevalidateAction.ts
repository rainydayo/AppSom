'use server'

import { revalidatePath } from "next/cache"

const ServerActionRevalidate = async (path: string) => {
    revalidatePath(path);
}

export default ServerActionRevalidate;
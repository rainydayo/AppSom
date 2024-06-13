export default async function DeleteListById (lid: string, bid: string) {
    const response = await fetch (`/api/delete-list`, {
        method: "DELETE",
        body: JSON.stringify({
            lid: lid,
            bid: bid
        })
    });

    if(!response.ok) {
        throw new Error("Cannot Delete");
    }
}
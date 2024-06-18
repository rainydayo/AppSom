export default async function RemoveMember (uid: string, bid: string) {
    const response = await fetch(`/api/remove-member`, {
        method: "DELETE",
        body: JSON.stringify({
            uid: uid,
            bid: bid
        })
    });
    if(!response.ok) {
        throw new Error("Cannot remove member");
    }
}
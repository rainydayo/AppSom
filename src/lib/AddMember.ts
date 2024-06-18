export default async function AddMember (uid: string, bid: string) {
    const response = await fetch(`/api/add-member`, {
        method: "PUT",
        body: JSON.stringify({
            uid: uid,
            bid: bid
        })
    });
    if(!response.ok) {
        throw new Error("Cannot add member");
    }
}
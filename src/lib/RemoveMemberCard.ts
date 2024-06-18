export default async function RemoveMemberCard (uid: string, bid: string, lid: string, cid: string) {
    const response = await fetch(`/api/remove-member-card`, {
        method: "DELETE",
        body: JSON.stringify({
            uid: uid,
            bid: bid,
            lid: lid,
            cid: cid
        })
    });
    if(!response.ok) {
        throw new Error("Cannot remove member");
    }
}
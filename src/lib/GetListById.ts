import { ListJSON } from "../../interface";

export default async function GetListById (lid: string) {
    const file = await fetch(`/Storage/List/list.json`,
    {
        headers: {
        'Content-Type': 'application/json'
        },
        next: {
            tags: ["list"]
        }
    }
    );
    const data: ListJSON = await file.json();
    const list = data.data.find(l => l.id === lid);
    return list;
}
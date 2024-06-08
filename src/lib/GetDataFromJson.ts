import { headers } from "next/headers";

export default async function GetDataFromJson (path: string) {
    const file = await fetch(`${path}`,
        {headers: {
            'Content-Type': 'application/json'
        }}
    );
    const data = await file.json();
    return data;
}
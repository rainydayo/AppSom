'use client'
import GetDataFromJson from "@/lib/GetDataFromJson"
import { JSONData, Sample } from "../../../interface";
import { useEffect, useState } from "react";

export default function HelloPage () {

    const [data, setData] = useState<JSONData | null>();
    useEffect(() => {
        async function fetchData() {
            const data:JSONData = await GetDataFromJson('mockjson/data.json');
            setData(data); 
        }
        fetchData();
    }, []);

    return (
        <main>
            <div>
                <h1>Hello Welcome</h1>
                {
                    data?.data.map((sample: Sample) => 
                        <div>
                            <h1>{sample.name}</h1>
                            <h2>{sample.field}</h2>
                            <h3>{sample.food}</h3>
                        </div>
                    )
                }
            </div>
        </main>
    )
}
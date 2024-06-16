"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "../../../interface";

interface AddCardPopupProps {
    listId: string;
    onClose: () => void;
    onSave: (newCard: Card) => void;
}

const AddCardPopup: React.FC<AddCardPopupProps> = ({ listId, onClose, onSave }) => {
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [dateStart, setDateStart] = useState<string>("");
    const [dateEnd, setDateEnd] = useState<string>("");
    const [color, setColor] = useState<string>("#orange");
    const popupRef = useRef<HTMLDivElement>(null);

    const handleSave = () => {
        if (!name || !description || !dateStart || !dateEnd) {
            alert("Please input Card full detail");
            return;
        }
        const newCard: Card = {
            id: crypto.randomUUID(),
            name,
            description,
            date_start: dateStart,
            date_end: dateEnd,
            color,
            member: [],
            list: listId,
        };
        onSave(newCard);
        onClose();
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={popupRef} className="bg-white p-5 rounded shadow-lg w-96">
                <h2 className="text-xl font-bold mb-5 text-center text-black">Add New Card</h2>
                <input
                    type="text"
                    placeholder="Card Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mb-3 p-2 border rounded border-gray-500 text-black"
                />
                <textarea
                    placeholder="Card Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full mb-3 p-2 border rounded border-gray-500 text-black"
                />
                <div className="flex justify-between mb-3">
                    <input
                        type="date"
                        value={dateStart}
                        onChange={(e) => setDateStart(e.target.value)}
                        className="w-1/2 mr-1 p-2 border rounded border-gray-500 text-black"
                    />
                    <input
                        type="date"
                        value={dateEnd}
                        onChange={(e) => setDateEnd(e.target.value)}
                        className="w-1/2 ml-1 p-2 border rounded border-gray-500 text-black"
                    />
                </div>
                <div className="flex justify-center space-x-2 mb-3">
                    {['orange', 'green', 'blue', 'purple', 'gray'].map((clr) => (
                        <button
                            key={clr}
                            onClick={() => setColor(clr)}
                            className={`w-10 h-10 rounded-full ${clr === color ? 'border-2 border-black' : ''}`}
                            style={{ backgroundColor: clr }}
                        />
                    ))}
                </div>
                <div className="flex justify-center space-x-3">
                    <button
                        onClick={handleSave}
                        className="bg-orange-500 text-white p-2 px-10 font-bold rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddCardPopup;

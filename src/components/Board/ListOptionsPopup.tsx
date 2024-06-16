import React, { useEffect, useRef } from "react";

interface ListOptionsPopupProps {
    onClose: () => void;
    onView: () => void;
    onEdit: () => void;
    onAddCard: () => void;
    onDelete: () => void;
}

const ListOptionsPopup: React.FC<ListOptionsPopupProps> = ({ onClose, onView, onEdit, onAddCard, onDelete }) => {
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div ref={popupRef} className="absolute top-10 right-10 bg-white border rounded shadow-md z-10 w-36">
            <button className="block w-full text-left p-2 hover:bg-gray-200" onClick={onView}>
                View
            </button>
            <button className="block w-full text-left p-2 hover:bg-gray-200" onClick={onEdit}>
                Edit
            </button>
            <button className="block w-full text-left p-2 hover:bg-gray-200" onClick={onAddCard}>
                Add Card
            </button>
            <button className="block w-full text-left p-2 hover:bg-gray-200" onClick={onDelete}>
                Delete
            </button>
        </div>
    );
};

export default ListOptionsPopup;

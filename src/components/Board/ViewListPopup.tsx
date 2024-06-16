import { useRef, useEffect } from 'react';

interface ViewListPopupProps {
    onClose: () => void;
    listName: string;
    listDescription: string;
}

const ViewListPopup: React.FC<ViewListPopupProps> = ({ onClose, listName, listDescription }) => {
    const popupRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div ref={popupRef} className="bg-white p-5 rounded shadow-lg w-96">
                <div className="mb-3 font-bold text-3xl">{listName}</div>
                <div className="mb-3 text-xl text-wrap">{listDescription}</div>
            </div>
        </div>
    );
};

export default ViewListPopup;

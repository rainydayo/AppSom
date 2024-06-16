// ViewCardPopup.tsx

import { useRef, useEffect } from 'react';

interface ViewCardPopupProps {
    onClose: () => void;
    cardName: string;
    cardDescription: string;
    cardColor:string;
}

const ViewCardPopup: React.FC<ViewCardPopupProps> = ({ onClose, cardName, cardDescription , cardColor}) => {
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
                <div className='flex flex-row justify-between items-center mb-3'>
                    <div className="font-bold text-3xl">{cardName}</div>
                    <div className={`w-28 h-8 bg-${cardColor}-500 rounded-3xl`}></div>
                </div>
                
                <div className="mb-3 text-xl text-wrap">{cardDescription}</div>
            </div>
        </div>
    );
};

export default ViewCardPopup;

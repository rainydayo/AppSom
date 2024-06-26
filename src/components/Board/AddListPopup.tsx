import { useState, useRef, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface AddListPopupProps {
    onClose: () => void;
    onSave: (name: string, description: string) => void;
}

const AddListPopup: React.FC<AddListPopupProps> = ({ onClose, onSave }) => {
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const popupRef = useRef<HTMLDivElement>(null);

    const handleSave = () => {
        if (!name || !description) {
            toast.error('Please fill in all the List detail', {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        toast.success('Add List Success', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        onSave(name, description);
        onClose();
    };

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
                <h2 className="text-xl font-bold mb-5 text-center">Add a New List</h2>
                <input
                    type="text"
                    placeholder="List Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full mb-3 p-2 border rounded border-gray-500"
                />
                <input
                    type="text"
                    placeholder="List Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full mb-3 p-2 border rounded border-gray-500"
                />
                <div className="flex justify-center space-x-3">
                    <button onClick={handleSave} className="bg-orange-500 text-white p-2 px-10 font-bold rounded">Add</button>
                </div>
            </div>
        </div>
    );
};

export default AddListPopup;

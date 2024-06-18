import { useState, useEffect, useRef } from 'react';
import { Card, List, Board, User, UserJSON, BoardJSON } from '../../../interface';
import GetUserProfile from '@/lib/GetUserProfile';
import UpdateCardById from '@/lib/UpdateCardById';
import GetBoards from '@/lib/GetBoards';

interface ViewCardPopupProps {
    onClose: () => void;
    card: Card;
}

const ViewCardPopup: React.FC<ViewCardPopupProps> = ({ onClose, card }) => {
    const [list, setList] = useState<List | null>(null);
    const [board, setBoard] = useState<Board | null>(null);
    const [members, setMembers] = useState<User[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const popupRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            const data: BoardJSON = await GetBoards();

            let foundList: List | null = null;
            let foundBoard: Board | null = null;

            for (const board of data.data) {
                const list = board.lists.find((list) => list.id === card.list);
                if (list) {
                    foundList = list;
                    foundBoard = board;
                    break;
                }
            }

            if (foundList && foundBoard) {
                setList(foundList);
                setBoard(foundBoard);

                const memberProfiles = await Promise.all(
                    card.member.map((userId) => GetUserProfile(userId))
                );
                setMembers(memberProfiles);
            }
        };

        fetchData();
    }, [card]);

    const handleSearch = async (username: string) => {
        const response = await fetch('/Storage/User/user.json', {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error('Cannot get user profile');
        }
        const userJson: UserJSON = await response.json();
        const user: User[] = userJson.data.filter(u => 
            u.username.toLowerCase().includes(username.toLowerCase()) && 
            board && board.member.includes(u.id) && 
            !card.member.includes(u.id)
        );
        setSearchResults(user);
    };

    const handleAddMember = async (user: User) => {
        const updatedCard = { ...card, member: [...card.member, user.id] };
        await UpdateCardById(updatedCard, card.id, card.list, board?.id || '');
        setMembers([...members, user]);
        setSearchResults([]);
        setSearchTerm('');
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

    if (!board || !list) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div ref={popupRef} className="bg-white p-5 rounded shadow-lg w-96 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                >
                    &times;
                </button>
                <div className="flex flex-row justify-between items-center mb-3">
                    <div className="font-bold text-3xl">{card.name}</div>
                    <div
                        className="w-28 h-8 rounded-3xl"
                        style={{ backgroundColor: card.color }}
                    ></div>
                </div>
                <div className="mb-3 text-xl">{card.description}</div>
                <div className="mb-3">
                    <strong>Start Date:</strong> {new Date(card.date_start).toLocaleDateString()}
                </div>
                <div className="mb-3">
                    <strong>End Date:</strong> {new Date(card.date_end).toLocaleDateString()}
                </div>
                <div className="mb-3">
                    <strong>Members:</strong>
                    <ul className="mb-3">
                        {members.map(member => (
                            <li key={member.id} className="flex items-center mb-2">
                                <img src={member.image} alt={member.name} className="w-8 h-8 rounded-full mr-2" />
                                <span>{member.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <input
                    type="text"
                    placeholder="Search username..."
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        handleSearch(e.target.value);
                    }}
                    className="w-full mb-3 p-2 border rounded border-gray-500"
                />
                <ul className="mb-3">
                    {searchResults.map(user => (
                        <li key={user.id} className="flex items-center mb-2">
                            <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full mr-2" />
                            <span>{user.name}</span>
                            <button
                                onClick={() => handleAddMember(user)}
                                className="ml-auto bg-blue-500 text-white p-2 rounded"
                            >
                                Add
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ViewCardPopup;

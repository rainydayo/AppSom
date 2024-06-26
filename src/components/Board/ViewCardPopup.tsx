import { useState, useEffect, useRef } from 'react';
import { Card, List, Board, User, UserJSON, BoardJSON } from '../../../interface';
import GetUserProfile from '@/lib/GetUserProfile';
import GetBoards from '@/lib/GetBoards';
import AddMemberCard from '@/lib/AddMemberCard';
import RemoveMemberCard from '@/lib/RemoveMemberCard';

interface ViewCardPopupProps {
    onClose: () => void;
    cid: string;
    lid: string;
}

const ViewCardPopup: React.FC<ViewCardPopupProps> = ({ onClose, cid, lid }) => {
    const [card, setCard] = useState<Card | null>();
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
                const list = board.lists.find((list) => list.id === lid);
                if (list) {
                    foundList = list;
                    foundBoard = board;
                    break;
                }
            }

            if (foundList && foundBoard) {
                setList(foundList);
                setBoard(foundBoard);

                const cardData = foundList.cards.find(c => c.id === cid);
                if (cardData) {
                    setCard(cardData);
                    const memberProfiles = await Promise.all(
                    cardData.member.map((userId) => GetUserProfile(userId)));
                    setMembers(memberProfiles);
                }
                
            }
        };

        fetchData();
    }, []);

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

    if (!board || !list || !card) {
        return null;
    }

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
        await AddMemberCard(user.id, board.id, list.id, card.id);
        setMembers([...members, user]);
        setCard({ ...card, member: [...card.member, user.id]});
        setSearchResults([]);
        setSearchTerm('');
    };

    const handleRemoveMember = async (uid: string) => {
        await RemoveMemberCard(uid, board.id, list.id, card.id);
        setMembers(members.filter(u => u.id != uid));
        setCard({ ...card, member: card.member.filter(m => m != uid)});
        setSearchResults([]);
        setSearchTerm('');
    }


    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div ref={popupRef} className="bg-white p-5 rounded shadow-lg w-96 relative">
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
            </div>
        </div>
    );
};

export default ViewCardPopup;

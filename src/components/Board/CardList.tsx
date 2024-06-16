import { useEffect, useState } from "react";
import { Card, List } from "../../../interface";
import { Droppable, Draggable } from "react-beautiful-dnd";
import CardOptionsPopup from "./CardOptionsPopup";
import ViewCardPopup from "./ViewCardPopup";

interface CardListProps {
    list: List;
    onEditCard: (card: Card) => void;
    onAddCard: (listId: string) => void;
}

export default function CardList({ list, onEditCard, onAddCard }: CardListProps) {
    const [cards, setCards] = useState<Card[]>(list.cards);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupPosition, setPopupPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);
    const [viewPopupVisible, setViewPopupVisible] = useState(false);

    useEffect(() => {
        setCards(list.cards);
    }, [list.cards]);

    const handleCardClick = (card: Card, event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPopupPosition({ 
            top: rect.top - window.scrollY - rect.height, 
            left: rect.left - window.scrollX - rect.width
        });
        setSelectedCard(card);
        setPopupVisible(true);
    };

    const handleClosePopup = () => {
        setPopupVisible(false);
    };

    const handleView = () => {
        setViewPopupVisible(true);
        handleClosePopup();
    };

    const handleCloseViewPopup = () => {
        setViewPopupVisible(false);
    };

    const handleEdit = () => {
        if (selectedCard) {
            onEditCard(selectedCard);
        }
        handleClosePopup();
    };

    const handleAddCard = () => {
        onAddCard(list.id);
        handleClosePopup();
    };

    const handleDelete = () => {
        console.log("Delete card:", selectedCard);
        handleClosePopup();
    };

    return (
        <Droppable droppableId={list.id} type="card">
            {(provided) => (
                <div
                    className="flex flex-col items-start gap-2"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                >
                    {cards.map((c, index) => (
                        <Draggable key={c.id} draggableId={c.id} index={index}>
                            {(provided) => (
                                <div
                                    className="bg-white shadow-lg w-full px-3 py-2 rounded flex flex-row items-center gap-2 "
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    ref={provided.innerRef}
                                    onClick={(event) => handleCardClick(c, event)}
                                >
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: c.color }}
                                    ></div>
                                    <h1 className="font-semibold text-md">{c.name}</h1>
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                    <button onClick={() => onAddCard(list.id)}>
                        <h1 className="font-semibold text-lg">+ Add a Card</h1>
                    </button>
                    {popupVisible && selectedCard && (
                        <CardOptionsPopup
                            onClose={handleClosePopup}
                            onView={handleView}
                            onEdit={handleEdit}
                            onAddCard={handleAddCard}
                            onDelete={handleDelete}
                            position={popupPosition}
                        />
                    )}
                    {viewPopupVisible && selectedCard && (
                        <ViewCardPopup
                            onClose={handleCloseViewPopup}
                            cardName={selectedCard.name}
                            cardDescription={selectedCard.description || ""}
                            cardColor={selectedCard.color}
                        />
                    )}
                </div>
            )}
        </Droppable>
    );
}

import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { Settings, Trash, Copy } from 'lucide-react';

const ItemType = 'FIELD';

const DraggableFormField = ({ id, index, type, label, placeholder, moveField }) => {
    const ref = useRef(null);

    const [, drop] = useDrop({
        accept: ItemType,
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }

            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveField(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: ItemType,
        item: { id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <div ref={ref} className={`flex items-center border rounded p-2 my-2 bg-white relative ${isDragging ? 'opacity-50' : ''}`}>
            <div className="flex items-center space-x-2 w-full">
                <div className="p-2 bg-gray-100 rounded">
                    {type === 'text' ? <span>abc</span> : null}
                    {/* Ajouter d'autres types d'icônes ici */}
                </div>
                <div className="flex-grow">
                    <div className="font-semibold">{label}</div>
                    <div className="text-gray-500 italic">{placeholder}</div>
                </div>
                <div className="absolute right-0 flex items-center space-x-2 p-2">
                    <Settings className="w-5 h-5 text-gray-600 cursor-pointer" />
                    <Trash className="w-5 h-5 text-red-600 cursor-pointer" />
                    <Copy className="w-5 h-5 text-blue-600 cursor-pointer" />
                </div>
            </div>
        </div>
    );
};

export default DraggableFormField;

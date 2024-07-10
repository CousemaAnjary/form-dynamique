import React from 'react';
import FormContainer from '@/components/FormContainer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function NewForm() {
    return (
        <DndProvider backend={HTML5Backend}>
            <FormContainer />
        </DndProvider>
    );
}

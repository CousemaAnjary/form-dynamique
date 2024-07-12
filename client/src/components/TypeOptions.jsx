import React from 'react';
import { Button } from "@/components/ui/button";
import { Text, Mail, KeyRound, Radio, ListTodo, TextSelect, File, Calendar } from 'lucide-react';
import { TbNumber123 } from "react-icons/tb";

export default function TypeOptions({ onSelectType }) {
    const types = [
        { label: 'Text', icon: <Text className="w-5 h-5" />, type: 'text' },
        { label: 'Email', icon: <Mail className="w-5 h-5" />, type: 'email' },
        { label: 'Password', icon: <KeyRound className="w-5 h-5" />, type: 'password' },
        { label: 'Radio', icon: <Radio className="w-5 h-5" />, type: 'radio' },
        { label: 'Checkbox', icon: <ListTodo className="w-5 h-5" />, type: 'checkbox' },
        { label: 'Select', icon: <TextSelect className="w-5 h-5" />, type: 'select' },
        { label: 'File', icon: <File className="w-5 h-5" />, type: 'file' },
        { label: 'Date', icon: <Calendar className="w-5 h-5" />, type: 'date' },
        { label: 'Number', icon: <TbNumber123 className="w-5 h-5" />, type: 'number' },
    ];

    return (
        <div className="border rounded p-4 bg-white ">
            <div className="grid grid-cols-3 gap-4">
                {types.map((item) => (
                    <Button
                        key={item.type}
                        variant="ghost"
                        className="flex items-center space-x-2"
                        onClick={() => onSelectType(item.type)}
                    >
                        {item.icon} <span>{item.label}</span>
                    </Button>
                ))}
            </div>
        </div>
    );
}

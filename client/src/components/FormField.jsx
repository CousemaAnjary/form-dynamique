import React from 'react';
import { Trash, Settings, Copy } from 'lucide-react';
import { Text, Mail, KeyRound, Radio, ListTodo, TextSelect, File, Calendar } from 'lucide-react';
import { TbNumber123 } from "react-icons/tb";

const iconMap = {
    text: <Text className="w-5 h-5" />,
    email: <Mail className="w-5 h-5" />,
    password: <KeyRound className="w-5 h-5" />,
    radio: <Radio className="w-5 h-5" />,
    checkbox: <ListTodo className="w-5 h-5" />,
    select: <TextSelect className="w-5 h-5" />,
    file: <File className="w-5 h-5" />,
    date: <Calendar className="w-5 h-5" />,
    number: <TbNumber123 className="w-5 h-5" />,
};

export default function FormField({ type, label, placeholder }) {
    return (
        <div className="flex items-center border rounded p-2 my-2 bg-white relative">
            <div className="flex items-center space-x-2 w-full">
                <div className="p-2 bg-gray-100 rounded">
                    {iconMap[type] || <Text className="w-5 h-5" />}
                </div>
                <div className="flex-grow">
                    <div className="font-semibold">{label}</div>
                    <div className="text-gray-500 italic">{placeholder}</div>
                </div>
                <div className="flex items-center space-x-2">
                    <Settings className="w-5 h-5 text-gray-600 cursor-pointer" />
                    <Trash className="w-5 h-5 text-red-600 cursor-pointer" />
                    <Copy className="w-5 h-5 text-blue-600 cursor-pointer" />
                </div>
            </div>
        </div>
    );
}

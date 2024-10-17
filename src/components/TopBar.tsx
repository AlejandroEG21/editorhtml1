import React from 'react';
import { Plus, Type, Image, Hash } from 'lucide-react';

interface TopBarProps {
  addComponent: (type: string) => void;
}

const TopBar: React.FC<TopBarProps> = ({ addComponent }) => {
  return (
    <div className="bg-white shadow-md p-4">
      <div className="flex justify-center space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-600 transition-colors"
          onClick={() => addComponent('text')}
        >
          <Type size={20} className="mr-2" /> Texto
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-600 transition-colors"
          onClick={() => addComponent('image')}
        >
          <Image size={20} className="mr-2" /> Imagen
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center hover:bg-yellow-600 transition-colors"
          onClick={() => addComponent('number')}
        >
          <Hash size={20} className="mr-2" /> Número
        </button>
      </div>
    </div>
  );
};

export default TopBar;
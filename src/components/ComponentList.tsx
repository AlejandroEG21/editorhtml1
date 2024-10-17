import React from 'react';
import { Plus } from 'lucide-react';
import { Component } from '../types';

interface ComponentListProps {
  addComponent: (type: string) => void;
  components: Component[];
  setSelectedComponent: (component: Component) => void;
}

const ComponentList: React.FC<ComponentListProps> = ({ addComponent, components, setSelectedComponent }) => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Componentes</h2>
      <div className="flex space-x-2 mb-4">
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded flex items-center"
          onClick={() => addComponent('text')}
        >
          <Plus size={16} className="mr-1" /> Texto
        </button>
        <button
          className="bg-green-500 text-white px-2 py-1 rounded flex items-center"
          onClick={() => addComponent('image')}
        >
          <Plus size={16} className="mr-1" /> Imagen
        </button>
        <button
          className="bg-yellow-500 text-white px-2 py-1 rounded flex items-center"
          onClick={() => addComponent('number')}
        >
          <Plus size={16} className="mr-1" /> Número
        </button>
      </div>
      <ul>
        {components.map((component) => (
          <li
            key={component.id}
            className="cursor-pointer hover:bg-gray-100 p-2 rounded"
            onClick={() => setSelectedComponent(component)}
          >
            {component.type} - {component.content.substring(0, 20)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComponentList;
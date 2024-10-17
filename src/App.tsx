import React, { useState } from 'react';
import TopBar from './components/TopBar';
import Editor from './components/Editor';
import Preview from './components/Preview';
import { Component, WebProperties } from './types';

function App() {
  const [components, setComponents] = useState<Component[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<Component | null>(null);
  const [webProperties, setWebProperties] = useState<WebProperties>({
    backgroundColor: '#ffffff',
    textColor: '#000000',
    backgroundShape: 'none',
    shapeColor: '#e0e0e0',
  });

  const addComponent = (type: string) => {
    const newComponent: Component = {
      id: Date.now(),
      type,
      content: type === 'text' ? 'Nuevo texto' : type === 'image' ? '' : '0',
      position: { x: 0, y: 0 },
      size: { width: 100, height: 100 },
    };
    setComponents([...components, newComponent]);
  };

  const updateComponent = (updatedComponent: Component) => {
    setComponents(components.map(c => c.id === updatedComponent.id ? updatedComponent : c));
    setSelectedComponent(updatedComponent);
  };

  const updateWebProperties = (newProperties: Partial<WebProperties>) => {
    setWebProperties({ ...webProperties, ...newProperties });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <TopBar addComponent={addComponent} />
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/4 bg-white shadow-lg z-10">
          <Editor
            selectedComponent={selectedComponent}
            updateComponent={updateComponent}
            webProperties={webProperties}
            updateWebProperties={updateWebProperties}
          />
        </div>
        <div className="flex-1 p-4">
          <Preview
            components={components}
            selectedComponent={selectedComponent}
            setSelectedComponent={setSelectedComponent}
            updateComponent={updateComponent}
            webProperties={webProperties}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
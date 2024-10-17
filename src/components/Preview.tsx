import React from 'react';
import { Component, WebProperties } from '../types';

interface PreviewProps {
  components: Component[];
  selectedComponent: Component | null;
  setSelectedComponent: (component: Component) => void;
  updateComponent: (component: Component) => void;
  webProperties: WebProperties;
}

const Preview: React.FC<PreviewProps> = ({
  components,
  selectedComponent,
  setSelectedComponent,
  updateComponent,
  webProperties,
}) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, component: Component) => {
    e.dataTransfer.setData('text/plain', component.id.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const componentId = parseInt(e.dataTransfer.getData('text'), 10);
    const component = components.find((c) => c.id === componentId);
    if (component) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      updateComponent({
        ...component,
        position: { x, y },
      });
    }
  };

  const renderBackgroundShape = () => {
    const shapeStyle = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: webProperties.shapeColor,
      opacity: 0.5,
    };

    switch (webProperties.backgroundShape) {
      case 'circle':
        return <div style={{ ...shapeStyle, width: '300px', height: '300px', borderRadius: '50%' }} />;
      case 'square':
        return <div style={{ ...shapeStyle, width: '300px', height: '300px' }} />;
      case 'triangle':
        return (
          <div
            style={{
              ...shapeStyle,
              width: 0,
              height: 0,
              borderLeft: '150px solid transparent',
              borderRight: '150px solid transparent',
              borderBottom: `300px solid ${webProperties.shapeColor}`,
              backgroundColor: 'transparent',
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="w-full h-full rounded-lg shadow-inner relative overflow-hidden"
      style={{ backgroundColor: webProperties.backgroundColor }}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {renderBackgroundShape()}
      {components.map((component) => (
        <div
          key={component.id}
          style={{
            position: 'absolute',
            left: `${component.position.x}px`,
            top: `${component.position.y}px`,
            width: `${component.size.width}px`,
            height: `${component.size.height}px`,
            border: component === selectedComponent ? '2px solid blue' : '1px solid gray',
            borderRadius: '4px',
            padding: '4px',
            cursor: 'move',
            backgroundColor: 'white',
            boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
            color: webProperties.textColor,
          }}
          onClick={() => setSelectedComponent(component)}
          draggable
          onDragStart={(e) => handleDragStart(e, component)}
        >
          {component.type === 'text' && <p className="text-sm">{component.content}</p>}
          {component.type === 'image' && (
            <img src={component.content} alt="Component" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '2px' }} />
          )}
          {component.type === 'number' && <span className="text-sm font-medium">{component.content}</span>}
        </div>
      ))}
    </div>
  );
};

export default Preview;
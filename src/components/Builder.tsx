import React, { useCallback, useState } from 'react';
import { useBuilder } from '../hooks/useBuilder';
import { Component } from '@/types/builder';
import { Button, ButtonProps } from './Button';
import { Navbar, NavbarProps } from './Navbar';
import { Header, HeaderProps } from './Header';
import GridDistortion, { GridDistortionProps } from './GridDistortion';
import { NavbarDark, NavbarDarkProps } from './NavbarDark';
import { BottomNavbar, BottomNavbarProps } from './BottomNavbar';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import StarBorder from './StarBorder';
import type { StarBorderProps } from './StarBorder';

interface BuilderProps {
  availableComponents: Component[];
}

type ComponentProps = ButtonProps | NavbarProps | HeaderProps | NavbarDarkProps | GridDistortionProps | BottomNavbarProps | StarBorderProps;

const ComponentPreview: React.FC<{ component: Component }> = ({ component }) => {
  const defaultProps: Record<string, ComponentProps> = {
    Button: { text: 'Preview Button', variant: 'primary', size: 'md' },
    Navbar: { 
      title: 'Preview Navbar',
      variant: 'light',
      position: 'static',
      links: [
        { label: 'Home', href: '#' },
        { label: 'About', href: '#' },
      ]
    },
    NavbarDark: {
      title: 'Preview Navbar',
      position: 'static',
      links: [
        { label: 'Home', href: '#' },
        { label: 'About', href: '#' },
      ]
    },
    Header: { 
      title: 'Preview Header',
      textColor: 'light',
      height: 'md'
    },
    GridDistortion: { 
      imageSrc: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=1000&auto=format&fit=crop',
      grid: 15,
      mouse: 0.1,
      strength: 0.15,
      relaxation: 0.9
    },
    BottomNavbar: {
      activeTab: 'home',
      onTabChange: () => {},
    },
    StarBorder: {
      children: 'Star Border Button',
      color: '#007bff',
      speed: '6s',
    },
  };

  const props = { ...defaultProps[component.type], ...component.props } as ComponentProps;

  switch (component.type) {
    case 'Button':
      return <Button {...(props as ButtonProps)} />;
    case 'Navbar':
      return <Navbar {...(props as NavbarProps)} />;
    case 'NavbarDark':
      return <NavbarDark {...(props as NavbarDarkProps)} />;
    case 'Header':
      return <Header {...(props as HeaderProps)} />;
    case 'GridDistortion':
      return <GridDistortion {...(props as GridDistortionProps)} />;
    case 'BottomNavbar':
      return <BottomNavbar {...(props as BottomNavbarProps)} />;
    case 'StarBorder':
      return <StarBorder {...(props as StarBorderProps)} />;
    default:
      return <div>{component.name}</div>;
  }
};

export const Builder: React.FC<BuilderProps> = ({ availableComponents }) => {
  const { state, addComponent, removeComponent, selectComponent, moveComponent } = useBuilder();
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const [draggedComponent, setDraggedComponent] = useState<Component | null>(null);

  const handleDragStart = useCallback(
    (e: React.DragEvent, component: Component) => {
      e.dataTransfer.setData('component', JSON.stringify(component));
      setDraggedComponent(component);
    },
    []
  );

  const handleDrop = useCallback(
    (e: React.DragEvent, dropZoneId: string) => {
      e.preventDefault();
      const componentData = e.dataTransfer.getData('component');
      if (componentData) {
        const component = JSON.parse(componentData);
        addComponent(component, dropZoneId);
      }
      setDraggedComponent(null);
    },
    [addComponent]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const handleMoveUp = useCallback((componentId: string) => {
    moveComponent(componentId, 'up');
  }, [moveComponent]);

  const handleMoveDown = useCallback((componentId: string) => {
    moveComponent(componentId, 'down');
  }, [moveComponent]);

  const getComponentCode = (component: Component) => {
    const props = { ...component.props };
    const propString = Object.entries(props)
      .map(([key, value]) => {
        if (typeof value === 'string') {
          return `${key}="${value}"`;
        }
        if (typeof value === 'object') {
          return `${key}={${JSON.stringify(value, null, 2)}}`;
        }
        return `${key}={${value}}`;
      })
      .join('\n  ');

    return `import ${component.type} from './components/${component.type}';\n\nconst MyComponent = () => {\n  return (\n    <${component.type}\n      ${propString}\n    />\n  );\n};\n\nexport default MyComponent;`;
  };

  const handleShowCode = (componentId: string) => {
    setSelectedComponentId(componentId);
  };

  const handleRemoveComponent = (componentId: string) => {
    removeComponent(componentId);
    if (selectedComponentId === componentId) {
      setSelectedComponentId(null);
    }
  };

  const getSelectedComponent = () => {
    if (!selectedComponentId) return null;
    return state.dropZones
      .flatMap((zone) => zone.children)
      .find((comp) => comp.id === selectedComponentId) || null;
  };

  return (
    <div className="flex h-screen">
      {/* Components Panel */}
      <div className="w-64 p-4 bg-gray-100">
        <h2 className="text-lg font-semibold mb-4">Components</h2>
        <div className="space-y-2">
          {availableComponents.map((component) => (
            <div
              key={component.id}
              draggable
              onDragStart={(e) => handleDragStart(e, component)}
              className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 cursor-move hover:shadow-md hover:border-blue-500 transition-all"
            >
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="font-medium text-gray-700">{component.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Builder Canvas */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="p-2 bg-gray-100 border-b flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsPreviewMode(!isPreviewMode)}
              className={`px-3 py-1 rounded ${
                isPreviewMode
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              {isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
            </button>
          </div>
        </div>

        <div className="flex-1 p-4 bg-white overflow-auto">
          <div
            className={`min-h-full ${
              isPreviewMode ? '' : 'border-2 border-dashed border-gray-300'
            } rounded p-4`}
            onDrop={(e) => {
              handleDrop(e, 'root');
              setSelectedComponentId(null);
            }}
            onDragOver={handleDragOver}
          >
            <div className="w-full">
              {state.dropZones.map((zone) => (
                <div key={zone.id} className="w-full">
                  {zone.children.map((component) => (
                    <div
                      key={component.id}
                      className={`w-full relative group ${
                        isPreviewMode ? '' : 'hover:bg-gray-50'
                      }`}
                    >
                      <div className="relative">
                        {!isPreviewMode && (
                          <div className="absolute right-2 top-2 z-[100]">
                            <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg p-1 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => handleRemoveComponent(component.id)}
                                className="p-1.5 text-red-500 rounded-full hover:bg-red-50"
                                title="Delete component"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleMoveUp(component.id)}
                                className="p-1.5 text-gray-700 rounded-full hover:bg-gray-50"
                                title="Move up"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 15l7-7 7 7"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleMoveDown(component.id)}
                                className="p-1.5 text-gray-700 rounded-full hover:bg-gray-50"
                                title="Move down"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                              </button>
                              <button
                                onClick={() => handleShowCode(component.id)}
                                className={`p-1.5 rounded-full ${
                                  selectedComponentId === component.id
                                    ? 'bg-blue-50 text-blue-500'
                                    : 'text-gray-700 hover:bg-gray-50'
                                }`}
                                title="Show code"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                  />
                                </svg>
                              </button>
                            </div>
                          </div>
                        )}
                        <ComponentPreview component={component} />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Code Preview Panel */}
      <div className="w-96 p-4 bg-gray-100 border-l">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Code Preview</h2>
          {selectedComponentId && (
            <button
              onClick={() => setSelectedComponentId(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        {selectedComponentId ? (
          <div className="rounded-lg overflow-hidden bg-gray-900">
            <div className="p-4">
              <pre className="text-sm text-gray-300 font-mono whitespace-pre-wrap">
                {getComponentCode(getSelectedComponent()!)}
              </pre>
            </div>
          </div>
        ) : (
          <div className="text-center text-gray-500 py-8">
            <svg
              className="w-12 h-12 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
            <p>Click the code icon on any component to view its code</p>
          </div>
        )}
      </div>
    </div>
  );
}; 
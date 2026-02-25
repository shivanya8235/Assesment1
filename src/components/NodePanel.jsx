 import React from 'react';
import { MessageSquare } from 'lucide-react';

/**
 * NodesPanel - Sidebar panel displaying available node types.
 * Nodes can be dragged from here onto the canvas.
 */

// Define available node types - extend this array to add new node types easily
const nodeTypes = [
  {
    type: 'textNode',
    label: 'Message',
    icon: MessageSquare,
    description: 'Send a text message',
  },
  // To add more types later, just uncomment and import the icons:
  // { type: 'imageNode', label: 'Image', icon: ImageIcon, description: 'Send an image' },
];

const NodesPanel = () => {
  /**
   * Handle drag start - sets the node type as drag data
   * Removed TypeScript 'DragEvent' type for standard JSX/JS.
   */
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="p-4 bg-white h-full border-l border-gray-200">
      <h3 className="text-sm font-semibold text-gray-900 mb-1">Nodes</h3>
      <p className="text-xs text-gray-500 mb-6">
        Drag and drop nodes onto the canvas
      </p>

      <div className="grid grid-cols-1 gap-3">
        {nodeTypes.map((node) => (
          <div
            key={node.type}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-md border-2 border-blue-500 bg-white 
                       cursor-grab active:cursor-grabbing hover:bg-blue-50 
                       transition-all duration-200 group"
            draggable
            onDragStart={(e) => onDragStart(e, node.type)}
          >
            <node.icon size={20} className="text-blue-500" />
            <span className="text-xs font-medium text-blue-500">{node.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodesPanel;
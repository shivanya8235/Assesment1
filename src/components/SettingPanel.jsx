import React from 'react';
import { ArrowLeft } from 'lucide-react';

/**
 * SettingsPanel - Replaces the Nodes Panel when a node is selected.
 * Allows editing the text content of the selected Text Node.
 */

const SettingsPanel = ({ selectedNode, onTextChange, onBack }) => {
  // In JSX, we just access the data directly
  const nodeData = selectedNode?.data || {};

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Panel header with back button */}
      <div className="flex items-center gap-4 p-3 border-b border-gray-200">
        <button
          onClick={onBack}
          className="p-1 rounded hover:bg-gray-100 transition-colors"
          aria-label="Go back to nodes panel"
        >
          <ArrowLeft size={16} className="text-gray-600" />
        </button>
        <span className="text-sm font-semibold text-gray-700 uppercase tracking-tight">
          Message
        </span>
      </div>

      {/* Text editing area */}
      <div className="p-4 border-b border-gray-200">
        <label
          htmlFor="node-text"
          className="block text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider"
        >
          Text
        </label>
        <textarea
          id="node-text"
          className="w-full min-h-[100px] p-3 text-sm rounded-md border border-gray-300 
                     bg-white text-gray-800 resize-none focus:outline-none 
                     focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all"
          value={nodeData.label || ''}
          onChange={(e) => onTextChange(selectedNode.id, e.target.value)}
          placeholder="Enter your message..."
          autoFocus
        />
      </div>
      
      {/* Visual divider to separate content from the rest of the sidebar */}
      <div className="flex-1 bg-gray-50/50"></div>
    </div>
  );
};

export default SettingsPanel;
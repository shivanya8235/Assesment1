import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { MessageSquare } from 'lucide-react';

/**
 * TextNode - A custom node for the chatbot flow.
 * Logic:
 * - Left Handle (Target): Receives connections.
 * - Right Handle (Source): Originates connections (Limit to 1 in the main flow component).
 */

const TextNode = ({ data, selected }) => {
  return (
    <div className={`min-w-[200px] shadow-md rounded-md bg-white border-2 transition-all ${
      selected ? 'border-blue-500 ring-1 ring-blue-500' : 'border-gray-200'
    }`}>
      
      {/* Target handle - Left side */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
        className="w-3 h-3 border-2 border-white"
      />

      {/* Node Header */}
      <div className="flex items-center justify-between px-3 py-1 bg-teal-100 rounded-t-sm">
        <div className="flex items-center gap-2">
          <MessageSquare size={12} className="text-gray-700" />
          <span className="text-[10px] font-bold uppercase tracking-wide text-gray-800">
            Send Message
          </span>
        </div>
        {/* Small WhatsApp-style icon placeholder */}
        <div className="bg-white rounded-full p-0.5">
           <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
      </div>

      {/* Node Body */}
      <div className="p-3 text-sm text-gray-600 bg-white rounded-b-md break-words">
        {data.label || 'New message...'}
      </div>

      {/* Source handle - Right side */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555' }}
        className="w-3 h-3 border-2 border-white"
      />
    </div>
  );
};

export default memo(TextNode);
import { useCallback, useRef, useState } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  addEdge,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css"; // Ensure the styles are imported!

import TextNode from "./TextNode";

import SettingsPanel from "./SettingPanel";
import NodesPanel from "./NodePanel";
import Navbar from "./Navbar";

/**
 * Custom node types registry - maps node type strings to React components.
 */
const nodeTypes = {
  textNode: TextNode,
};

// Counter for generating unique node IDs
let nodeId = 0;
const getId = () => `node_${nodeId++}`;

const FlowBuilder = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null);

  /**
   * Handle new edge connections.
   * Logic: only one edge can originate from a source handle.
   */
  const onConnect = useCallback(
    (params) => {
      // Enforce: Source handle can only have ONE outgoing edge
      const sourceHasEdge = edges.some(
        (edge) =>
          edge.source === params.source &&
          edge.sourceHandle === params.sourceHandle,
      );

      if (sourceHasEdge) {
        toast.error("Source handle can only have one outgoing edge");
        return;
      }

      setEdges((eds) => addEdge({ ...params, animated: true }, eds));
    },
    [edges, setEdges],
  );

  /**
   * Handle node selection
   */
  const onNodeClick = useCallback((_, node) => {
    setSelectedNode(node);
  }, []);

  /**
   * Handle clicking on empty canvas - deselects the current node
   */
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  /**
   * Drag Over handler for DND
   */
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  /**
   * Handle dropping a node onto the canvas
   */
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData("application/reactflow");
      if (!type || !reactFlowInstance || !reactFlowWrapper.current) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `test message ${nodeId}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes],
  );

  /**
   * Syncs text updates from SettingsPanel to the node's state
   */
  const onTextChange = useCallback(
    (id, text) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === id
            ? { ...node, data: { ...node.data, label: text } }
            : node,
        ),
      );
      // Update selectedNode state so the sidebar stays in sync
      setSelectedNode((prev) =>
        prev && prev.id === id
          ? { ...prev, data: { ...prev.data, label: text } }
          : prev,
      );
    },
    [setNodes],
  );

  /**
   * Save validation logic
   */
  const onSave = useCallback(() => {
    if (nodes.length === 0) return;

    // Condition: More than one node and more than one node has no target edges
    const nodesWithTargetEdges = new Set(edges.map((edge) => edge.target));
    const nodesWithEmptyTargets = nodes.filter(
      (node) => !nodesWithTargetEdges.has(node.id),
    );

    if (nodes.length > 1 && nodesWithEmptyTargets.length > 1) {
      toast.error("Cannot save: More than one node has an empty target handle");
    } else {
      toast.success("Flow saved successfully!");
    }
  }, [nodes, edges]);

  return (
    <div className="flex flex-col h-screen w-full bg-gray-50">
      {/* Navbar Section */}
      <Navbar onSave={onSave} />

      {/* Main Builder Area */}
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 relative" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Controls />
            <Background
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1}
              color="#cbd5e1"
            />
          </ReactFlow>
        </div>

        {/* Conditional Sidebar */}
        <aside className="w-80 border-l border-gray-200 bg-white shadow-md flex-shrink-0">
          {selectedNode ? (
            <SettingsPanel
              selectedNode={selectedNode}
              onTextChange={onTextChange}
              onBack={() => setSelectedNode(null)}
            />
          ) : (
            <NodesPanel />
          )}
        </aside>
      </div>
    </div>
  );
};

export default FlowBuilder;

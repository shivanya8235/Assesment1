<div align="center" >
<h1>Bite-Flow</h1>
</div>

## Table of content

- [About](#about)
- [Tech Used](#🛠️-tech-used)
- [Live Link](#🚀-live-link)
- [Features](#🧑‍💻-features)
- [Getting Started](#⚛️-getting-started)

## About

A drag-and-drop chatbot flow builder built with React and React Flow. This application allows users to create messaging sequences by connecting text nodes, editing their content, and validating the flow structure.

## 🛠️ Tech Used

- ReactJs(vite)
- Tailwind CSS
- Rect-router-dom
- lucid-icons
- React-Flow

## 🚀 Live Link

- [Bite-Flow](https://assesment1-liart.vercel.app/)

## 🧑‍💻 Features

### 1. Drag-and-Drop Node Creation

- Drag a **Message Node** from the Nodes Panel on the right and drop it onto the canvas to add a new text message to your flow.

### 2. Node Customization (Settings Panel)

- **Selection Logic:** Clicking on a node in the flow builder automatically replaces the Nodes Panel with a **Settings Panel**.
- **Real-time Editing:** Edit the text content of the selected node. The change is reflected instantly on the canvas.
- **Back Button:** Easily navigate back to the Nodes Panel to add more messages.

### 3. Edge & Connection Rules

- **Source Handles:** Can only have **one** outgoing edge originating from them.
- **Target Handles:** Can accept **multiple** incoming edges.
- This ensures a controlled, logical flow for the chatbot.

### 4. Flow Validation & Saving

- Clicking the **Save** button triggers a validation check.
- **Error Condition:** If there is more than one node in the workspace, and more than one node has an empty target handle (unconnected incoming port), a "Cannot Save Flow" error message appears.
- **Success:** If the flow is properly connected, a success notification is shown.

---

## 📁 Folder Structure

```text
src/
├── components/
│   ├── FlowBuilder.js    # Main workspace logic
│   ├── NodesPanel.js     # Draggable node source
│   ├── SettingsPanel.js  # Node editing interface
│   └── CustomNode.js     # Custom React Flow Text Node
├── hooks/
│   └── useValidation.js  # Logic for Save button validation
├── App.js                # Root application
└── index.css             # Layout and UI styling
```

## ⚛️ Getting Started

- Clone the repository on your local machine with the command below in your terminal and cd into **Bite-Flow** folder.

```sh
git clone https://github.com/shivanya8235/Assesment1.git

cd  Assesment1
```

- Install dependencies (if you are using **yarn** do with that)

```sh
npm install
```

- Start the server 🔥

```sh
npm start
```

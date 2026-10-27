
import { useState } from "react";
import ChatSidebar from "../components/chat/ChatSidebar";
import ChatHeader from "../components/chat/ChatHeader";
import SuggestedPrompts from "../components/chat/SuggestedPrompts";
import MessageList from "../components/chat/MessageList";
import MessageComposer from "../components/chat/MessageComposer";

const demoMessages = {
  "Understanding MongoDB Indexes":
    "Can you explain MongoDB indexes with a quick example?",
  "React Auth Flow":
    "Can you explain the React auth flow using JWT? Add a quick example.",
  "LangChain Tool Calling":
    "How does tool calling work in LangChain?",
};

export default function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeChat, setActiveChat] = useState("");
  const [userMessage, setUserMessage] = useState("");

  const startNewChat = () => {
    setActiveChat("");
    setUserMessage("");
    setSidebarOpen(false);
  };

  const selectChat = (chatTitle) => {
    setActiveChat(chatTitle);
    setUserMessage(
      demoMessages[chatTitle] ||
        "Can you help me understand this topic?"
    );
  };

  const showDemoConversation = (message) => {
    setActiveChat("New Conversation");
    setUserMessage(message);
  };

  return (
    <div className="flex h-dvh min-h-[500px] overflow-hidden bg-[#f8f9fc] text-gray-900">
      {/* Sidebar: desktop + mobile drawer */}
      <ChatSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onNewChat={startNewChat}
        onSelectChat={selectChat}
        activeChat={activeChat}
      />

      {/* Main chat area */}
      <div className="flex min-w-0 flex-1 flex-col lg:ml-[270px]">
        <ChatHeader
          title={activeChat}
          active={Boolean(activeChat)}
          onMenuClick={() => setSidebarOpen(true)}
        />

        {/* Scrollable content area */}
        <main className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          {activeChat ? (
            <MessageList userMessage={userMessage} />
          ) : (
            <div className="flex min-h-full flex-1 items-center justify-center">
              <SuggestedPrompts
                onSelect={showDemoConversation}
              />
            </div>
          )}
        </main>

        {/* Bottom composer */}
        <MessageComposer
          active={Boolean(activeChat)}
          onDemoSubmit={showDemoConversation}
        />
      </div>
    </div>
  );
}

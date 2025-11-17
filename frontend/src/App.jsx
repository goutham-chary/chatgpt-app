import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { ChatInterface } from "./components/ChatInterface";
import { api } from "./api";

function AppContent() {
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    loadSessions();

    const params = new URLSearchParams(window.location.search);
    const sessionIdFromUrl = params.get("session");

    if (sessionIdFromUrl) {
      setCurrentSessionId(sessionIdFromUrl);
    }
  }, []);

  const loadSessions = async () => {
    try {
      const data = await api.getSessions();
      setSessions(data);
    } catch (error) {
      console.error("Failed to load sessions:", error);
    }
  };

  const handleNewChat = () => {
    setCurrentSessionId(null);
    window.history.pushState({}, "", "/");
    setSidebarOpen(false);
  };

  const handleSelectSession = (sessionId) => {
    setCurrentSessionId(sessionId);
    window.history.pushState({}, "", `?session=${sessionId}`);
    setSidebarOpen(false);
  };

  const handleSessionUpdate = async (newSessionId) => {
    setCurrentSessionId(newSessionId);
    window.history.pushState({}, "", `?session=${newSessionId}`);
    await loadSessions();
  };

  return (
    <div className="h-screen flex flex-col dark:bg-gray-900 bg-white">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          sessions={sessions}
          currentSessionId={currentSessionId}
          onSelectSession={handleSelectSession}
          onNewChat={handleNewChat}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-hidden">
          <ChatInterface
            sessionId={currentSessionId}
            onSessionUpdate={handleSessionUpdate}
          />
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

type SessionData = {
  projects: string[];
  videoCalls: string[];
};

type SessionContextType = {
  sessionData: SessionData;
  addProject: (name: string) => void;
  addVideoCall: (id: string) => void;
};

const defaultValue: SessionData = {
  projects: [],
  videoCalls: [],
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const [sessionData, setSessionData] = useState<SessionData>(defaultValue);

  useEffect(() => {
    if (user?.id) {
      const saved = localStorage.getItem(`session-${user.id}`);
      if (saved) {
        setSessionData(JSON.parse(saved));
      }
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      localStorage.setItem(`session-${user.id}`, JSON.stringify(sessionData));
    }
  }, [sessionData, user?.id]);

  const addProject = (name: string) => {
    setSessionData((prev) => ({
      ...prev,
      projects: [...prev.projects, name],
    }));
  };

  const addVideoCall = (id: string) => {
    setSessionData((prev) => ({
      ...prev,
      videoCalls: [...prev.videoCalls, id],
    }));
  };

  return (
    <SessionContext.Provider value={{ sessionData, addProject, addVideoCall }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionData = () => {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSessionData must be used inside SessionProvider");
  return context;
};

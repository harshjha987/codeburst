"use client"

import React, { useState, useEffect } from 'react';
import  Link from 'next/link'
import {  useNavigate, useLocation } from 'react-router-dom';
import { useRouter } from 'next/navigation';
import {
    MessageSquare,
    Video,
    Users,
    Settings,
    Code2,
    Terminal,
    Share2,
    Mic,
    MicOff,
    Camera,
    CameraOff,
    Monitor,
    Hash,
    Plus,
    Search,
    Send,
    MoreVertical,
    ChevronLeft,
    ChevronRight
  } from 'lucide-react';

  

export default function Dashboard() {
//   const navigate = useNavigate();

const router = useRouter();

  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [activeChannel, setActiveChannel] = useState('general');
  const [message, setMessage] = useState('');
  const [isMainSidebarOpen, setIsMainSidebarOpen] = useState(true);
  const [isChannelSidebarOpen, setIsChannelSidebarOpen] = useState(true);
  const [isVideoSidebarOpen, setIsVideoSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('chat');
  const [messages, setMessages] = useState([
    { id: 1, user: 'Sarah Wilson', content: 'Just pushed the new feature to staging', time: '10:30 AM', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' },
    { id: 2, user: 'John Doe', content: 'Great! I will review it right away', time: '10:32 AM', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg' },
    { id: 3, user: 'Emma Smith', content: 'The CI pipeline is showing some errors', time: '10:35 AM', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' }
  ]);

  const channels = [
    { id: 'general', name: 'General', unread: 2 },
    { id: 'frontend', name: 'Frontend', unread: 0 },
    { id: 'backend', name: 'Backend', unread: 5 },
    { id: 'devops', name: 'DevOps', unread: 0 }
  ];

  const onlineUsers = [
    { id: 1, name: 'Sarah Wilson', status: 'active', avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' },
    { id: 2, name: 'John Doe', status: 'coding', avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg' },
    { id: 3, name: 'Emma Smith', status: 'in-call', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      user: 'You',
      content: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };
  const navigationItems = [
    { id: 'chat', icon: MessageSquare, label: 'Chat' },
    { id: 'team', icon: Users, label: 'Team' },
    { id: 'ide', icon: Terminal, label: 'IDE', path: '/ide' },
    { id: 'share', icon: Share2, label: 'Share' },
  ];

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };
  const handleNavigation = (item: { id: string; path?: string }) => {
    if (item.path) {
      router.push(item.path);
    } else {
      setActiveSection(item.id);
    }
  };

  return (
    <div className="flex h-screen bg-[#1E1E1E]">
      {/* Main Sidebar */}
      <div 
        className={`${isMainSidebarOpen ? 'w-16' : 'w-0'} bg-[#2B2B2B] flex flex-col items-center py-4 space-y-6 transition-all duration-300 relative`}
      >
        <button
          onClick={() => setIsMainSidebarOpen(!isMainSidebarOpen)}
          className="absolute -right-3 top-6 bg-[#2B2B2B] text-white p-1 rounded-full z-50"
        >
          {isMainSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
        </button>
        
        {isMainSidebarOpen && (
          <>
            <Link href ="/" className="text-[#34A85A] hover:text-white transition-colors">
              <Code2 className="w-8 h-8" />
            </Link>
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`text-white hover:text-[#34A85A] transition-colors p-2 rounded-lg ${
                  activeSection === item.id ? 'bg-[#34A85A] text-white' : ''
                }`}
              >
                <item.icon className="w-6 h-6" />
              </button>
            ))}
            <div className="flex-grow" />
            <button className="text-white hover:text-[#34A85A] transition-colors">
              <Settings className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Channels Sidebar */}
      {activeSection === 'chat' && (
        <div className={`${isChannelSidebarOpen ? 'w-64' : 'w-0'} bg-[#2B2B2B] border-r border-[#3E3E3E] transition-all duration-300 overflow-hidden`}>
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-white font-semibold">Channels</h2>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => setIsChannelSidebarOpen(!isChannelSidebarOpen)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="text-gray-400 hover:text-white transition-colors">
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="relative mb-4">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search channels"
                className="w-full bg-[#1E1E1E] text-white pl-10 pr-4 py-2 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#34A85A]"
              />
            </div>
            <div className="space-y-1">
              {channels.map(channel => (
                <button
                  key={channel.id}
                  onClick={() => setActiveChannel(channel.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-colors ${
                    activeChannel === channel.id ? 'bg-[#34A85A] text-white' : 'text-gray-300 hover:bg-[#3E3E3E]'
                  }`}
                >
                  <div className="flex items-center">
                    <Hash className="w-4 h-4 mr-2" />
                    <span>{channel.name}</span>
                  </div>
                  {channel.unread > 0 && (
                    <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {channel.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Online Users */}
          <div className="p-4 border-t border-[#3E3E3E]">
            <h2 className="text-white font-semibold mb-4">Online • {onlineUsers.length}</h2>
            <div className="space-y-3">
              {onlineUsers.map(user => (
                <div key={user.id} className="flex items-center space-x-3">
                  <div className="relative">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#2B2B2B] ${
                      user.status === 'active' ? 'bg-green-500' :
                      user.status === 'coding' ? 'bg-yellow-500' : 'bg-purple-500'
                    }`} />
                  </div>
                  <span className="text-gray-300 text-sm">{user.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Channel Header */}
        <div className="h-16 bg-[#2B2B2B] border-b border-[#3E3E3E] flex items-center justify-between px-6">
          <div className="flex items-center">
            {!isChannelSidebarOpen && (
              <button
                onClick={() => setIsChannelSidebarOpen(true)}
                className="mr-4 text-gray-400 hover:text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
            <Hash className="w-5 h-5 text-gray-400 mr-2" />
            <h2 className="text-white font-semibold">{activeChannel}</h2>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMicOn(!isMicOn)}
              className={`p-2 rounded-full transition-colors ${
                isMicOn ? 'bg-[#34A85A] text-white' : 'bg-red-500 text-white'
              }`}
            >
              {isMicOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setIsCameraOn(!isCameraOn)}
              className={`p-2 rounded-full transition-colors ${
                isCameraOn ? 'bg-[#34A85A] text-white' : 'bg-red-500 text-white'
              }`}
            >
              {isCameraOn ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Monitor className="w-5 h-5" />
            </button>
            <button className="text-gray-400 hover:text-white transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map(msg => (
            <div key={msg.id} className="flex items-start space-x-4">
              <img
                src={msg.avatar}
                alt={msg.user}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-white font-semibold">{msg.user}</span>
                  <span className="text-gray-400 text-sm">{msg.time}</span>
                </div>
                <p className="text-gray-300 mt-1">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 bg-[#2B2B2B] border-t border-[#3E3E3E]">
          <form onSubmit={handleSendMessage} className="flex items-center space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 bg-[#1E1E1E] text-white px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#34A85A]"
            />
            <button
              type="submit"
              className="text-[#34A85A] hover:text-white transition-colors"
              disabled={!message.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Video Call Panel */}
      {activeSection === 'chat' && (
        <div className={`${isVideoSidebarOpen ? 'w-64' : 'w-0'} bg-[#2B2B2B] border-l border-[#3E3E3E] transition-all duration-300 overflow-hidden`}>
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white font-semibold">Video Call</h2>
              <button
                onClick={() => setIsVideoSidebarOpen(!isVideoSidebarOpen)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="aspect-video bg-[#1E1E1E] rounded-lg overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                  alt="Your video"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="aspect-video bg-[#1E1E1E] rounded-lg overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
                    alt="Participant 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-video bg-[#1E1E1E] rounded-lg overflow-hidden">
                  <img
                    src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
                    alt="Participant 2"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import { useChatStore } from "@/store/useChatStore";
import { MessageSkeleton } from "./ui/skeleton";
import { useEffect, useRef } from "react";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";
import { useAuthStore } from "@/store/useAuthStore";
import { formatMessageTime } from "@/lib/utils";

const ChatScreen = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    listenForMessages,
    unlistenForMessages,
  } = useChatStore();

  const { authUser } = useAuthStore();

  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [getMessages, selectedUser._id]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    listenForMessages();
    return () => unlistenForMessages();
  }, [listenForMessages, unlistenForMessages]);

  return (
    <main className="flex-1 overflow-hidden flex flex-col">
      <ChatHeader />
      {isMessagesLoading ? (
        <MessageSkeleton />
      ) : (
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-neutral-800">
          {messages.map((message) => (
            <div
              key={message._id}
              className={`chat ${
                message.senderId === authUser._id ? "chat-end" : "chat-start"
              }`}
              ref={messageEndRef}
            >
              <div className=" chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePicture ||
                          `https://api.dicebear.com/7.x/initials/svg?seed=${authUser.fullName}`
                        : selectedUser.profilePicture ||
                          `https://api.dicebear.com/7.x/initials/svg?seed=${selectedUser.fullName}`
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-bubble flex flex-col">
                {message.text && <p>{message.text}</p>}
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
            </div>
          ))}
        </div>
      )}
      <ChatInput />
    </main>
  );
};

export default ChatScreen;

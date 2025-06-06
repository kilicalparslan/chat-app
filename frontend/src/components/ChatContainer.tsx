import { useChatStore } from "@/store/useChatStore";
import { useEffect } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";
import { useAuthStore } from "@/store/useAuthStore";
import { formatMessageTime } from "@/lib/utils";

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser } =
    useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser?._id, getMessages]);

  if (isMessagesLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isOwnMessage = message.sender === authUser._id;

          return (
            <div
              key={message._id}
              className={`flex items-end gap-2 ${
                isOwnMessage ? "justify-end" : "justify-start"
              }`}
            >
              {!isOwnMessage && (
                <div className="w-10 h-10 rounded-full overflow-hidden border">
                  <img
                    src={selectedUser?.profilePicture || "/avatar.png"}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div
                className={`max-w-xs md:max-w-md px-4 py-2 rounded-xl text-m shadow ${
                  isOwnMessage
                    ? "bg-primary/85 text-foreground rounded-br-none"
                    : "bg-muted text-foreground rounded-bl-none"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
                <time className="block text-[12px] text-foreground/60 text-end mt-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              {isOwnMessage && (
                <div className="w-10 h-10 rounded-full overflow-hidden border">
                  <img
                    src={authUser.profilePicture || "/avatar.png"}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;

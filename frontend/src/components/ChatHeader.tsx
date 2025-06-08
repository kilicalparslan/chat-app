import { useAuthStore } from "@/store/useAuthStore";
import { useChatStore } from "@/store/useChatStore";
import { X } from "lucide-react";
import { Button } from "./ui/button";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedUser) return null;

  return (
    <div className="p-2.5 border-b border-foreground/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.avatar || "/avatar.png"}
                alt={selectedUser.fullName}
              />
              {onlineUsers.includes(selectedUser._id) ? (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              ) : (
                <span className="absolute bottom-0 right-0 size-3 bg-gray-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>
          </div>

          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-foreground/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <Button
          variant="destructive"
          className="cursor-pointer"
          onClick={() => setSelectedUser(null)}
        >
          <X />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;

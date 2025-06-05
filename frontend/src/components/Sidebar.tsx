import { useChatStore } from "@/store/useChatStore";
import { useEffect } from "react";
import SidebarSkeleton from "./SidebarSkeleton";
import { Users } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/useAuthStore";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-72 ml-1 border-r border-secondary/20 bg-secondary/20 flex flex-col transition-all duration-300">
      <div className="border-b p-5 w-full">
        <div className="flex items-center gap-2">
          <Users className="size-6 text-primary" />
          <span className="text-lg font-semibold hidden lg:block">
            Contacts
          </span>
        </div>
      </div>
      <div className=" w-full py-3">
        {users.map((user) => (
          <Button
            key={user._id}
            variant="ghost"
            onClick={() => setSelectedUser(user)}
            className={cn(
              selectedUser?.fullName === user.fullName
                ? "bg-secondary ring-1 ring-muted-foreground/20"
                : "",
              "w-full h-auto flex items-left justify-baseline gap-3 cursor-pointer rounded-none px-3 py-2 transition-colors"
            )}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.avatar || "/avatar.png"}
                alt={user.fullName}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.some((u) => u._id === user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>

            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate text-foreground">
                {user.fullName}
              </div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.some((u) => u._id === user._id)
                  ? "Online"
                  : "Offline"}
              </div>
            </div>
          </Button>
        ))}

        {users.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

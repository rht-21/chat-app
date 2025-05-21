/* eslint-disable @typescript-eslint/no-explicit-any */
import { useChatStore } from "@/store/useChatStore";
import { useEffect } from "react";
import { SidebarSkeleton } from "./ui/skeleton";
import { useAuthStore } from "@/store/useAuthStore";

const Sidebar = () => {
  const { selectedUser, getUsers, users, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-fit md:w-64 lg:w-80 border-r border-neutral-900 flex flex-col transition-all duration-200 p-2">
      <div className="overflow-y-auto w-full space-y-2">
        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full flex px-2 py-1 items-center gap-2 rounded-md
              hover:bg-neutral-900 transition-colors cursor-pointer
              ${
                selectedUser?._id === user._id
                  ? "bg-neutral-900 ring-1 ring-neutral-900"
                  : ""
              }
            `}
          >
            <div className="relative mx-auto md:mx-0">
              <img
                src={
                  user.profilePicture ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${user.fullName}`
                }
                alt={user.fullName}
                className="size-10 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-emerald-700
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            <div className="hidden md:flex flex-col text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <small className="text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </small>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;

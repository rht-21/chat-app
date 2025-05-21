import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { IconX } from "@tabler/icons-react";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="py-3 px-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative overflow-hidden">
              <img
                src={
                  selectedUser.profilePicture ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${selectedUser.fullName}`
                }
                alt={selectedUser.fullName}
              />
            </div>
          </div>

          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-neutral-400">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <button
          className="cursor-pointer"
          onClick={() => setSelectedUser(null)}
        >
          <IconX size={16} stroke={1.5} />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;

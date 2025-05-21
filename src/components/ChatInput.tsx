import { useState, useEffect, useCallback } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Form } from "./ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IconSend2 } from "@tabler/icons-react";
import { Input } from "./ui/input";
import { debounce } from "@/lib/utils";

const messageSchema = z.object({
  text: z.string().min(1),
});

const ChatInput = () => {
  const [text, setText] = useState("");
  const { sendMessage, selectedUser } = useChatStore();
  const { socket, authUser } = useAuthStore();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      text: "",
    },
  });

  const emitTyping = useCallback(
    debounce(() => {
      if (socket && selectedUser) {
        socket.emit("typing", {
          senderId: authUser._id,
          receiverId: selectedUser._id,
        });
      }
    }, 300),
    [socket, selectedUser, authUser]
  );

  const emitStopTyping = useCallback(
    debounce(() => {
      if (socket && selectedUser) {
        socket.emit("stopTyping", {
          senderId: authUser._id,
          receiverId: selectedUser._id,
        });
      }
    }, 1000),
    [socket, selectedUser, authUser]
  );

  useEffect(() => {
    return () => {
      emitTyping.cancel?.();
      emitStopTyping.cancel?.();
    };
  }, [emitTyping, emitStopTyping]);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await sendMessage({ text: text.trim() });
      setText("");

      emitStopTyping();
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    emitTyping();
    emitStopTyping();
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            type="text"
            className="w-full !bg-background !border-none h-16 active:ring-0 focus:ring-0 focus-visible:ring-0 !text-lg"
            placeholder="Type a message..."
            value={text}
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="mr-4 hover:bg-neutral-800 rounded-full p-2 cursor-pointer"
            disabled={!text.trim()}
          >
            <IconSend2 size={22} stroke={1.5} />
          </button>
        </form>
      </Form>
    </div>
  );
};

export default ChatInput;

import { useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Form } from "./ui/form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { IconSend2 } from "@tabler/icons-react";
import { Input } from "./ui/input";

const messageSchema = z.object({
  text: z.string().min(1),
});

const MessageInput = () => {
  const [text, setText] = useState("");
  const { sendMessage } = useChatStore();

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      text: "",
    },
  });

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      await sendMessage({
        text: text.trim(),
      });

      setText("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
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
            onChange={(e) => setText(e.target.value)}
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
export default MessageInput;

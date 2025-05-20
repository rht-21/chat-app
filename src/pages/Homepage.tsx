import ChatScreen from "@/components/ChatScreen";
import HomeScreen from "@/components/HomeScreen";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useChatStore } from "@/store/useChatStore";

const Homepage = () => {
  const { selectedUser } = useChatStore();

  return (
    <main className="flex flex-col h-dvh">
      <Navbar />
      <div className="flex-1 border-t border-neutral-900 overflow-hidden flex items-center justify-center">
        <div className="w-full h-full flex">
          <Sidebar />
          {!selectedUser ? <HomeScreen /> : <ChatScreen />}
        </div>
      </div>
    </main>
  );
};

export default Homepage;

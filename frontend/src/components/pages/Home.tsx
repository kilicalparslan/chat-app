import { useChatStore } from "@/store/useChatStore";
import Sidebar from "../Sidebar";
import NoChat from "../NoChat";
import ChatContainer from "../ChatContainer";

const Home = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen bg-background/20">
      <div className="flex items-center justify-center pt-20 px-4">
        <div className="bg-background/80rounded-lg shadow-xl p-6 max-w-6xl w-full h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!selectedUser ? <NoChat /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

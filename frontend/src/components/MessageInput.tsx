import { useChatStore } from "@/store/useChatStore";
import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { sendMessage, selectedUser } = useChatStore();

  const handleImageSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!text.trim() && !imagePreview) return;

    if (!selectedUser) {
      toast.error("Please select a user to chat with.");
      return;
    }

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
        userId: selectedUser._id,
      });

      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
      toast.error("Message failed to send.");
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <Button
              variant="destructive"
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-foreground/30
              flex items-center justify-center cursor-pointer"
              type="button"
            >
              <X className="size-3" />
            </Button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full bg-input border-foreground/10 rounded-lg input-sm sm:input-md pl-2"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageSelect}
          />
          <Button
            className={`hidden sm:flex cursor-pointer
                     ${imagePreview ? "text-emerald-500" : "text-white"}`}
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </Button>
        </div>
        <Button
          type="submit"
          className="cursor-pointer bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg px-4 py-2"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={20} />
        </Button>
      </form>
    </div>
  );
};

export default MessageInput;

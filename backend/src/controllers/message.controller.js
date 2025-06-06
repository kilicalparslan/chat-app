import Message from "../models/message.model.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const getUsersSidebar = async (req, res) => {
  try {
    const userId = req.user._id;
    const users = await User.find({ _id: { $ne: userId } })
      .select("-password -__v")
      .sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: otherId } = req.params;

    const messages = await Message.find({
      $or: [
        { sender: myId, receiver: otherId },
        { sender: otherId, receiver: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error fetching messages:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const senderId = req.user._id;
    const { id: receiverId } = req.params;
    const { text, image } = req.body;
    let imageUrl;

    if (image) {
      const uploadedImage = await cloudinary.uploader.upload(image);
      imageUrl = uploadedImage.secure_url;
    }

    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      text,
      image: imageUrl,
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error sending message:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

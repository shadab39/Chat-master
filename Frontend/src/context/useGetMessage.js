import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation.js";
import axios from "axios";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessage, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation?._id) return;

      setLoading(true);

      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/message/get/${selectedConversation._id}`,
          {
            withCredentials: true,
          }
        );

        setMessage(res.data);
      } catch (error) {
        console.log("Error in getting messages:", error);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation, setMessage]);

  return { loading, messages };
};

export default useGetMessage;
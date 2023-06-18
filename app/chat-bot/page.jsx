"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const ChatBot = () => {
  const searchParams = useSearchParams();
  const prompt = searchParams.get("prompt");
  const [chatBotAns, setChatBotAns] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchChatBotAns = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/ai", {
          method: "POST",
          body: JSON.stringify({ prompt: prompt.toString() }),
        });
        const result = await response.json();
        console.log({ result });
        setChatBotAns(result.ans);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (prompt) {
      fetchChatBotAns();
    }
  }, [prompt]);
  console.log(chatBotAns);

  return (
    <>
      <div className="prompt_card">
        <h2 className="text-lg">
          <b>Prompt</b> : {prompt}
        </h2>
      </div>
      <div className="prompt_card mt-10">
        <h2 className="text-lg">
          <b>Chat bot ans </b> : {loading ? "Loading..." : chatBotAns}
        </h2>
      </div>
    </>
  );
};

export default ChatBot;

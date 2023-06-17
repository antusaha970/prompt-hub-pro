"use client";

import PromptCard from "@components/PromptCard/PromptCard";
import { useEffect, useState } from "react";

const PromptCardList = ({ data, handleTagClicked }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data?.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClicked={handleTagClicked}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPost(data);
    };
    fetchPosts();
  }, []);

  const handleSearchChange = async (e) => {};

  const handleShowContentWithTag = async (tag) => {};

  return (
    <section className="feed">
      <form className="w-full relative flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={post}
        handleTagClicked={(tag) => handleShowContentWithTag(tag)}
      />
    </section>
  );
};

export default Feed;

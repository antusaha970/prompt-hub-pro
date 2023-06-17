"use client";

import PromptCard from "@components/PromptCard/PromptCard";
import { useDeferredValue, useEffect, useState } from "react";

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
  const query = useDeferredValue(searchText);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPost(data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchPostsByQuery = async () => {
      try {
        const response = await fetch(`/api/prompt/query?searchText=${query}`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (query) {
      fetchPostsByQuery();
    }
  }, [query]);

  const handleSearchChange = async (e) => {
    setSearchText(e.target.value);
  };

  const handleShowContentWithTag = async (tag) => {
    setSearchText(tag);
  };

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

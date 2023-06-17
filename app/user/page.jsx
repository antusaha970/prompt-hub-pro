"use client";

import Profile from "@components/Profile/Profile";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserProfileFromFeed = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [post, setPost] = useState([]);
  const [postLoading, setPostLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setPostLoading(true);
      try {
        const response = await fetch(`/api/user/${id}/posts`);
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error(error);
      } finally {
        setPostLoading(false);
      }
    };
    fetchPosts();
  }, []);
  if (postLoading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <Profile
        name={`${post[0]?.creator?.username.toUpperCase()}`}
        desc={`See ${post[0]?.creator?.username.toUpperCase()}'s prompts `}
        data={post}
      />
    </>
  );
};

export default UserProfileFromFeed;

"use client";

import Profile from "@components/Profile/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [post, setPost] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/user/${session?.user?.id}/posts`);
      const data = await response.json();
      setPost(data);
    };
    if (session?.user.id) {
      fetchPosts();
    }
  }, []);
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };
  const handleDelete = async (postForDelete) => {
    try {
      const hasConfirmed = confirm("Are you sure want to delete it?");
      if (hasConfirmed) {
        await fetch(`/api/prompt/${postForDelete._id.toString()}`, {
          method: "DELETE",
        });

        const updatedPosts = post.filter((p) => p._id !== postForDelete._id);
        setPost(updatedPosts);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Profile
        name="My profile"
        desc="Welcome to your profile"
        data={post}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </>
  );
};

export default UserProfile;

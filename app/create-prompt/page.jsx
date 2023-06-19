"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@components/Form/Form";
import { toast } from "react-toastify";

const CreatePrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status]);
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user?.id,
        }),
      });
      if (response.ok) {
        router.push("/");
        toast.success("Prompt added successfully", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log({ error });
      toast.error("Error while adding prompt", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type="Create"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default CreatePrompt;

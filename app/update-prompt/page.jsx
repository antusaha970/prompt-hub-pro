"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form/Form";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const EditPrompt = () => {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { status } = useSession();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getExistingPrompt = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        const existingPrompt = await response.json();
        setPost({
          prompt: existingPrompt.prompt,
          tag: existingPrompt.tag,
        });
      } catch (error) {
        console.error(error);
      }
    };
    if (promptId) {
      getExistingPrompt();
    }
  }, [promptId]);
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status]);
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const updatePrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    if (!promptId) {
      return alert("Prompt not found");
    }
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
        toast.success("Prompt Edited successfully", {
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
      toast.error(`Can't edit the prompt at this moment`, {
        position: "top-left",
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
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;

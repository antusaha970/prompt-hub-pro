import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET prompt by Id
export const GET = async (req, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response(
        JSON.stringify({
          message: "couldn't find the prompt you are looking for",
        }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: error }), { status: 500 });
  }
};

// PATCH prompt by Id
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();

    const exitingPrompt = await Prompt.findById(params.id);
    if (!exitingPrompt) {
      return new Response(
        JSON.stringify({
          message: "couldn't find the prompt you are looking for",
        }),
        { status: 404 }
      );
    }
    exitingPrompt.prompt = prompt;
    exitingPrompt.tag = tag;
    await exitingPrompt.save();

    return new Response(JSON.stringify(exitingPrompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: error }), { status: 500 });
  }
};

// DELETE by id
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response("successfully deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(error, { status: 500 });
  }
};

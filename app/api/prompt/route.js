import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";
export const revalidate = 60;
export const GET = async (req, res) => {
  try {
    await connectToDB();
    const prompt = await Prompt.find({}).populate("creator");

    return new Response(JSON.stringify(prompt), {
      status: 200,
      revalidate: 60,
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: error }), { status: 500 });
  }
};

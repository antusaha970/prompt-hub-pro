import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";
export const dynamic = "force-dynamic";
export const GET = async (req) => {
  try {
    await connectToDB;
    const params = req.nextUrl.searchParams;
    const searchText = params.get("searchText");
    const prompts = await Prompt.find({
      $or: [
        { tag: { $regex: searchText } },
        { prompt: { $regex: searchText } },
      ],
    }).populate("creator");
    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.log({ error });
    return new Response("Failed to retrieve prompt", error, { status: 500 });
  }
};

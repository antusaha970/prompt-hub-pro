import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export const POST = async (req) => {
  const { prompt } = await req.json();
  try {
    if (prompt) {
      const airResult = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        max_tokens: 500,
        temperature: 0.9,
        presence_penalty: 0,
        frequency_penalty: 0.5,
      });
      const result = airResult.data.choices[0].text?.trim() || "sorry";
      return new Response(JSON.stringify({ ans: result }), { status: 200 });
    } else {
      throw new Error("Prompt is not available");
    }
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 500 });
  }
};

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function generate(text) {
    const prompt = "Generate a podcast between only 2 people discussing the following topic in a json format, around 1 questions and answers :(only speaker and guest and json array will have a simple object one with speaker string and another with guest string) format - {[{speaker-it will be question, guest-it will be answer}]} " + text;

    const result = await model.generateContent(prompt);
    const res = result.response.text();

    console.log(`Generated script: ${res}`);

    var json = res.substring(res.indexOf('['), res.lastIndexOf(']') + 1);

    return json;
}

export { generate }
import OpenAI from "openai";
import React from "react";

const openai = new OpenAI();

export async function convertToSongText(input: string) {
  console.log("Converting...");
  console.time("conversion completed");
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "user",
        content:
          `Transform this into a taylor swift song text in nynorsk : ${JSON.stringify(
            input
          )}`.slice(0, 4000),
      },
    ],
    model: "gpt-3.5-turbo",
  });
  console.timeEnd("conversion completed");
  console.log(JSON.stringify(chatCompletion));
  return chatCompletion.choices[0].message.content;
}

export const cachedConvertTextToSong = React.cache(convertToSongText);

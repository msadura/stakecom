import ky from "ky";
import { z } from "zod";

const LIBRE_TRANSLATE_API_KEY = process.env.LIBRE_TRANSLATE_API_KEY;

if (!LIBRE_TRANSLATE_API_KEY) {
  throw new Error("LIBRE_TRANSLATE_API_KEY var is required");
}

export async function queryLibreTranslate({
  prompt,
  source,
  target,
}: {
  prompt: string;
  source: string;
  target: string;
}) {
  const body = {
    q: prompt,
    source,
    target,
  };

  const res = await ky.post(`https://libretranslate.com/translate`, {
    headers: {
      "Content-Type": "application/json",
    },
    json: body,
  });

  const json = await res.json();

  const data = z.object({ translatedText: z.string() }).parse(json);

  return data.translatedText;
}

import type { Result } from "../types";

export const writeGeneratedKeys = async (
  newKeys: Lowercase<string>[],
): Promise<Result<null>> => {
  try {
    await Bun.write("src/generated/keys.json", JSON.stringify(newKeys));

    return {
      success: true,
      data: null,
    };
  } catch (e) {
    console.error("❗[ERROR] writing keys", e);
    return {
      success: false,
      error: "Could not write keys to file",
    };
  }
};

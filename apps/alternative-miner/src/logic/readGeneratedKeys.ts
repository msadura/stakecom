import type { Result } from "../types";

export const readGeneratedKeys = async (): Promise<
  Result<Lowercase<string>[]>
> => {
  try {
    const file = Bun.file("src/generated/keys.json", {
      type: "application/json",
    });
    const fileContent = await file.text();
    return {
      success: true,
      data: JSON.parse(fileContent) as Lowercase<string>[],
    };
  } catch (e) {
    console.error("❗[ERROR] reading keys", e);
    return {
      success: false,
      error: "Could not read keys file",
    };
  }
};

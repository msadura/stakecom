import type { Result } from "../types";

interface ComeKeyFile {
  data: string;
  encrypted: boolean;
  timestamp: number;
}

export const writeComKey = async (
  comKey: ComeKeyFile,
  comKeyName: Lowercase<string>,
): Promise<Result<string>> => {
  try {
    const fileContent = JSON.stringify(comKey);
    await Bun.write(
      `src/generated/comkeys/${comKeyName}.json`,
      JSON.stringify(comKey),
    );

    return {
      success: true,
      data: fileContent,
    };
  } catch (e) {
    console.error("❗[ERROR] writing com key", e);
    return {
      success: false,
      error: "Could not save com key to file",
    };
  }
};

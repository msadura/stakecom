export const getFileContent = async (filePath: string) => {
  try {
    const file = Bun.file(filePath);
    const content = (await file.json()) as string[];

    return content;
  } catch (e) {
    await Bun.write(filePath, JSON.stringify([]));

    return [];
  }
};

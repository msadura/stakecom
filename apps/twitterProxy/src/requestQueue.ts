import PQueue from "p-queue";

export const queue = new PQueue({ concurrency: 1 });

export const queuedRequest = async (action: () => Promise<any>) => {
  if (queue.size > 0) {
    console.log("⚪ Adding to queue:", queue.size);
  }

  return queue.add(action);
};

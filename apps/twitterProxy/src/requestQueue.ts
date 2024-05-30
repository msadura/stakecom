import PQueue from "p-queue";

export const queue = new PQueue({ concurrency: 1 });

export const queuedRequest = async (action: () => Promise<any>) => {
  return queue.add(action);
};

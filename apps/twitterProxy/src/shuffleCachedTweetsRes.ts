import random from "lodash/random";
import shuffle from "lodash/shuffle";

import type { Tweet, TweetsRes } from "./types";

export function shuffleCachedTweetsRes(cachedRes: TweetsRes) {
  const { data, meta } = cachedRes;
  const shuffledData = shuffle(data);

  const tweets = shuffledData.map(mapTweet);
  const { newestId, oldestId } = getNewestAndOldestId(tweets);
  const nextToken = shuffle(meta.next_token.split("")).join("");

  return {
    data: tweets,
    meta: {
      newest_id: newestId.toString(),
      oldest_id: oldestId.toString(),
      result_count: tweets.length,
      next_token: nextToken,
    },
  };
}

function mapTweet(tweet: Tweet) {
  const idNum = parseInt(tweet.id, 10);

  if (isNaN(idNum)) {
    return tweet;
  }

  const idCustomizer = random(50, 5000);
  const customId =
    idCustomizer < 1000 ? idNum - idCustomizer : idNum + idCustomizer;

  return {
    edit_history_tweet_ids: [customId.toString()],
    id: customId.toString(),
    text: tweet.text,
  };
}

function getNewestAndOldestId(tweets: Tweet[]) {
  const ids = tweets.map((tweet) => parseInt(tweet.id, 10));
  const newestId = Math.max(...ids);
  const oldestId = Math.min(...ids);

  return { newestId, oldestId };
}

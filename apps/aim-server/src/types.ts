export interface Tweet {
  edit_history_tweet_ids: string[];
  id: string;
  text: string;
}

export interface TweetsRes {
  data: Tweet[];
  meta: {
    newest_id: string;
    oldest_id: string;
    result_count: number;
    next_token: string;
  };
}

export interface TwitterError {
  title: string;
  type: string;
  status: number;
  detail: string;
}

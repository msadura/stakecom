export interface TweetsRes {
  data: [];
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

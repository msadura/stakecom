export type ObjectResponse = Record<string, unknown>;

export interface CommuneKey {
  ss58_address: string;
  path: string;
}

export interface CommuneTxResponse {
  success: boolean;
  txHash?: string;
  msg: string;
}

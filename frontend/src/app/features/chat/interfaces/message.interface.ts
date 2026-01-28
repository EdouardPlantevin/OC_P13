export interface MessageInterface {
  content: string;
  times: string;
  owner: boolean;
}

export interface BackendMessage {
  content: string;
  sender: string; // 'USER' ou 'SUPPORT'
  times: string;
}

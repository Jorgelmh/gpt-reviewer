export enum MessageSection {
  CODE = 'code',
  TEXT = 'text'
}

export interface GptResponse {
  message: string
  ok: boolean
}

export interface GptMessageSection {
  id: string
  type: MessageSection
  content: string
}

export interface ReviewResponse {
  prompt: string
  messages: GptMessageSection[]
  language: string
  conversationId?: string
}

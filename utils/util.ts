import { GptMessageSection, MessageSection } from '../types/GptTypes.ts'
import { v1 } from '$std/uuid/mod.ts'

/**
 * Separate code from string and return eberything as a list
 *
 * @param message {string} -> Response from ChatGpt
 */
export const separateCodeFromResponse = (
  message: string,
): { messages: GptMessageSection[]; language: string } => {
  const regex = /```[\w\s]*\n([\s\S]*?)\n```/
  const matches = message.split(regex)
  const language = message.match(/```(\w+)\n/)

  const messages: GptMessageSection[] = matches.map((val, index) => {
    const msgType = (index % 2 === 0)
      ? MessageSection.TEXT
      : MessageSection.CODE
    return {
      id: <string> v1.generate(),
      type: msgType,
      content: val,
    }
  })

  return {
    messages,
    language: (language) ? language[1] : 'N/a',
  }
}

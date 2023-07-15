import { ChatGPTAPI, ChatMessage, SendMessageOptions } from '$chatgpt'
import { OPEN_AI_KEY, MODEL, TEMPERATURE } from '../config/config.ts'
import { GptResponse } from '../types/GptTypes.ts'

export default class GptReviewer {
  private chatGpt: ChatGPTAPI
  private conversationId: string

  constructor(private onProgressMessage: () => void) {
    this.chatGpt = new ChatGPTAPI({
      apiKey: OPEN_AI_KEY,
        completionParams: {
          model: MODEL || 'gpt-4',
          temperature: Number(TEMPERATURE) || 0.5,
        }
    })
  }

  public sendPromp = async (
    message: string,
    options?: SendMessageOptions
  ) : Promise<GptResponse> => {
    try {
      const response = await this.chatGpt.sendMessage(message, options)
      return {
        ok: true,
        message: response.text
      }
    } catch (_) {
      return {
        ok: true,
        message: 'An error has ocurred.'
      }
    }
  }

  /**
   * Generate tests for user code
   * 
   * @param code {string} -> Code solution 
   * @returns A list of tests in string format (Language agnostic)
   */
  public generateTests = async (
    code: string,
  ) : Promise<string[]> => {

  }

  /**
   * Generate a review on provided code
   * 
   * @param code {string} -> Code solution 
   * @param explanation {string} -> Explanation of the code
   * @returns A list of tests in string format (Language agnostic)
  */
  public generateReview = async (
    code: string,
    explanation: string,
  ) : Promise<string[]> => {
  }
}

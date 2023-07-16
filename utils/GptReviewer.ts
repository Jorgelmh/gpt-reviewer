import { ChatGPTAPI, SendMessageOptions } from '$chatgpt'
import { MODEL, OPEN_AI_KEY, TEMPERATURE } from '../config/config.ts'
import { GptResponse, ReviewResponse } from '../types/GptTypes.ts'
import { separateCodeFromResponse } from './util.ts'

export default class GptReviewer {
  private chatGpt: ChatGPTAPI

  constructor(private conversationId?: string) {
    this.chatGpt = new ChatGPTAPI({
      apiKey: OPEN_AI_KEY,
      completionParams: {
        model: MODEL || 'gpt-3.5-turbo',
        temperature: Number(TEMPERATURE) || 0.5,
      },
    })
    this.conversationId = conversationId
  }

  private sendPrompt = async (
    message: string,
    options?: SendMessageOptions,
  ): Promise<GptResponse> => {
    try {
      const response = await this.chatGpt.sendMessage(message, options)
      return {
        ok: true,
        message: response.text,
      }
    } catch (e) {
      console.log(e)
      return {
        ok: true,
        message: 'An error has ocurred.',
      }
    }
  }

  /**
   * Generate tests for user code
   *
   * @param code {string} -> Code solution
   * @returns A list of tests in string format (Language agnostic)
   */
  // deno-lint-ignore require-await
  public generateTests = async (
    code: string,
  ): Promise<string[]> => {
    return new Promise((resolve) => resolve([code]))
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
  ): Promise<ReviewResponse> => {
    const prompt = `Below is a piece of code that ${explanation}, please tell me if it accomplishes what
                    I'm trying to do, flag any bugs and feel free to make suggestions: ${code}`
    const { message } = await this.sendPrompt(prompt)
    const { language, messages } = separateCodeFromResponse(message)

    return {
      prompt,
      messages,
      language,
      conversationId: this.conversationId
    }
  }
}

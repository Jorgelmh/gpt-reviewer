import { assert, assertEquals, assertStringIncludes } from '$std/testing/asserts.ts'
import GptReviewer from '../utils/GptReviewer.ts'
import { separateCodeFromResponse } from '../utils/util.ts'

Deno.test('First test', () => {
  assertEquals(1, 1)
})

Deno.test('Should separate the code and the text messages', () => {
  const gptMessage = "The code is: ```javascript\n const val = 'hello' \n```"
  const { language, messages } = separateCodeFromResponse(gptMessage)

  assertEquals(language, 'javascript')
  assertEquals(messages.length, 3)
})

Deno.test('Should return corrected code to a flawed algorithm', async () => {
  const gpt = new GptReviewer('sadasd')
  const code = `function bubbleSort(arr, n)
  {
     var i, j, temp;
     var swapped;
     for (i = 0; i < n - 1; i++) 
     {
         swapped = false;
         for (j = 0; j < n - i - 1; j++) 
         {
             if (arr[j] < arr[j + 1]) 
             {
                 // Swap arr[j] and arr[j+1]
                 temp = arr[j];
                 arr[j] = arr[j + 1];
                 arr[j + 1] = temp;
                 swapped = true;
             }
         }
   
         // IF no two elements were 
         // swapped by inner loop, then break
         if (swapped == false)
         break;
     }
 }`
  const userExplanation = 'Implements the bubble sort algorithm in JavaScript'
  const review = await gpt.generateReview(code, userExplanation)

  assertStringIncludes(review.prompt, userExplanation)
  assertEquals(review.language, 'javascript')
})

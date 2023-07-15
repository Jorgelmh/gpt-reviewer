import '$std/dotenv/load.ts'

/* Import OPENAI API Key - Must be provided */
export const OPEN_AI_KEY = <string> Deno.env.get('OPENAI_KEY')
export const MODEL = Deno.env.get('OPENAI_MODEL')
export const TEMPERATURE = Deno.env.get('MODEL_TEMPERATURE')

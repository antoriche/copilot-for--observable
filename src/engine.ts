import {
  Configuration,
  OpenAIApi,
  CreateChatCompletionRequest,
  ChatCompletionRequestMessage
} from "openai";
import * as storage from "./storage";

const PREPROMPT =
  `You are ObservableGPT, a GPT-3 powered code completion tool for ObservableHQ.
Your responsability is to help the user write code in ObservableHQ.
` +
  //Here is the content of the notebook :
  //\`\`\`js
  //{NOTEBOOK}
  //\`\`\`
  `

Help the user to complete the following cell :
\`\`\`js
{CURRENT_CELL}`;

export const getCodePrediction = async (
  notebook: string,
  currentCell: string
): Promise<string | null> => {
  const configuration = new Configuration({
    apiKey: (await storage.get("apikey")) || ""
  });
  const openai = new OpenAIApi(configuration);

  const completion = await openai.createCompletion({
    model: "davinci",
    temperature: 0,
    prompt: PREPROMPT.replace("{CURRENT_CELL}", currentCell).replace("{NOTEBOOK}", notebook),
    max_tokens: 100,
    stop: ["```", "\n"]
  });
  return completion.data.choices[0]?.text || null;
};

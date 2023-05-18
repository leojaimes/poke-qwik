import { opeAIKey } from "~/config/config";

import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
    apiKey: opeAIKey,
});
const openai = new OpenAIApi(configuration);


export const textGeneration = async (prompt: string) => {
    console.log(`opeAIKey ${opeAIKey}`)
    try {
        const response = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: `Human: ${prompt}\nAI: `,
            temperature: 0.9,
            max_tokens: 40,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
            stop: ['Human:', 'AI:'],


        });
        console.log(`${response.data.choices[0].text}`)
        return {
            status: 1,
            response: `${response.data.choices[0].text}`
        };
    } catch (error) {
        return {
            status: 0,
            response: ''
        };
    }
};



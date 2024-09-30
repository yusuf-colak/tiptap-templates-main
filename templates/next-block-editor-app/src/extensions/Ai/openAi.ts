import { OpenAI } from 'openai'

const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

export async function streamOpenAIResponse(prompt: string, callback: (text: string) => void) {
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        stream: true,
        messages: [
            {
                role: "system",
                content: "make actions with the text"
            },
            {
                role: "user",
                content: prompt
            }
        ],
        temperature: 0.8,
        max_tokens: 1024,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })

    for await (const chunk of completion) {
        const [choice] = chunk.choices;
        const { content } = choice.delta;

        if(content) callback(content)
    }
}

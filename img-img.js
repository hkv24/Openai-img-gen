import OpenAI from "openai"
import express from "express"
import dotenv from "dotenv"

const app = express()
app.use(express.json())

dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

app.post('/generate-image', async (req, res) => {
    const { prompt, img_url } = req.body

    const response = await openai.responses.create({
        model: "gpt-4o",
        tools: [{type: "image_generation"}],
        input: [
            {
                role: "user",
                content: [
                    { type: "input_text", text: prompt },
                    {
                        type: "input_image",
                        image_url: img_url
                    }
                ]
            }
        ]
    })

    res.json({ response })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

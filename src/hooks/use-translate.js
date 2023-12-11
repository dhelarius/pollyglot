import { useState } from "react"
import OpenAI from "openai"

const useTranslate = () => {
    const [translation, setTranslation] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const getTranslation = async (language, prompt) => {
        setIsLoading(true)

        const messages = [
            {
              role: 'system',
              content: `You are a useful tool to translate any message to ${language}`
            },
            {
              role: 'user',
              content: prompt
            }
        ]

        try {
            const openai = new OpenAI({
                apiKey: import.meta.env.VITE_OPENAI_API_KEY,
                dangerouslyAllowBrowser: true
            })

            const response = await openai.chat.completions.create({
                model: 'gpt-4',
                messages
            })
      
            setTranslation(response.choices[0].message.content)
        } catch (error) {
            console.error(error)
            setError(error)
        } finally {
            setIsLoading(false)
        }
    }

    const reset = () => {
        setTranslation('')
        setError(null)
    }

    return { translation, isLoading, error, getTranslation, reset }
}

export default useTranslate
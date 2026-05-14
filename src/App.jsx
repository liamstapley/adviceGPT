import { useMemo, useState } from 'react'
import './App.css'

const RESPONSES = [
  "This is absolutely a character-building arc. Please proceed dramatically.",
  'Bold move. I respect the chaos.',
  'Not ideal, but at least the story is getting interesting.',
  'I prescribe one snack, one deep breath, and a wildly confident comeback.',
  'Honestly? That sounds like a future “remember when” moment.',
  'Plot twist energy detected. Keep going.',
  'That situation is loud, but your aura can be louder.',
  'This feels temporary. Your comeback will be permanent.',
  'The vibes are unstable, but you are not.',
  'This is premium lore for your autobiography.',
]

const pickReply = () => RESPONSES[Math.floor(Math.random() * RESPONSES.length)]

function App() {
  const [prompt, setPrompt] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      role: 'assistant',
      text: "Welcome to AdviceGPT. Share what’s on your mind.",
    },
  ])

  const canSubmit = useMemo(
    () => prompt.trim().length > 0 && !isThinking,
    [prompt, isThinking],
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    const cleanedPrompt = prompt.trim()
    if (!cleanedPrompt || isThinking) return

    setMessages((current) => [
      ...current,
      { id: crypto.randomUUID(), role: 'user', text: cleanedPrompt },
    ])
    setPrompt('')
    setIsThinking(true)

    setTimeout(() => {
      setMessages((current) => [
        ...current,
        { id: crypto.randomUUID(), role: 'assistant', text: pickReply() },
      ])
      setIsThinking(false)
    }, 600)
  }

  return (
    <main className="app-shell">
      <section className="chat-card">
        <header className="chat-head">
          <div className="brand-dot" aria-hidden="true" />
          <div>
            <p className="eyebrow">AdviceGPT</p>
            <h1>Trusted perspective, instantly.</h1>
          </div>
        </header>

        <div className="chat-log" aria-live="polite">
          {messages.map((message) => (
            <article
              key={message.id}
              className={`bubble bubble-${message.role}`}
              aria-label={`${message.role} message`}
            >
              <p>{message.text}</p>
            </article>
          ))}
          {isThinking && (
            <article className="bubble bubble-assistant bubble-thinking">
              <span />
              <span />
              <span />
            </article>
          )}
        </div>

        <form className="chat-input-wrap" onSubmit={handleSubmit}>
          <input
            type="text"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="Ask for advice..."
            aria-label="Advice prompt"
          />
          <button type="submit" disabled={!canSubmit}>
            Send
          </button>
        </form>
      </section>
    </main>
  )
}

export default App

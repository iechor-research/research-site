import Page from 'components/page'
import Footer from 'components/footer'
import { useState, useEffect, useRef } from 'react'

function WebTerminal() {
  const [entries, setEntries] = useState([
    {
      id: '1',
      type: 'output',
      content:
        'Welcome to Research CLI Web Terminal!\nConnected to Research CLI backend.\nType /help to see available commands.',
      timestamp: new Date(),
    },
  ])
  const [currentInput, setCurrentInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef(null)
  const terminalRef = useRef(null)

  // 自动滚动到底部
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [entries])

  // 聚焦输入框
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const addEntry = (type, content) => {
    const newEntry = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
    }
    setEntries((prev) => [...prev, newEntry])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!currentInput.trim()) return

    const command = currentInput.trim()

    // 添加输入到历史记录
    setHistory((prev) => [...prev, command])
    setHistoryIndex(-1)

    // 显示用户输入
    addEntry('input', `$ ${command}`)

    // 清空输入
    setCurrentInput('')

    // 处理本地命令
    if (command === '/clear') {
      setEntries([])
      return
    }

    // 发送命令到 Research CLI API
    try {
      const response = await fetch('/api/research-cli', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.error) {
        addEntry('error', data.error)
      } else {
        addEntry('output', data.output || 'Command executed successfully')
      }
    } catch (error) {
      console.error('Error executing command:', error)
      addEntry('error', `Error: Failed to execute command. ${error.message}`)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex =
          historyIndex === -1
            ? history.length - 1
            : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setCurrentInput(history[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1
        if (newIndex >= history.length) {
          setHistoryIndex(-1)
          setCurrentInput('')
        } else {
          setHistoryIndex(newIndex)
          setCurrentInput(history[newIndex])
        }
      }
    }
  }

  return (
    <div
      style={{
        backgroundColor: '#1a1a1a',
        border: '1px solid #333',
        borderRadius: '10px',
        overflow: 'hidden',
        fontFamily: 'Monaco, "Courier New", monospace',
        margin: '20px 0',
      }}
    >
      {/* Terminal Header */}
      <div
        style={{
          backgroundColor: '#333',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid #555',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ color: '#00d4ff' }}>⚡</span>
          <span style={{ color: '#ccc', fontSize: '14px' }}>
            Research CLI Terminal
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#ff5f57',
              borderRadius: '50%',
            }}
          ></div>
          <div
            style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#ffbd2e',
              borderRadius: '50%',
            }}
          ></div>
          <div
            style={{
              width: '12px',
              height: '12px',
              backgroundColor: '#28ca42',
              borderRadius: '50%',
            }}
          ></div>
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        style={{
          padding: '20px',
          height: '400px',
          overflowY: 'auto',
          backgroundColor: '#000',
          color: '#00ff00',
          fontSize: '14px',
          lineHeight: '1.4',
        }}
      >
        {entries.map((entry) => (
          <div key={entry.id} style={{ marginBottom: '10px' }}>
            {entry.type === 'input' && (
              <div style={{ color: '#00d4ff' }}>{entry.content}</div>
            )}
            {entry.type === 'output' && (
              <div style={{ color: '#00ff00', whiteSpace: 'pre-wrap' }}>
                {entry.content}
              </div>
            )}
            {entry.type === 'error' && (
              <div style={{ color: '#ff5555', whiteSpace: 'pre-wrap' }}>
                {entry.content}
              </div>
            )}
          </div>
        ))}

        {/* Input Line */}
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <span style={{ color: '#00d4ff', marginRight: '10px' }}>$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#00ff00',
              fontFamily: 'inherit',
              fontSize: '14px',
            }}
            placeholder="Type a command..."
          />
        </form>
      </div>
    </div>
  )
}

export default function TerminalPage() {
  return (
    <Page
      title="Web Terminal - Research CLI"
      description="Interactive web terminal for Research CLI with all research commands."
    >
      <div
        style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}
      >
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '1rem',
            color: '#00d4ff',
          }}
        >
          Research CLI Web Terminal
        </h1>

        <p
          style={{
            fontSize: '1.2rem',
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#666',
          }}
        >
          Interactive web terminal connected to the Research CLI backend -
          execute real commands directly
        </p>

        <WebTerminal />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            marginTop: '30px',
          }}
        >
          <div
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h3
              style={{
                fontSize: '1.2rem',
                marginBottom: '10px',
                color: '#333',
              }}
            >
              Quick Commands
            </h3>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              <div>
                <code>/help</code> - Show available commands
              </div>
              <div>
                <code>/research search "query"</code> - Search papers (real CLI)
              </div>
              <div>
                <code>/paper outline "topic"</code> - Generate outline (real
                CLI)
              </div>
              <div>
                <code>/clear</code> - Clear terminal (web only)
              </div>
            </div>
          </div>

          <div
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '20px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h3
              style={{
                fontSize: '1.2rem',
                marginBottom: '10px',
                color: '#333',
              }}
            >
              Tips
            </h3>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>
              <div>• Use ↑/↓ arrow keys to navigate command history</div>
              <div>• Commands are executed on the Research CLI backend</div>
              <div>• Use quotes for multi-word arguments</div>
              <div>• Type /help for detailed command reference</div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </Page>
  )
}

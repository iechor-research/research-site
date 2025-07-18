import { Keyframes, Frame } from './react-keyframes.ts'
import styles from './terminal.module.css'
import { useState } from 'react'

const sleepDuration = 500
const getTypingDuration = () => 80 + 80 * (Math.random() - 0.5)

const Line = ({ text, noPrompt = false, noCaret = false }) => (
  <>
    {!noPrompt && <span>▲ ~ </span>}
    {text}
    {!noCaret && <span className={styles.caret} />}
  </>
)

const Terminal = () => {
  const [lineCount, setLineCount] = useState(0)

  const renderLine = (text) => {
    const frames = []

    // starting frame
    frames.push(
      <Frame duration={sleepDuration} key={`${text}-first`}>
        <Line />
      </Frame>
    )

    // typing out the line
    for (let i = 0; i < text.length; i++) {
      const isLastLetter = i === text.length - 1
      const duration = isLastLetter ? sleepDuration : getTypingDuration()
      frames.push(
        <Frame duration={duration} key={`${text}-${i}`}>
          <Line text={text.slice(0, i + 1)} />
        </Frame>
      )
    }

    // ending frame
    frames.push(
      <Frame key={`${text}-last`}>
        <Line text={text} noCaret />
      </Frame>
    )

    return (
      <Keyframes component="p" onEnd={() => setLineCount((c) => c + 1)}>
        {frames}
      </Keyframes>
    )
  }

  return (
    <div className={styles.root}>
      <div
        className={`${styles.inner}${lineCount >= 5 ? ' ' + styles.rose : ''}`}
      >
        <div className={styles.header}>
          <span className={styles.icon} />
          <span className={styles.icon} />
          <span className={styles.icon} />
        </div>
        <div className={styles.body}>
          {renderLine('# Research-CLI is an AI-powered research tool')}
          {lineCount >= 1 && renderLine('# Built for academic research')}
          {lineCount >= 2 &&
            renderLine('# Literature search, writing, and submission')}
          {lineCount >= 3 &&
            renderLine('# Install and use from the command line')}
          {lineCount >= 4 && renderLine('research search "machine learning"')}
          {lineCount >= 5 && (
            <>
              <p className={styles.green}>
                <Line
                  text="Found 15 papers on machine learning research!"
                  noPrompt
                  noCaret
                />
              </p>
              <p>
                <Line />
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Terminal

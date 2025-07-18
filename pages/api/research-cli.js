import { spawn } from 'child_process'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { command } = req.body

  if (!command) {
    return res.status(400).json({ error: 'Command is required' })
  }

  try {
    // 使用已安装的 @iechor/research-cli 包

    // 解析命令参数
    const args = command.split(' ').filter((arg) => arg.trim())

    // 如果是帮助命令，直接返回帮助信息
    if (args[0] === '/help' || args[0] === 'help') {
      return res.json({
        output: `Research CLI Web Terminal

Available commands:
  /help                     - Show this help message
  /research search <query>  - Search academic papers
  /paper outline <topic>    - Generate paper outline
  /bib manage              - Manage bibliography
  /submit prepare          - Prepare journal submission
  /version                 - Show version information
  /clear                   - Clear terminal (web only)

Examples:
  /research search "machine learning"
  /paper outline "AI Safety"
  /bib manage --format bibtex

Note: This is a web interface to Research CLI using @iechor/research-cli package.`,
      })
    }

    // 移除开头的斜杠（如果存在）
    if (args[0] && args[0].startsWith('/')) {
      args[0] = args[0].substring(1)
    }

    // 特殊处理一些常见命令
    if (args[0] === 'version') {
      args[0] = '--version'
    } else if (
      args[0] === 'research' ||
      args[0] === 'paper' ||
      args[0] === 'bib' ||
      args[0] === 'submit'
    ) {
      // 对于研究相关命令，使用 --prompt 参数
      const prompt = args.join(' ')
      args = ['--prompt', prompt]
    }

    // 使用 npx 执行已安装的 Research CLI 包，在根目录中执行以避免依赖冲突
    const child = spawn('npx', ['@iechor/research-cli', ...args], {
      stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env, NODE_ENV: 'production' },
      cwd: process.cwd() + '/..', // 在根目录中执行
    })

    let output = ''
    let error = ''

    child.stdout.on('data', (data) => {
      output += data.toString()
    })

    child.stderr.on('data', (data) => {
      error += data.toString()
    })

    child.on('close', (code) => {
      if (code === 0) {
        res.json({
          output: output.trim() || 'Command executed successfully',
          exitCode: code,
        })
      } else {
        res.json({
          error: error.trim() || `Command failed with exit code ${code}`,
          exitCode: code,
        })
      }
    })

    child.on('error', (err) => {
      res.json({
        error: `Failed to execute command: ${err.message}`,
      })
    })

    // 设置超时
    const timeout = setTimeout(() => {
      child.kill()
      res.json({
        error: 'Command timed out after 60 seconds',
      })
    }, 60000)

    child.on('close', () => {
      clearTimeout(timeout)
    })
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({
      error: `Server error: ${error.message}`,
    })
  }
}

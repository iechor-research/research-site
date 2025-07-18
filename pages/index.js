import Page from 'components/page'
import Footer from 'components/footer'
import DownloadButton from 'components/download-button'
import { Download, LogoBig } from 'components/icons'
import heroStyles from 'styles/pages/home/hero.module.css'
import contentStyles from 'styles/pages/home/content.module.css'
import installationStyles from 'styles/pages/home/installation.module.css'
import useOs from 'lib/use-os'
import Terminal from 'components/terminal'

function Path({ os, path }) {
  return (
    <code>
      {`${
        os === 'mac'
          ? '~/Library/Application Support/Research-CLI/'
          : os === 'windows'
          ? '$Env:AppData/Research-CLI/'
          : os === 'linux'
          ? '~/.config/Research-CLI/'
          : ''
      }${path}`}
    </code>
  )
}

function PathLink({ os, path, type }) {
  return (
    <a href={`#${type}-location`}>
      <Path os={os} path={path} />
    </a>
  )
}

const installationTableData = [
  {
    os: 'mac',
    renderText: () => (
      <>
        <b>macOS</b> (Native)
      </>
    ),
    path: 'darwin-x64',
    arm64Path: 'darwin-arm64',
  },
  {
    os: 'windows',
    renderText: () => (
      <>
        <b>Windows</b> (Native)
      </>
    ),
    path: 'win32-x64',
  },
  {
    os: 'ubuntu',
    renderText: () => (
      <>
        <b>Linux</b> (Native)
      </>
    ),
    path: 'linux-x64',
    arm64Path: 'linux-arm64',
  },
  {
    os: 'npm',
    renderText: () => (
      <>
        <b>NPM</b> (All platforms)
      </>
    ),
    path: 'npm',
  },
]

export async function getStaticProps() {
  const res = await fetch(
    'https://api.github.com/repos/iechor-research/research-cli/releases/latest'
  )
  const latestRelease = await res.json()

  return {
    props: {
      latestRelease,
    },
    revalidate: 60 * 60 * 24,
  }
}

export default function HomePage({ latestRelease }) {
  const os = useOs()

  return (
    <Page
      title="Research CLI - Academic Research Made Simple"
      description="A comprehensive academic research tool with AI-powered features for literature search, paper writing, and journal submission."
    >
      {/**
       * Hero
       */}
      <div className={heroStyles.root}>
        <div
          className={`${heroStyles.logo} hero-title fade-in`}
          style={{ fontSize: '4rem', fontWeight: 'bold' }}
        >
          Research CLI
        </div>
        <div className={`${heroStyles.terminal} floating-element fade-in`}>
          <Terminal />
        </div>
        <div className={`${heroStyles.download} fade-in`}>
          <div className="pulse">
            <DownloadButton fixedWidth os={os} />
          </div>
          <a className={heroStyles.other} href="#installation">
            View installation options
          </a>
        </div>
      </div>

      {/**
       * Content
       */}
      <div className={contentStyles.root} id="content">
        {/**
         * Installation
         */}
        <h2 className={`${installationStyles.title} fade-in`} id="installation">
          <a href="#installation">Installation</a>
        </h2>
        <span className="fade-in" style={{ color: '#ccc' }}>
          latest version: {latestRelease.tag_name}
        </span>
        <div className="table fade-in">
          <table className={installationStyles.table}>
            <tbody>
              <tr>
                <td className={installationStyles.invisibleTopLeft} />
                <td className={installationStyles.withSpacing}>64-bit</td>
                <td className={installationStyles.withSpacing}>arm64</td>
              </tr>
              {installationTableData.map(
                ({ os: _os, renderText, path, arm64Path }) => (
                  <tr key={_os}>
                    <td className={installationStyles.withSpacing}>
                      {renderText()}
                    </td>
                    {[path, arm64Path].map((archPath) => (
                      <td
                        key={archPath}
                        className={
                          os === _os
                            ? installationStyles.highlighted
                            : archPath || installationStyles.withSpacing
                        }
                      >
                        {archPath ? (
                          <a
                            href={
                              archPath === 'npm'
                                ? 'https://www.npmjs.com/package/@iechor/research-cli'
                                : `https://github.com/iechor-research/research-cli/releases/download/${latestRelease.tag_name}/research-cli-${archPath}`
                            }
                          >
                            <Download
                              height={12}
                              width={16}
                              className={installationStyles.icon}
                            />
                            {latestRelease.tag_name}
                          </a>
                        ) : (
                          'N/A'
                        )}
                      </td>
                    ))}
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>

        {/**
         * Quick Start
         */}
        <h2 className="fade-in" id="quick-start">
          <a href="#quick-start">Quick Start</a>
        </h2>
        <p className="fade-in" style={{ color: '#ccc', lineHeight: '1.6' }}>
          Get started with Research CLI in seconds. Install via npm and start
          using powerful research commands.
        </p>

        <h3 className="fade-in" style={{ color: '#00d4ff', marginTop: '30px' }}>
          Install via NPM
        </h3>
        <pre
          className="fade-in"
          style={{
            background: '#111',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid #333',
          }}
        >
          <code style={{ color: '#00d4ff' }}>
            $ npm install -g @iechor/research-cli
          </code>
        </pre>
        <pre
          className="fade-in"
          style={{
            background: '#111',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid #333',
          }}
        >
          <code style={{ color: '#00d4ff' }}>$ research</code>
        </pre>

        <h3 className="fade-in" style={{ color: '#00d4ff', marginTop: '30px' }}>
          Basic Commands
        </h3>
        <p
          className="fade-in"
          style={{ color: '#ccc', margin: '20px 0 10px 0' }}
        >
          Try these essential research commands:
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '10px',
            margin: '20px 0',
          }}
        >
          <div>
            <h4 style={{ color: '#50e3c2', marginBottom: '5px' }}>
              Literature Search
            </h4>
            <pre
              style={{
                background: '#111',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #333',
                margin: '0',
              }}
            >
              <code style={{ color: '#50e3c2' }}>
                research search "machine learning"
              </code>
            </pre>
          </div>

          <div>
            <h4 style={{ color: '#50e3c2', marginBottom: '5px' }}>
              Paper Outline Generation
            </h4>
            <pre
              style={{
                background: '#111',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #333',
                margin: '0',
              }}
            >
              <code style={{ color: '#50e3c2' }}>
                research outline "AI Safety"
              </code>
            </pre>
          </div>

          <div>
            <h4 style={{ color: '#50e3c2', marginBottom: '5px' }}>
              Bibliography Management
            </h4>
            <pre
              style={{
                background: '#111',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #333',
                margin: '0',
              }}
            >
              <code style={{ color: '#50e3c2' }}>
                research bib add arxiv:2301.00001
              </code>
            </pre>
          </div>

          <div>
            <h4 style={{ color: '#50e3c2', marginBottom: '5px' }}>
              Journal Submission
            </h4>
            <pre
              style={{
                background: '#111',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #333',
                margin: '0',
              }}
            >
              <code style={{ color: '#50e3c2' }}>
                research submit prepare --journal "Nature"
              </code>
            </pre>
          </div>
        </div>

        {/**
         * Research Features
         */}
        <h2 className="fade-in" id="research-features">
          <a href="#research-features">Research Features</a>
        </h2>
        <p className="fade-in" style={{ color: '#ccc', lineHeight: '1.6' }}>
          Research CLI provides a comprehensive suite of AI-powered tools for
          academic research, from literature discovery to journal submission.
          Our goal is to streamline the entire research workflow and make
          academic research more efficient and accessible.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
            margin: '30px 0',
          }}
        >
          <div
            className="feature-card"
            style={{
              padding: '25px',
              borderRadius: '8px',
              background: '#111',
              border: '1px solid #333',
            }}
          >
            <h3 style={{ color: '#00d4ff', marginBottom: '15px' }}>
              🔍 Literature Search
            </h3>
            <p
              style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '15px' }}
            >
              Search arXiv, PubMed, IEEE databases with AI-powered relevance
              ranking and smart filtering.
            </p>
            <ul style={{ color: '#888', fontSize: '14px', lineHeight: '1.5' }}>
              <li>Multi-database search</li>
              <li>AI relevance scoring</li>
              <li>Citation network analysis</li>
              <li>Export to BibTeX</li>
            </ul>
          </div>

          <div
            className="feature-card"
            style={{
              padding: '25px',
              borderRadius: '8px',
              background: '#111',
              border: '1px solid #333',
            }}
          >
            <h3 style={{ color: '#00d4ff', marginBottom: '15px' }}>
              📝 AI Writing Assistant
            </h3>
            <p
              style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '15px' }}
            >
              Generate paper outlines, improve writing style, and format
              citations automatically.
            </p>
            <ul style={{ color: '#888', fontSize: '14px', lineHeight: '1.5' }}>
              <li>Outline generation</li>
              <li>Writing style improvement</li>
              <li>Grammar checking</li>
              <li>Citation formatting</li>
            </ul>
          </div>

          <div
            className="feature-card"
            style={{
              padding: '25px',
              borderRadius: '8px',
              background: '#111',
              border: '1px solid #333',
            }}
          >
            <h3 style={{ color: '#00d4ff', marginBottom: '15px' }}>
              📚 Bibliography Manager
            </h3>
            <p
              style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '15px' }}
            >
              Organize references with BibTeX support and citation network
              analysis.
            </p>
            <ul style={{ color: '#888', fontSize: '14px', lineHeight: '1.5' }}>
              <li>Reference organization</li>
              <li>BibTeX export/import</li>
              <li>Duplicate detection</li>
              <li>Citation graphs</li>
            </ul>
          </div>

          <div
            className="feature-card"
            style={{
              padding: '25px',
              borderRadius: '8px',
              background: '#111',
              border: '1px solid #333',
            }}
          >
            <h3 style={{ color: '#00d4ff', marginBottom: '15px' }}>
              🚀 Journal Submission
            </h3>
            <p
              style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '15px' }}
            >
              Find suitable journals and prepare submission packages
              automatically.
            </p>
            <ul style={{ color: '#888', fontSize: '14px', lineHeight: '1.5' }}>
              <li>Journal matching</li>
              <li>Submission preparation</li>
              <li>Format compliance</li>
              <li>Impact factor analysis</li>
            </ul>
          </div>

          <div
            className="feature-card"
            style={{
              padding: '25px',
              borderRadius: '8px',
              background: '#111',
              border: '1px solid #333',
            }}
          >
            <h3 style={{ color: '#00d4ff', marginBottom: '15px' }}>
              📊 Data Analysis
            </h3>
            <p
              style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '15px' }}
            >
              Analyze research data with statistical tools and generate
              visualizations.
            </p>
            <ul style={{ color: '#888', fontSize: '14px', lineHeight: '1.5' }}>
              <li>Statistical analysis</li>
              <li>Data visualization</li>
              <li>Trend analysis</li>
              <li>Report generation</li>
            </ul>
          </div>

          <div
            className="feature-card"
            style={{
              padding: '25px',
              borderRadius: '8px',
              background: '#111',
              border: '1px solid #333',
            }}
          >
            <h3 style={{ color: '#00d4ff', marginBottom: '15px' }}>
              🔬 LaTeX Support
            </h3>
            <p
              style={{ color: '#ccc', lineHeight: '1.6', marginBottom: '15px' }}
            >
              Generate LaTeX documents with proper formatting and template
              support.
            </p>
            <ul style={{ color: '#888', fontSize: '14px', lineHeight: '1.5' }}>
              <li>Template generation</li>
              <li>Format conversion</li>
              <li>Bibliography integration</li>
              <li>Journal templates</li>
            </ul>
          </div>
        </div>

        {/**
         * Configuration
         */}
        <h2 className="fade-in" id="configuration">
          <a href="#configuration">Configuration</a>
        </h2>
        <p className="fade-in" style={{ color: '#ccc', lineHeight: '1.6' }}>
          Research CLI can be configured through a simple configuration file or
          command-line options.
        </p>

        <h3 className="fade-in" style={{ color: '#00d4ff', marginTop: '30px' }}>
          Config File Location
        </h3>
        <div className="table fade-in">
          <table>
            <tbody>
              <tr>
                <td>
                  <strong>macOS</strong>
                </td>
                <td>
                  <code>~/.config/research-cli/config.json</code>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Windows</strong>
                </td>
                <td>
                  <code>%APPDATA%\\research-cli\\config.json</code>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>Linux</strong>
                </td>
                <td>
                  <code>~/.config/research-cli/config.json</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="fade-in" style={{ color: '#00d4ff', marginTop: '30px' }}>
          Basic Configuration
        </h3>
        <pre
          className="fade-in"
          style={{
            background: '#111',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #333',
          }}
        >
          <code style={{ color: '#ccc' }}>{`{
  "apiKey": "your-api-key",
  "defaultDatabase": "arxiv",
  "outputFormat": "bibtex",
  "maxResults": 50,
  "language": "en",
  "theme": "dark"
}`}</code>
        </pre>

        <h3 className="fade-in" style={{ color: '#00d4ff', marginTop: '30px' }}>
          Command Options
        </h3>
        <div className="table fade-in">
          <table>
            <thead>
              <tr>
                <td>Option</td>
                <td>Description</td>
                <td>Default</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>--config</code>
                </td>
                <td>Path to configuration file</td>
                <td>~/.config/research-cli/config.json</td>
              </tr>
              <tr>
                <td>
                  <code>--output</code>
                </td>
                <td>Output format (json, bibtex, csv)</td>
                <td>json</td>
              </tr>
              <tr>
                <td>
                  <code>--limit</code>
                </td>
                <td>Maximum number of results</td>
                <td>10</td>
              </tr>
              <tr>
                <td>
                  <code>--verbose</code>
                </td>
                <td>Enable verbose output</td>
                <td>false</td>
              </tr>
              <tr>
                <td>
                  <code>--help</code>
                </td>
                <td>Show help information</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/**
         * API Integration
         */}
        <h2 className="fade-in" id="api-integration">
          <a href="#api-integration">API Integration</a>
        </h2>
        <p className="fade-in" style={{ color: '#ccc', lineHeight: '1.6' }}>
          Research CLI integrates with multiple academic databases and AI
          services to provide comprehensive research support.
        </p>

        <h3 className="fade-in" style={{ color: '#00d4ff', marginTop: '30px' }}>
          Supported Databases
        </h3>
        <div className="table fade-in">
          <table>
            <thead>
              <tr>
                <td>Database</td>
                <td>Coverage</td>
                <td>API Status</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>arXiv</strong>
                </td>
                <td>Physics, Mathematics, Computer Science</td>
                <td>✅ Active</td>
              </tr>
              <tr>
                <td>
                  <strong>PubMed</strong>
                </td>
                <td>Life Sciences, Medicine</td>
                <td>✅ Active</td>
              </tr>
              <tr>
                <td>
                  <strong>IEEE Xplore</strong>
                </td>
                <td>Engineering, Technology</td>
                <td>✅ Active</td>
              </tr>
              <tr>
                <td>
                  <strong>Google Scholar</strong>
                </td>
                <td>All Academic Fields</td>
                <td>⚠️ Limited</td>
              </tr>
              <tr>
                <td>
                  <strong>DBLP</strong>
                </td>
                <td>Computer Science</td>
                <td>✅ Active</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/**
         * Examples
         */}
        <h2 className="fade-in" id="examples">
          <a href="#examples">Usage Examples</a>
        </h2>
        <p className="fade-in" style={{ color: '#ccc', lineHeight: '1.6' }}>
          Here are some practical examples of how to use Research CLI for
          different research tasks.
        </p>

        <h3 className="fade-in" style={{ color: '#00d4ff', marginTop: '30px' }}>
          Literature Review Workflow
        </h3>
        <pre
          className="fade-in"
          style={{
            background: '#111',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #333',
          }}
        >
          <code style={{ color: '#50e3c2' }}>{`# 1. Search for papers on a topic
research search "transformer neural networks" --limit 20

# 2. Add promising papers to bibliography
research bib add arxiv:1706.03762 arxiv:1810.04805

# 3. Generate paper outline
research outline "Attention Mechanisms in NLP"

# 4. Analyze citation networks
research analyze citations --input bibliography.bib

# 5. Find suitable journals
research submit match --topic "natural language processing"`}</code>
        </pre>

        <h3 className="fade-in" style={{ color: '#00d4ff', marginTop: '30px' }}>
          Writing and Submission
        </h3>
        <pre
          className="fade-in"
          style={{
            background: '#111',
            padding: '20px',
            borderRadius: '8px',
            border: '1px solid #333',
          }}
        >
          <code style={{ color: '#50e3c2' }}>{`# 1. Generate LaTeX template
research latex template --journal "ACL"

# 2. Improve writing style
research write improve --file draft.tex

# 3. Check citations format
research bib format --style ieee

# 4. Prepare submission package
research submit prepare --journal "ACL" --files "paper.pdf,supplement.pdf"`}</code>
        </pre>

        {/**
         * Community and Support
         */}
        <h2 className="fade-in" id="community">
          <a href="#community">Community & Support</a>
        </h2>
        <p className="fade-in" style={{ color: '#ccc', lineHeight: '1.6' }}>
          Join our community of researchers and developers to get help, share
          ideas, and contribute to the project.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
            margin: '30px 0',
          }}
        >
          <div
            className="feature-card"
            style={{
              padding: '20px',
              borderRadius: '8px',
              background: '#111',
              border: '1px solid #333',
              textAlign: 'center',
            }}
          >
            <h3 style={{ color: '#00d4ff', marginBottom: '10px' }}>
              📖 Documentation
            </h3>
            <p style={{ color: '#ccc', marginBottom: '15px' }}>
              Comprehensive guides and API reference
            </p>
            <a
              href="https://github.com/iechor-research/research-cli/wiki"
              style={{ color: '#50e3c2' }}
            >
              View Docs
            </a>
          </div>

          <div
            className="feature-card"
            style={{
              padding: '20px',
              borderRadius: '8px',
              background: '#111',
              border: '1px solid #333',
              textAlign: 'center',
            }}
          >
            <h3 style={{ color: '#00d4ff', marginBottom: '10px' }}>
              🐛 Issues
            </h3>
            <p style={{ color: '#ccc', marginBottom: '15px' }}>
              Report bugs and request features
            </p>
            <a
              href="https://github.com/iechor-research/research-cli/issues"
              style={{ color: '#50e3c2' }}
            >
              GitHub Issues
            </a>
          </div>

          <div
            className="feature-card"
            style={{
              padding: '20px',
              borderRadius: '8px',
              background: '#111',
              border: '1px solid #333',
              textAlign: 'center',
            }}
          >
            <h3 style={{ color: '#00d4ff', marginBottom: '10px' }}>
              💬 Discussions
            </h3>
            <p style={{ color: '#ccc', marginBottom: '15px' }}>
              Ask questions and share ideas
            </p>
            <a
              href="https://github.com/iechor-research/research-cli/discussions"
              style={{ color: '#50e3c2' }}
            >
              Join Discussion
            </a>
          </div>

          <div
            className="feature-card"
            style={{
              padding: '20px',
              borderRadius: '8px',
              background: '#111',
              border: '1px solid #333',
              textAlign: 'center',
            }}
          >
            <h3 style={{ color: '#00d4ff', marginBottom: '10px' }}>
              🤝 Contributing
            </h3>
            <p style={{ color: '#ccc', marginBottom: '15px' }}>
              Help improve Research CLI
            </p>
            <a
              href="https://github.com/iechor-research/research-cli/blob/main/CONTRIBUTING.md"
              style={{ color: '#50e3c2' }}
            >
              Contribute
            </a>
          </div>
        </div>
      </div>

      <Footer />

      <style jsx>{`
        /* 页面背景 - 保持原有黑色主题 */
        :global(body) {
          background: #000;
          min-height: 100vh;
        }

        /* 头部标题样式 */
        :global(.hero-title) {
          color: #00d4ff;
          text-shadow: 0 0 10px rgba(0, 212, 255, 0.3);
        }

        /* 浮动动画 */
        :global(.floating-element) {
          animation: float 4s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-3px);
          }
        }

        /* 淡入动画 */
        :global(.fade-in) {
          animation: fadeIn 1s ease-in-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* 脉冲动画 */
        :global(.pulse) {
          animation: pulse 3s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.02);
          }
        }

        /* 研究功能卡片动画 */
        :global(.feature-card) {
          transition: all 0.3s ease;
        }

        :global(.feature-card:hover) {
          transform: translateY(-2px);
          border-color: #00d4ff;
        }

        .table {
          overflow-x: auto;
          background: #111;
          border-radius: 8px;
          border: 1px solid #333;
          padding: 20px;
          margin: 20px 0;
        }

        /* 改善表格样式 */
        :global(.table table) {
          background: transparent;
          width: 100%;
          border-collapse: collapse;
        }

        :global(.table td) {
          color: #ccc;
          padding: 12px;
          border: 1px solid #444;
          vertical-align: top;
        }

        :global(.table thead td) {
          color: #00d4ff;
          font-weight: bold;
          background: #0a0a0a;
        }

        :global(.table a) {
          color: #00d4ff;
        }

        :global(.table a:hover) {
          color: #50e3c2;
        }

        /* 代码块样式 */
        pre {
          overflow-x: auto;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }

        code {
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }

        /* 响应式设计 */
        @media screen and (max-width: 700px) {
          #content {
            padding: 20px;
          }

          pre {
            white-space: pre-wrap;
            word-wrap: break-word;
          }

          .table {
            font-size: 14px;
          }

          :global(.table td) {
            padding: 8px;
          }
        }
      `}</style>
    </Page>
  )
}

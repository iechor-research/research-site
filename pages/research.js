import Page from 'components/page'
import Footer from 'components/footer'

export default function ResearchPage() {
  return (
    <Page
      title="Research Tools - Research CLI"
      description="Comprehensive academic research tools for literature search, paper writing, and journal submission."
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '50vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          padding: '80px 20px',
        }}
      >
        <div>
          <h1
            style={{
              fontSize: '4.5rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              letterSpacing: '-0.02em',
            }}
          >
            Research Tools
          </h1>
          <p
            style={{
              fontSize: '1.6rem',
              fontWeight: '300',
              opacity: '0.95',
              maxWidth: '700px',
              margin: '0 auto',
              lineHeight: '1.4',
            }}
          >
            AI-powered academic research suite for modern scholars and
            researchers
          </p>
        </div>
      </div>

      <div
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px' }}
      >
        <div
          style={{
            textAlign: 'center',
            marginBottom: '5rem',
          }}
        >
          <h2
            style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '1.5rem',
              color: '#1a202c',
            }}
          >
            Core Features
          </h2>
          <p
            style={{
              fontSize: '1.4rem',
              color: '#2d3748',
              maxWidth: '800px',
              margin: '0 auto',
              lineHeight: '1.6',
              fontWeight: '400',
            }}
          >
            From literature discovery to journal submission, Research CLI
            provides a complete academic research workflow, allowing you to
            focus on research rather than tools.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '40px',
            marginBottom: '5rem',
          }}
        >
          <div
            style={{
              border: '3px solid #e2e8f0',
              borderRadius: '20px',
              padding: '40px',
              backgroundColor: '#ffffff',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🔍</div>
            <h3
              style={{
                fontSize: '2rem',
                marginBottom: '1.5rem',
                color: '#1a202c',
                fontWeight: 'bold',
              }}
            >
              Intelligent Literature Search
            </h3>
            <p
              style={{
                marginBottom: '2rem',
                color: '#2d3748',
                fontSize: '1.2rem',
                lineHeight: '1.7',
              }}
            >
              Integrated search across arXiv, PubMed, IEEE Xplore, Google
              Scholar, and more. AI-powered relevance ranking, duplicate
              detection, and semantic search capabilities with citation network
              analysis.
            </p>
            <div style={{ marginBottom: '1.5rem' }}>
              <h4
                style={{
                  color: '#1a202c',
                  fontSize: '1.3rem',
                  marginBottom: '0.8rem',
                  fontWeight: 'bold',
                }}
              >
                Key Features:
              </h4>
              <ul
                style={{
                  color: '#2d3748',
                  paddingLeft: '20px',
                  lineHeight: '1.8',
                  fontSize: '1.1rem',
                }}
              >
                <li>Multi-database parallel search</li>
                <li>AI-driven relevance scoring</li>
                <li>Automatic deduplication and clustering</li>
                <li>Citation network visualization</li>
                <li>Export to reference managers</li>
              </ul>
            </div>
            <pre
              style={{
                backgroundColor: '#1a202c',
                color: '#f7fafc',
                padding: '20px',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                overflow: 'auto',
              }}
            >
              <code>
                research search "deep learning" --db arxiv,pubmed --limit 50
              </code>
            </pre>
          </div>

          <div
            style={{
              border: '3px solid #fed7d7',
              borderRadius: '20px',
              padding: '40px',
              backgroundColor: '#ffffff',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📝</div>
            <h3
              style={{
                fontSize: '2rem',
                marginBottom: '1.5rem',
                color: '#1a202c',
                fontWeight: 'bold',
              }}
            >
              Paper Outline Generator
            </h3>
            <p
              style={{
                marginBottom: '2rem',
                color: '#2d3748',
                fontSize: '1.2rem',
                lineHeight: '1.7',
              }}
            >
              Generate structured outlines for research papers, systematic
              reviews, and case studies. Customizable templates for different
              paper types with AI-powered content suggestions and section
              recommendations.
            </p>
            <div style={{ marginBottom: '1.5rem' }}>
              <h4
                style={{
                  color: '#1a202c',
                  fontSize: '1.3rem',
                  marginBottom: '0.8rem',
                  fontWeight: 'bold',
                }}
              >
                Template Types:
              </h4>
              <ul
                style={{
                  color: '#2d3748',
                  paddingLeft: '20px',
                  lineHeight: '1.8',
                  fontSize: '1.1rem',
                }}
              >
                <li>Experimental research papers</li>
                <li>Systematic literature reviews</li>
                <li>Case study reports</li>
                <li>Technical documentation</li>
                <li>Conference abstracts</li>
              </ul>
            </div>
            <pre
              style={{
                backgroundColor: '#1a202c',
                color: '#f7fafc',
                padding: '20px',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                overflow: 'auto',
              }}
            >
              <code>
                paper outline "AI Safety" --type experimental --sections 5
              </code>
            </pre>
          </div>

          <div
            style={{
              border: '3px solid #c6f6d5',
              borderRadius: '20px',
              padding: '40px',
              backgroundColor: '#ffffff',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📚</div>
            <h3
              style={{
                fontSize: '2rem',
                marginBottom: '1.5rem',
                color: '#1a202c',
                fontWeight: 'bold',
              }}
            >
              Bibliography Management
            </h3>
            <p
              style={{
                marginBottom: '2rem',
                color: '#2d3748',
                fontSize: '1.2rem',
                lineHeight: '1.7',
              }}
            >
              Complete reference management solution with support for BibTeX,
              EndNote, RIS, and more. Automatic PDF metadata extraction,
              citation formatting, and citation network analysis with duplicate
              detection.
            </p>
            <div style={{ marginBottom: '1.5rem' }}>
              <h4
                style={{
                  color: '#1a202c',
                  fontSize: '1.3rem',
                  marginBottom: '0.8rem',
                  fontWeight: 'bold',
                }}
              >
                Capabilities:
              </h4>
              <ul
                style={{
                  color: '#2d3748',
                  paddingLeft: '20px',
                  lineHeight: '1.8',
                  fontSize: '1.1rem',
                }}
              >
                <li>Multi-format import/export</li>
                <li>PDF metadata extraction</li>
                <li>Citation network analysis</li>
                <li>Duplicate reference detection</li>
                <li>Style guide compliance</li>
              </ul>
            </div>
            <pre
              style={{
                backgroundColor: '#1a202c',
                color: '#f7fafc',
                padding: '20px',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                overflow: 'auto',
              }}
            >
              <code>
                bib import papers.pdf --extract-metadata --format bibtex
              </code>
            </pre>
          </div>

          <div
            style={{
              border: '3px solid #e9d8fd',
              borderRadius: '20px',
              padding: '40px',
              backgroundColor: '#ffffff',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🤖</div>
            <h3
              style={{
                fontSize: '2rem',
                marginBottom: '1.5rem',
                color: '#1a202c',
                fontWeight: 'bold',
              }}
            >
              AI Writing Assistant
            </h3>
            <p
              style={{
                marginBottom: '2rem',
                color: '#2d3748',
                fontSize: '1.2rem',
                lineHeight: '1.7',
              }}
            >
              Intelligent writing assistance with grammar checking, style
              improvement, and structural optimization. Support for multiple
              academic writing styles including APA, MLA, Chicago, and IEEE
              formats.
            </p>
            <div style={{ marginBottom: '1.5rem' }}>
              <h4
                style={{
                  color: '#1a202c',
                  fontSize: '1.3rem',
                  marginBottom: '0.8rem',
                  fontWeight: 'bold',
                }}
              >
                Features:
              </h4>
              <ul
                style={{
                  color: '#2d3748',
                  paddingLeft: '20px',
                  lineHeight: '1.8',
                  fontSize: '1.1rem',
                }}
              >
                <li>Grammar and spell checking</li>
                <li>Style and tone suggestions</li>
                <li>Structural analysis</li>
                <li>Citation format validation</li>
                <li>Readability optimization</li>
              </ul>
            </div>
            <pre
              style={{
                backgroundColor: '#1a202c',
                color: '#f7fafc',
                padding: '20px',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                overflow: 'auto',
              }}
            >
              <code>write improve draft.tex --style apa --check grammar</code>
            </pre>
          </div>

          <div
            style={{
              border: '3px solid #fed7e2',
              borderRadius: '20px',
              padding: '40px',
              backgroundColor: '#ffffff',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>📊</div>
            <h3
              style={{
                fontSize: '2rem',
                marginBottom: '1.5rem',
                color: '#1a202c',
                fontWeight: 'bold',
              }}
            >
              Data Analysis Tools
            </h3>
            <p
              style={{
                marginBottom: '2rem',
                color: '#2d3748',
                fontSize: '1.2rem',
                lineHeight: '1.7',
              }}
            >
              Integrated statistical analysis, machine learning, and data
              visualization tools. Support for CSV, JSON, Excel formats with
              descriptive statistics, hypothesis testing, and regression
              analysis capabilities.
            </p>
            <div style={{ marginBottom: '1.5rem' }}>
              <h4
                style={{
                  color: '#1a202c',
                  fontSize: '1.3rem',
                  marginBottom: '0.8rem',
                  fontWeight: 'bold',
                }}
              >
                Analysis Types:
              </h4>
              <ul
                style={{
                  color: '#2d3748',
                  paddingLeft: '20px',
                  lineHeight: '1.8',
                  fontSize: '1.1rem',
                }}
              >
                <li>Descriptive statistics</li>
                <li>Hypothesis testing</li>
                <li>Regression analysis</li>
                <li>Machine learning modeling</li>
                <li>Data visualization</li>
              </ul>
            </div>
            <pre
              style={{
                backgroundColor: '#1a202c',
                color: '#f7fafc',
                padding: '20px',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                overflow: 'auto',
              }}
            >
              <code>analyze data.csv --method regression --plot --export</code>
            </pre>
          </div>

          <div
            style={{
              border: '3px solid #bee3f8',
              borderRadius: '20px',
              padding: '40px',
              backgroundColor: '#ffffff',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🚀</div>
            <h3
              style={{
                fontSize: '2rem',
                marginBottom: '1.5rem',
                color: '#1a202c',
                fontWeight: 'bold',
              }}
            >
              Journal Submission Assistant
            </h3>
            <p
              style={{
                marginBottom: '2rem',
                color: '#2d3748',
                fontSize: '1.2rem',
                lineHeight: '1.7',
              }}
            >
              Intelligent journal matching system based on paper topic, impact
              factor, and publication timeline. Automated submission package
              generation including cover letters, author responses, and format
              conversion.
            </p>
            <div style={{ marginBottom: '1.5rem' }}>
              <h4
                style={{
                  color: '#1a202c',
                  fontSize: '1.3rem',
                  marginBottom: '0.8rem',
                  fontWeight: 'bold',
                }}
              >
                Services:
              </h4>
              <ul
                style={{
                  color: '#2d3748',
                  paddingLeft: '20px',
                  lineHeight: '1.8',
                  fontSize: '1.1rem',
                }}
              >
                <li>Smart journal matching</li>
                <li>Submission package generation</li>
                <li>Format conversion</li>
                <li>Progress tracking</li>
                <li>Reviewer response templates</li>
              </ul>
            </div>
            <pre
              style={{
                backgroundColor: '#1a202c',
                color: '#f7fafc',
                padding: '20px',
                borderRadius: '12px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                overflow: 'auto',
              }}
            >
              <code>
                submit match paper.pdf --field "machine learning" --impact 3+
              </code>
            </pre>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#f8fafc',
            borderRadius: '25px',
            padding: '60px',
            marginBottom: '5rem',
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              color: '#1a202c',
            }}
          >
            Use Cases
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '40px',
              marginTop: '3rem',
            }}
          >
            <div style={{ textAlign: 'left', padding: '20px' }}>
              <h4
                style={{
                  color: '#1a202c',
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                  fontWeight: 'bold',
                }}
              >
                📖 Literature Review Writing
              </h4>
              <p
                style={{
                  color: '#2d3748',
                  lineHeight: '1.7',
                  fontSize: '1.1rem',
                }}
              >
                Use intelligent search to collect relevant literature,
                automatically generate review outlines, and leverage AI
                assistance to analyze relationships between studies and identify
                research trends.
              </p>
            </div>
            <div style={{ textAlign: 'left', padding: '20px' }}>
              <h4
                style={{
                  color: '#1a202c',
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                  fontWeight: 'bold',
                }}
              >
                🔬 Experimental Paper Publication
              </h4>
              <p
                style={{
                  color: '#2d3748',
                  lineHeight: '1.7',
                  fontSize: '1.1rem',
                }}
              >
                From experimental data analysis to paper writing and journal
                submission, get end-to-end automation support to improve
                research efficiency and publication success.
              </p>
            </div>
            <div style={{ textAlign: 'left', padding: '20px' }}>
              <h4
                style={{
                  color: '#1a202c',
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                  fontWeight: 'bold',
                }}
              >
                📈 Research Trend Analysis
              </h4>
              <p
                style={{
                  color: '#2d3748',
                  lineHeight: '1.7',
                  fontSize: '1.1rem',
                }}
              >
                Through large-scale literature data mining, identify research
                hotspots, predict development trends, and provide data-driven
                insights for research direction.
              </p>
            </div>
            <div style={{ textAlign: 'left', padding: '20px' }}>
              <h4
                style={{
                  color: '#1a202c',
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                  fontWeight: 'bold',
                }}
              >
                🎯 Grant Proposal Writing
              </h4>
              <p
                style={{
                  color: '#2d3748',
                  lineHeight: '1.7',
                  fontSize: '1.1rem',
                }}
              >
                Leverage AI writing assistance and comprehensive literature
                analysis to create compelling grant proposals with proper
                citations and evidence-based arguments.
              </p>
            </div>
            <div style={{ textAlign: 'left', padding: '20px' }}>
              <h4
                style={{
                  color: '#1a202c',
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                  fontWeight: 'bold',
                }}
              >
                🎓 Thesis Development
              </h4>
              <p
                style={{
                  color: '#2d3748',
                  lineHeight: '1.7',
                  fontSize: '1.1rem',
                }}
              >
                Support graduate students and researchers in developing
                comprehensive theses with systematic literature reviews, data
                analysis, and structured writing assistance.
              </p>
            </div>
            <div style={{ textAlign: 'left', padding: '20px' }}>
              <h4
                style={{
                  color: '#1a202c',
                  fontSize: '1.5rem',
                  marginBottom: '1rem',
                  fontWeight: 'bold',
                }}
              >
                🤝 Collaborative Research
              </h4>
              <p
                style={{
                  color: '#2d3748',
                  lineHeight: '1.7',
                  fontSize: '1.1rem',
                }}
              >
                Facilitate team research with shared bibliography management,
                collaborative writing tools, and standardized citation formats
                across multiple contributors.
              </p>
            </div>
          </div>
        </div>

        {/* Interface Themes */}
        <div
          style={{
            background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
            borderRadius: '25px',
            padding: '60px',
            textAlign: 'center',
            color: 'white',
            marginBottom: '40px',
          }}
        >
          <h2
            style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Beautiful Interface Themes
          </h2>
          <p
            style={{
              fontSize: '1.3rem',
              marginBottom: '3rem',
              opacity: '0.9',
              maxWidth: '800px',
              margin: '0 auto 3rem auto',
              lineHeight: '1.6',
            }}
          >
            Choose from multiple carefully crafted themes to match your research
            environment and personal preferences.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '25px',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '20px',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <img
                src="/theme-default.png"
                alt="Default Theme"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              />
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>
                Default Theme
              </h3>
              <p style={{ fontSize: '1rem', opacity: '0.8' }}>
                Classic dark theme with blue accents
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '20px',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <img
                src="/theme-github.png"
                alt="GitHub Theme"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              />
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>
                GitHub Theme
              </h3>
              <p style={{ fontSize: '1rem', opacity: '0.8' }}>
                GitHub-inspired dark theme
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '20px',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <img
                src="/theme-dracula.png"
                alt="Dracula Theme"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              />
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>
                Dracula Theme
              </h3>
              <p style={{ fontSize: '1rem', opacity: '0.8' }}>
                Popular purple-tinted theme
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '20px',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <img
                src="/theme-ayu.png"
                alt="Ayu Theme"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              />
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>
                Ayu Theme
              </h3>
              <p style={{ fontSize: '1rem', opacity: '0.8' }}>
                Modern minimalist theme
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '20px',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <img
                src="/theme-default-light.png"
                alt="Light Theme"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              />
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>
                Light Theme
              </h3>
              <p style={{ fontSize: '1rem', opacity: '0.8' }}>
                Clean light theme for daytime use
              </p>
            </div>

            <div
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                borderRadius: '15px',
                padding: '20px',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <img
                src="/theme-iechor-light.png"
                alt="Iechor Light Theme"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '8px',
                  marginBottom: '15px',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              />
              <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>
                Iechor Light
              </h3>
              <p style={{ fontSize: '1rem', opacity: '0.8' }}>
                Branded light theme
              </p>
            </div>
          </div>

          <div style={{ marginTop: '3rem' }}>
            <pre
              style={{
                backgroundColor: 'rgba(0,0,0,0.4)',
                color: 'white',
                padding: '20px',
                borderRadius: '10px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                display: 'inline-block',
                textAlign: 'left',
              }}
            >
              <code>research config set theme dracula</code>
            </pre>
            <p style={{ marginTop: '1rem', fontSize: '1rem', opacity: '0.9' }}>
              Switch themes instantly with a simple command
            </p>
          </div>
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '25px',
            padding: '60px',
            textAlign: 'center',
            color: 'white',
          }}
        >
          <h2
            style={{
              fontSize: '3rem',
              fontWeight: 'bold',
              marginBottom: '2rem',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            Get Started Today
          </h2>
          <p
            style={{
              fontSize: '1.4rem',
              marginBottom: '3rem',
              opacity: '0.95',
              maxWidth: '700px',
              margin: '0 auto 3rem auto',
              lineHeight: '1.6',
            }}
          >
            Install Research CLI and experience the power of next-generation
            academic research tools
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '25px',
              flexWrap: 'wrap',
              marginBottom: '3rem',
            }}
          >
            <a
              href="https://www.npmjs.com/package/@iechor/research-cli"
              style={{
                backgroundColor: '#ffffff',
                color: '#667eea',
                padding: '20px 40px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontSize: '1.3rem',
                fontWeight: 'bold',
                boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s ease',
              }}
            >
              📦 Install via NPM
            </a>
            <a
              href="https://github.com/iechor-research/research-cli"
              style={{
                backgroundColor: 'rgba(255,255,255,0.2)',
                color: 'white',
                padding: '20px 40px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontSize: '1.3rem',
                fontWeight: 'bold',
                border: '2px solid rgba(255,255,255,0.3)',
                transition: 'transform 0.3s ease',
              }}
            >
              🔗 GitHub Repository
            </a>
            <a
              href="/terminal"
              style={{
                backgroundColor: '#1a202c',
                color: 'white',
                padding: '20px 40px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontSize: '1.3rem',
                fontWeight: 'bold',
                boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                transition: 'transform 0.3s ease',
              }}
            >
              💻 Try Online Demo
            </a>
          </div>
          <div
            style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: '15px',
              padding: '25px',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            <h4
              style={{
                marginBottom: '1.5rem',
                fontSize: '1.2rem',
                fontWeight: 'bold',
              }}
            >
              Quick Installation:
            </h4>
            <pre
              style={{
                backgroundColor: 'rgba(0,0,0,0.4)',
                color: 'white',
                padding: '20px',
                borderRadius: '10px',
                fontSize: '1.2rem',
                fontWeight: 'bold',
                textAlign: 'left',
                overflow: 'auto',
              }}
            >
              <code>npm install -g @iechor/research-cli</code>
            </pre>
            <p style={{ marginTop: '1rem', fontSize: '1rem', opacity: '0.9' }}>
              Then run{' '}
              <code
                style={{
                  backgroundColor: 'rgba(0,0,0,0.3)',
                  padding: '2px 6px',
                  borderRadius: '4px',
                }}
              >
                research --help
              </code>{' '}
              to get started
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </Page>
  )
}

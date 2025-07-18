import Page from 'components/page'
import Footer from 'components/footer'

export default function ResearchPage() {
  return (
    <Page
      title="Research Tools - Research CLI"
      description="Comprehensive academic research tools for literature search, paper writing, and journal submission."
    >
      <div
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}
      >
        <h1
          style={{
            fontSize: '3rem',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '2rem',
            color: '#00d4ff',
          }}
        >
          Research Tools
        </h1>

        <p
          style={{
            fontSize: '1.2rem',
            textAlign: 'center',
            marginBottom: '3rem',
            color: '#666',
          }}
        >
          Comprehensive suite of AI-powered tools for academic research, from
          literature discovery to journal submission.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px',
            marginBottom: '3rem',
          }}
        >
          <div
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '10px',
              padding: '30px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h3
              style={{
                fontSize: '1.5rem',
                marginBottom: '1rem',
                color: '#333',
              }}
            >
              🔍 Literature Search
            </h3>
            <p style={{ marginBottom: '1rem', color: '#666' }}>
              Search academic papers from arXiv, PubMed, IEEE, and other
              databases with AI-powered relevance ranking.
            </p>
            <pre
              style={{
                backgroundColor: '#f0f0f0',
                padding: '10px',
                borderRadius: '5px',
                fontSize: '0.9rem',
              }}
            >
              <code>/research search "machine learning"</code>
            </pre>
          </div>

          <div
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '10px',
              padding: '30px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h3
              style={{
                fontSize: '1.5rem',
                marginBottom: '1rem',
                color: '#333',
              }}
            >
              📝 Paper Outline Generator
            </h3>
            <p style={{ marginBottom: '1rem', color: '#666' }}>
              Generate structured outlines for research papers, reviews, and
              case studies with customizable templates.
            </p>
            <pre
              style={{
                backgroundColor: '#f0f0f0',
                padding: '10px',
                borderRadius: '5px',
                fontSize: '0.9rem',
              }}
            >
              <code>/paper outline "AI Safety"</code>
            </pre>
          </div>

          <div
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '10px',
              padding: '30px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h3
              style={{
                fontSize: '1.5rem',
                marginBottom: '1rem',
                color: '#333',
              }}
            >
              📚 Bibliography Manager
            </h3>
            <p style={{ marginBottom: '1rem', color: '#666' }}>
              Organize references with BibTeX support, citation network
              analysis, and automatic formatting.
            </p>
            <pre
              style={{
                backgroundColor: '#f0f0f0',
                padding: '10px',
                borderRadius: '5px',
                fontSize: '0.9rem',
              }}
            >
              <code>/bib manage --format bibtex</code>
            </pre>
          </div>

          <div
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '10px',
              padding: '30px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h3
              style={{
                fontSize: '1.5rem',
                marginBottom: '1rem',
                color: '#333',
              }}
            >
              📊 Data Analysis
            </h3>
            <p style={{ marginBottom: '1rem', color: '#666' }}>
              Statistical analysis, machine learning tools, and data
              visualization for research projects.
            </p>
            <pre
              style={{
                backgroundColor: '#f0f0f0',
                padding: '10px',
                borderRadius: '5px',
                fontSize: '0.9rem',
              }}
            >
              <code>/research analyze data.csv</code>
            </pre>
          </div>

          <div
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '10px',
              padding: '30px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h3
              style={{
                fontSize: '1.5rem',
                marginBottom: '1rem',
                color: '#333',
              }}
            >
              🚀 Journal Submission
            </h3>
            <p style={{ marginBottom: '1rem', color: '#666' }}>
              Find suitable journals and prepare submission packages with
              automated formatting and templates.
            </p>
            <pre
              style={{
                backgroundColor: '#f0f0f0',
                padding: '10px',
                borderRadius: '5px',
                fontSize: '0.9rem',
              }}
            >
              <code>/submit prepare --journal "Nature"</code>
            </pre>
          </div>

          <div
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '10px',
              padding: '30px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h3
              style={{
                fontSize: '1.5rem',
                marginBottom: '1rem',
                color: '#333',
              }}
            >
              💻 Web Terminal
            </h3>
            <p style={{ marginBottom: '1rem', color: '#666' }}>
              Access all research tools through a powerful web-based terminal
              interface with autocomplete and history.
            </p>
            <pre
              style={{
                backgroundColor: '#f0f0f0',
                padding: '10px',
                borderRadius: '5px',
                fontSize: '0.9rem',
              }}
            >
              <code>/terminal --web</code>
            </pre>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#333' }}>
            Getting Started
          </h2>
          <p
            style={{ fontSize: '1.1rem', marginBottom: '2rem', color: '#666' }}
          >
            Install Research CLI and start using these powerful research tools
            today.
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
              flexWrap: 'wrap',
            }}
          >
            <a
              href="https://www.npmjs.com/package/@iechor/research-cli"
              style={{
                backgroundColor: '#00d4ff',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: 'bold',
              }}
            >
              Install via NPM
            </a>
            <a
              href="https://github.com/iechor-research/research-cli"
              style={{
                backgroundColor: '#333',
                color: 'white',
                padding: '15px 30px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '1.1rem',
                fontWeight: 'bold',
              }}
            >
              View on GitHub
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </Page>
  )
}

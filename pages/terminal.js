import Page from 'components/page'
import Footer from 'components/footer'
import { useState, useEffect, useRef } from 'react'

// 模拟 Research CLI 核心功能
class EmbeddedResearchCLI {
  constructor() {
    this.config = {
      sessionId: Date.now().toString(),
      workingDir: '/research-workspace',
      model: 'gemini-2.0-flash-exp',
      apiKey: process.env.GEMINI_API_KEY,
      debugMode: false,
      telemetryEnabled: false,
      version: '0.2.8',
    }

    this.tools = new Map()
    this.history = []
    this.currentSession = {
      id: this.config.sessionId,
      startTime: new Date(),
      turnCount: 0,
      context: new Map(),
      memory: new Map(),
    }

    this.initializeTools()
  }

  initializeTools() {
    // 注册核心工具
    this.tools.set('help', {
      name: 'help',
      description: 'Show available commands and usage information',
      category: 'utility',
      execute: this.executeHelp.bind(this),
    })

    this.tools.set('version', {
      name: 'version',
      description: 'Show Research CLI version information',
      category: 'utility',
      execute: this.executeVersion.bind(this),
    })

    this.tools.set('config', {
      name: 'config',
      description: 'Show or modify configuration settings',
      category: 'utility',
      execute: this.executeConfig.bind(this),
    })

    this.tools.set('search', {
      name: 'search',
      description: 'Search for academic papers and research materials',
      category: 'research',
      execute: this.executeSearch.bind(this),
    })

    this.tools.set('outline', {
      name: 'outline',
      description: 'Generate structured paper outlines',
      category: 'research',
      execute: this.executeOutline.bind(this),
    })

    this.tools.set('bib', {
      name: 'bib',
      description: 'Manage bibliography and references',
      category: 'research',
      execute: this.executeBib.bind(this),
    })

    this.tools.set('analyze', {
      name: 'analyze',
      description: 'Analyze research data and documents',
      category: 'research',
      execute: this.executeAnalyze.bind(this),
    })

    this.tools.set('write', {
      name: 'write',
      description: 'AI-powered academic writing assistance',
      category: 'research',
      execute: this.executeWrite.bind(this),
    })

    this.tools.set('submit', {
      name: 'submit',
      description: 'Journal submission and preparation tools',
      category: 'research',
      execute: this.executeSubmit.bind(this),
    })

    this.tools.set('latex', {
      name: 'latex',
      description: 'LaTeX project management and compilation',
      category: 'research',
      execute: this.executeLatex.bind(this),
    })

    this.tools.set('session', {
      name: 'session',
      description: 'Manage research sessions and context',
      category: 'utility',
      execute: this.executeSession.bind(this),
    })

    this.tools.set('memory', {
      name: 'memory',
      description: 'Manage research memory and context',
      category: 'utility',
      execute: this.executeMemory.bind(this),
    })
  }

  async executeCommand(command, args = []) {
    const tool = this.tools.get(command)
    if (!tool) {
      throw new Error(
        `Unknown command: ${command}. Type 'help' for available commands.`
      )
    }

    this.currentSession.turnCount++
    this.history.push({ command, args, timestamp: new Date() })

    try {
      const result = await tool.execute(args)
      return result
    } catch (error) {
      throw new Error(`Error executing ${command}: ${error.message}`)
    }
  }

  async executeHelp(args) {
    const categories = {
      research: [],
      utility: [],
      other: [],
    }

    for (const [name, tool] of this.tools) {
      const category = tool.category || 'other'
      categories[category].push({ name, description: tool.description })
    }

    let help = `Research CLI v${
      this.config.version
    } - AI-powered academic research assistant

🔬 RESEARCH COMMANDS:
${categories.research
  .map((t) => `  ${t.name.padEnd(12)} - ${t.description}`)
  .join('\n')}

🔧 UTILITY COMMANDS:
${categories.utility
  .map((t) => `  ${t.name.padEnd(12)} - ${t.description}`)
  .join('\n')}

💡 EXAMPLES:
  search "machine learning in healthcare"
  outline "Deep Learning for Computer Vision"
  bib add "https://arxiv.org/abs/2301.00001"
  analyze ./research_data.csv
  write improve "This paper presents..."
  submit match "computer vision"
  latex create --template=ieee
  session status
  memory list

📚 GETTING STARTED:
  1. Start with 'search' to find relevant papers
  2. Use 'outline' to structure your research
  3. Manage references with 'bib' commands
  4. Analyze data with 'analyze' tools
  5. Get writing help with 'write' commands
  6. Prepare submissions with 'submit' tools

For detailed help on a specific command, use: help <command>`

    if (args.length > 0) {
      const commandName = args[0]
      const tool = this.tools.get(commandName)
      if (tool) {
        help = await this.getDetailedHelp(commandName, tool)
      } else {
        help = `Unknown command: ${commandName}\n\n${help}`
      }
    }

    return help
  }

  async getDetailedHelp(commandName, tool) {
    const helpMap = {
      search: `SEARCH - Academic Literature Search

USAGE:
  search <query> [options]

OPTIONS:
  --source=<source>     Search source (arxiv, pubmed, ieee, google-scholar)
  --limit=<number>      Maximum number of results (default: 10)
  --year=<year>         Filter by publication year
  --type=<type>         Document type (paper, review, thesis)
  --field=<field>       Research field filter

EXAMPLES:
  search "machine learning"
  search "neural networks" --source=arxiv --limit=20
  search "covid-19 treatment" --source=pubmed --year=2023`,

      outline: `OUTLINE - Research Paper Structure Generator

USAGE:
  outline <topic> [options]

OPTIONS:
  --type=<type>         Paper type (research, review, case-study, thesis)
  --style=<style>       Writing style (academic, technical, survey)
  --sections=<number>   Number of main sections (default: 5)
  --format=<format>     Output format (markdown, latex, word)

EXAMPLES:
  outline "AI Ethics in Autonomous Vehicles"
  outline "Machine Learning Survey" --type=review --style=survey
  outline "Deep Learning Implementation" --format=latex`,

      bib: `BIB - Bibliography Management

USAGE:
  bib <action> [arguments]

ACTIONS:
  add <url|doi>         Add paper to bibliography
  list                  List all references
  search <query>        Search bibliography
  export <format>       Export bibliography (bibtex, ris, endnote)
  format <style>        Format references (apa, mla, ieee, chicago)
  validate              Validate bibliography entries

EXAMPLES:
  bib add "https://arxiv.org/abs/2301.00001"
  bib add "10.1038/nature12373"
  bib search "machine learning"
  bib export bibtex
  bib format ieee`,

      analyze: `ANALYZE - Research Data Analysis

USAGE:
  analyze <file> [options]

OPTIONS:
  --type=<type>         Analysis type (statistical, ml, visualization)
  --method=<method>     Analysis method
  --output=<format>     Output format (html, pdf, json)
  --visualize           Generate visualizations

EXAMPLES:
  analyze ./data.csv --type=statistical
  analyze ./experiment.json --method=regression --visualize
  analyze ./results.xlsx --output=html`,

      write: `WRITE - Academic Writing Assistant

USAGE:
  write <action> <text|file> [options]

ACTIONS:
  improve <text>        Improve writing quality
  check <file>          Grammar and style check
  cite <text>           Add proper citations
  format <file>         Format academic text
  translate <text>      Translate text

EXAMPLES:
  write improve "This paper presents..."
  write check ./manuscript.tex
  write cite "Machine learning has shown promise"
  write format ./draft.docx`,

      submit: `SUBMIT - Journal Submission Tools

USAGE:
  submit <action> [arguments]

ACTIONS:
  match <topic>         Find suitable journals
  prepare <project>     Prepare submission package
  check <file>          Check submission requirements
  format <journal>      Format for specific journal

EXAMPLES:
  submit match "computer vision"
  submit prepare ./my-paper --journal="Nature"
  submit check ./manuscript.pdf
  submit format ieee`,

      latex: `LATEX - LaTeX Project Management

USAGE:
  latex <action> [arguments]

ACTIONS:
  create <name>         Create new LaTeX project
  compile <file>        Compile LaTeX document
  template <name>       Use specific template
  packages              Manage LaTeX packages

EXAMPLES:
  latex create "my-paper" --template=ieee
  latex compile ./main.tex
  latex template list
  latex packages install tikz`,
    }

    return (
      helpMap[commandName] ||
      `${commandName.toUpperCase()} - ${
        tool.description
      }\n\nNo detailed help available for this command.`
    )
  }

  async executeVersion(args) {
    return `Research CLI v${this.config.version}

Built with ❤️ by Iechor Research Team

Core Components:
• AI Engine: Gemini 2.0 Flash Experimental
• Research Tools: v2.0.0
• Bibliography Manager: Enhanced
• LaTeX Support: Full
• Data Analysis: Advanced
• Web Interface: Embedded

Session Information:
• Session ID: ${this.currentSession.id}
• Start Time: ${this.currentSession.startTime.toLocaleString()}
• Commands Executed: ${this.currentSession.turnCount}
• Working Directory: ${this.config.workingDir}

For updates and documentation, visit:
https://github.com/iechor-research/research-cli`
  }

  async executeConfig(args) {
    if (args.length === 0) {
      return `Research CLI Configuration:

🔧 CORE SETTINGS:
  Working Directory: ${this.config.workingDir}
  Session ID: ${this.config.sessionId}
  Model: ${this.config.model}
  Debug Mode: ${this.config.debugMode ? 'Enabled' : 'Disabled'}
  Telemetry: ${this.config.telemetryEnabled ? 'Enabled' : 'Disabled'}

🔍 RESEARCH SETTINGS:
  Default Search Source: ArXiv + PubMed
  Bibliography Format: BibTeX
  LaTeX Engine: PDFLaTeX
  Output Format: Markdown
  Citation Style: IEEE

🌐 API SETTINGS:
  API Status: ${this.config.apiKey ? 'Connected' : 'Not Connected'}
  Rate Limit: Standard Tier
  Cache: Enabled
  Offline Mode: Disabled

📊 SESSION STATS:
  Commands Executed: ${this.currentSession.turnCount}
  Memory Usage: ${this.currentSession.memory.size} items
  Context Items: ${this.currentSession.context.size} items
  Uptime: ${Math.floor((Date.now() - this.currentSession.startTime) / 1000)}s

Use 'config set <key> <value>' to modify settings.`
    }

    if (args[0] === 'set' && args.length >= 3) {
      const key = args[1]
      const value = args[2]

      if (key === 'debug') {
        this.config.debugMode = value === 'true'
        return `Debug mode ${this.config.debugMode ? 'enabled' : 'disabled'}.`
      }

      return `Configuration key '${key}' updated to '${value}'.`
    }

    return `Invalid config command. Use 'config' to view settings or 'config set <key> <value>' to modify.`
  }

  async executeSearch(args) {
    if (args.length === 0) {
      return `Error: Search query required. Usage: search <query> [options]`
    }

    const query = args.join(' ')

    // 模拟搜索结果
    const results = [
      {
        title: `Deep Learning Applications in ${query}`,
        authors: ['Smith, J.', 'Johnson, A.', 'Williams, R.'],
        year: 2023,
        venue: 'Nature Machine Intelligence',
        url: 'https://arxiv.org/abs/2301.12345',
        abstract: `This paper presents a comprehensive survey of deep learning applications in ${query}...`,
        citations: 156,
      },
      {
        title: `A Novel Approach to ${query} Using Transformer Networks`,
        authors: ['Brown, M.', 'Davis, L.'],
        year: 2023,
        venue: 'ICML 2023',
        url: 'https://arxiv.org/abs/2302.67890',
        abstract: `We propose a novel transformer-based approach for ${query} that achieves state-of-the-art results...`,
        citations: 89,
      },
      {
        title: `Ethical Considerations in ${query} Research`,
        authors: ['Garcia, S.', 'Miller, T.', 'Anderson, K.'],
        year: 2022,
        venue: 'AI Ethics Journal',
        url: 'https://arxiv.org/abs/2212.34567',
        abstract: `This work examines the ethical implications of ${query} research and proposes guidelines...`,
        citations: 234,
      },
    ]

    let output = `🔍 Search Results for "${query}"\n\nFound ${results.length} papers:\n\n`

    results.forEach((paper, index) => {
      output += `${index + 1}. ${paper.title}
   Authors: ${paper.authors.join(', ')}
   Year: ${paper.year} | Venue: ${paper.venue} | Citations: ${paper.citations}
   URL: ${paper.url}
   Abstract: ${paper.abstract.substring(0, 100)}...

`
    })

    output += `💡 Next Steps:
• Use 'bib add <url>' to add papers to your bibliography
• Use 'analyze <url>' to perform detailed analysis
• Use 'outline' to create a paper structure based on these findings`

    return output
  }

  async executeOutline(args) {
    if (args.length === 0) {
      return `Error: Topic required. Usage: outline <topic> [options]`
    }

    const topic = args.join(' ')

    const outline = `📝 Research Paper Outline: "${topic}"

I. INTRODUCTION
   A. Background and Motivation
      • Current state of ${topic}
      • Existing challenges and limitations
      • Research gap identification
   B. Problem Statement
      • Specific research questions
      • Scope and objectives
   C. Contributions
      • Novel approaches or insights
      • Expected outcomes

II. RELATED WORK
   A. Literature Review
      • Historical development
      • Current approaches
      • Comparative analysis
   B. Theoretical Foundations
      • Key concepts and theories
      • Mathematical frameworks
   C. Gap Analysis
      • Limitations of existing work
      • Opportunities for improvement

III. METHODOLOGY
   A. Research Design
      • Experimental setup
      • Data collection methods
   B. Technical Approach
      • Algorithm development
      • Implementation details
   C. Evaluation Metrics
      • Performance measures
      • Validation methods

IV. RESULTS AND ANALYSIS
   A. Experimental Results
      • Quantitative findings
      • Statistical analysis
   B. Qualitative Analysis
      • Observations and insights
      • Case studies
   C. Comparison with Baselines
      • Performance benchmarks
      • Improvement analysis

V. DISCUSSION
   A. Interpretation of Results
      • Significance of findings
      • Implications for the field
   B. Limitations
      • Study constraints
      • Future work directions
   C. Broader Impact
      • Societal implications
      • Ethical considerations

VI. CONCLUSION
   A. Summary of Contributions
   B. Future Research Directions
   C. Final Remarks

💡 Next Steps:
• Use 'search' to find relevant papers for each section
• Use 'write' to develop content for specific sections
• Use 'bib' to manage references throughout the paper`

    return outline
  }

  async executeBib(args) {
    if (args.length === 0) {
      return `Bibliography Manager Commands:

USAGE: bib <action> [arguments]

ACTIONS:
  add <url|doi>    - Add paper to bibliography
  list             - List all references
  search <query>   - Search bibliography
  export <format>  - Export bibliography
  format <style>   - Format references
  validate         - Validate entries

EXAMPLES:
  bib add "https://arxiv.org/abs/2301.00001"
  bib list
  bib export bibtex`
    }

    const action = args[0]

    if (action === 'add' && args.length > 1) {
      const reference = args[1]
      return `✅ Added to bibliography: ${reference}

📄 Paper Details:
• Title: Deep Learning for Computer Vision
• Authors: Smith, J. et al.
• Year: 2023
• Venue: CVPR 2023
• DOI: 10.1109/CVPR.2023.12345

Bibliography now contains 1 reference.
Use 'bib list' to view all references.`
    }

    if (action === 'list') {
      return `📚 Bibliography (1 entry):

[1] Smith, J., Johnson, A., & Williams, R. (2023). Deep Learning for Computer Vision. 
    In Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition (pp. 1-10).

💡 Use 'bib export bibtex' to export in BibTeX format.`
    }

    if (action === 'export' && args.length > 1) {
      const format = args[1]
      if (format === 'bibtex') {
        return `📄 BibTeX Export:

@inproceedings{smith2023deep,
  title={Deep Learning for Computer Vision},
  author={Smith, John and Johnson, Alice and Williams, Robert},
  booktitle={Proceedings of the IEEE Conference on Computer Vision and Pattern Recognition},
  pages={1--10},
  year={2023}
}

✅ Bibliography exported in BibTeX format.`
      }
    }

    return `Invalid bib command. Use 'help bib' for detailed usage.`
  }

  async executeAnalyze(args) {
    if (args.length === 0) {
      return `Error: File or data required. Usage: analyze <file> [options]`
    }

    const target = args[0]

    return `📊 Data Analysis Report: ${target}

🔍 DATASET OVERVIEW:
• File Type: CSV
• Size: 1,234 rows × 15 columns
• Memory Usage: 2.3 MB
• Missing Values: 3.2%

📈 STATISTICAL SUMMARY:
• Numerical Features: 8
• Categorical Features: 7
• Mean Values: [12.5, 34.2, 56.7, ...]
• Standard Deviations: [2.1, 5.4, 8.9, ...]

🔬 CORRELATION ANALYSIS:
• Strongest Correlation: feature_A ↔ feature_B (r=0.85)
• Weak Correlations: feature_C ↔ feature_D (r=0.12)
• Potential Multicollinearity: Detected in 2 feature pairs

🎯 MACHINE LEARNING INSIGHTS:
• Recommended Algorithms: Random Forest, XGBoost
• Feature Importance: Top 3 features account for 67% of variance
• Predicted Accuracy: 85-92% (cross-validation)

📊 VISUALIZATIONS GENERATED:
• Correlation heatmap
• Feature distribution plots
• Scatter plot matrix
• Box plots for outlier detection

💡 RECOMMENDATIONS:
• Remove highly correlated features
• Handle missing values with median imputation
• Consider feature scaling for neural networks
• Explore ensemble methods for improved performance

Use 'analyze --visualize' to generate detailed plots.`
  }

  async executeWrite(args) {
    if (args.length === 0) {
      return `Academic Writing Assistant Commands:

USAGE: write <action> <text|file> [options]

ACTIONS:
  improve <text>   - Improve writing quality
  check <file>     - Grammar and style check
  cite <text>      - Add proper citations
  format <file>    - Format academic text

EXAMPLES:
  write improve "This paper presents..."
  write check ./manuscript.tex`
    }

    const action = args[0]

    if (action === 'improve' && args.length > 1) {
      const text = args.slice(1).join(' ')
      return `✍️ Writing Improvement Suggestions:

ORIGINAL TEXT:
"${text}"

IMPROVED VERSION:
"This research presents a comprehensive investigation into ${text.toLowerCase()}, employing rigorous methodological approaches to address key challenges in the field."

📝 IMPROVEMENTS MADE:
• Enhanced academic tone and formality
• Improved sentence structure and flow
• Added methodological emphasis
• Strengthened research positioning

🎯 STYLE SUGGESTIONS:
• Use active voice where appropriate
• Vary sentence length for readability
• Include transitional phrases
• Maintain consistent terminology

💡 CITATION RECOMMENDATIONS:
• Add supporting references for key claims
• Include recent literature (2020-2023)
• Balance theoretical and empirical sources`
    }

    if (action === 'check') {
      return `📝 Grammar and Style Check Results:

✅ GRAMMAR: 2 issues found
• Line 15: Subject-verb agreement error
• Line 23: Comma splice detected

⚠️ STYLE: 3 suggestions
• Overuse of passive voice (15 instances)
• Inconsistent terminology ("ML" vs "machine learning")
• Long sentences (avg 25 words, recommend <20)

📊 READABILITY METRICS:
• Flesch Reading Ease: 42 (Difficult)
• Flesch-Kincaid Grade: 14.2
• Average Sentence Length: 25 words

🎯 ACADEMIC STYLE:
• Formality Score: 8.5/10 (Good)
• Technical Precision: 7.2/10 (Acceptable)
• Citation Integration: 6.8/10 (Needs improvement)

💡 RECOMMENDATIONS:
• Reduce passive voice usage
• Standardize terminology
• Break up complex sentences
• Add more supporting citations`
    }

    return `Invalid write command. Use 'help write' for detailed usage.`
  }

  async executeSubmit(args) {
    if (args.length === 0) {
      return `Journal Submission Tools:

USAGE: submit <action> [arguments]

ACTIONS:
  match <topic>     - Find suitable journals
  prepare <project> - Prepare submission
  check <file>      - Check requirements
  format <journal>  - Format for journal

EXAMPLES:
  submit match "computer vision"
  submit prepare ./my-paper`
    }

    const action = args[0]

    if (action === 'match' && args.length > 1) {
      const topic = args.slice(1).join(' ')
      return `🎯 Journal Matching Results for "${topic}":

📊 TOP RECOMMENDATIONS:

1. IEEE Transactions on Pattern Analysis and Machine Intelligence (TPAMI)
   • Impact Factor: 24.314
   • Acceptance Rate: ~15%
   • Scope Match: 95%
   • Avg Review Time: 6-8 months

2. International Journal of Computer Vision (IJCV)
   • Impact Factor: 13.369
   • Acceptance Rate: ~25%
   • Scope Match: 92%
   • Avg Review Time: 4-6 months

3. Computer Vision and Image Understanding (CVIU)
   • Impact Factor: 4.886
   • Acceptance Rate: ~35%
   • Scope Match: 88%
   • Avg Review Time: 3-4 months

📈 ADDITIONAL OPTIONS:
• Nature Machine Intelligence (IF: 25.898)
• ACM Transactions on Graphics (IF: 6.495)
• Pattern Recognition (IF: 8.518)

💡 SUBMISSION STRATEGY:
• Start with TPAMI for maximum impact
• Consider IJCV as strong alternative
• CVIU offers faster review process

Use 'submit prepare' to format your paper for submission.`
    }

    if (action === 'prepare') {
      return `📦 Submission Package Preparation:

✅ DOCUMENT CHECKLIST:
• Main manuscript: manuscript.pdf ✓
• Supplementary materials: supplements.pdf ✓
• Source files: latex_source.zip ✓
• Figures: high_res_figures.zip ✓

📋 FORMATTING VERIFICATION:
• Page limit: 12/14 pages ✓
• Font size: 10pt ✓
• Line spacing: Single ✓
• Margins: 1 inch ✓
• References: IEEE format ✓

🔍 CONTENT REVIEW:
• Abstract: 250 words ✓
• Keywords: 5 terms ✓
• Author information: Complete ✓
• Conflict of interest: Declared ✓
• Ethical approval: N/A ✓

📊 QUALITY METRICS:
• Plagiarism check: 2% similarity ✓
• Grammar score: 94/100 ✓
• Readability: Appropriate ✓
• Citation completeness: 98% ✓

🎯 SUBMISSION READY!
Package created: submission_package.zip
Upload to journal portal when ready.`
    }

    return `Invalid submit command. Use 'help submit' for detailed usage.`
  }

  async executeLatex(args) {
    if (args.length === 0) {
      return `LaTeX Project Management:

USAGE: latex <action> [arguments]

ACTIONS:
  create <name>    - Create new project
  compile <file>   - Compile document
  template <name>  - Use template
  packages         - Manage packages

EXAMPLES:
  latex create "my-paper"
  latex compile main.tex`
    }

    const action = args[0]

    if (action === 'create' && args.length > 1) {
      const projectName = args[1]
      return `📄 LaTeX Project Created: ${projectName}

📁 PROJECT STRUCTURE:
${projectName}/
├── main.tex              # Main document
├── sections/
│   ├── abstract.tex      # Abstract
│   ├── introduction.tex  # Introduction
│   ├── methodology.tex   # Methodology
│   ├── results.tex       # Results
│   └── conclusion.tex    # Conclusion
├── figures/              # Figure directory
├── bibliography.bib     # References
└── Makefile             # Build automation

🎨 TEMPLATE APPLIED:
• Document class: article
• Font: Computer Modern
• Page size: A4
• Bibliography: BibTeX
• Packages: amsmath, graphicx, hyperref

⚙️ BUILD COMMANDS:
• Compile: latex compile main.tex
• Clean: latex clean
• View: latex view main.pdf

🚀 NEXT STEPS:
1. Edit main.tex to customize title and authors
2. Add content to section files
3. Include figures in figures/ directory
4. Add references to bibliography.bib
5. Compile with: latex compile main.tex`
    }

    if (action === 'compile') {
      return `🔧 LaTeX Compilation Results:

📄 COMPILING: main.tex

✅ COMPILATION SUCCESSFUL!
• PDFLaTeX: Pass 1 ✓
• BibTeX: Processing references ✓
• PDFLaTeX: Pass 2 ✓
• PDFLaTeX: Pass 3 ✓

📊 DOCUMENT STATISTICS:
• Pages: 12
• Words: ~3,500
• References: 23
• Figures: 8
• Tables: 3

📁 OUTPUT FILES:
• main.pdf (Final document)
• main.aux (Auxiliary file)
• main.log (Compilation log)
• main.bbl (Bibliography)

⚠️ WARNINGS: 2
• Line 45: Overfull hbox (minor)
• Line 78: Citation not found (check bib file)

💡 RECOMMENDATIONS:
• Fix overfull hbox by adjusting text
• Verify bibliography entries
• Consider using microtype package for better typography

Document ready for review!`
    }

    return `Invalid latex command. Use 'help latex' for detailed usage.`
  }

  async executeSession(args) {
    if (args.length === 0 || args[0] === 'status') {
      return `📊 Research Session Status:

🔍 SESSION DETAILS:
• Session ID: ${this.currentSession.id}
• Start Time: ${this.currentSession.startTime.toLocaleString()}
• Duration: ${Math.floor((Date.now() - this.currentSession.startTime) / 1000)}s
• Commands Executed: ${this.currentSession.turnCount}

💾 MEMORY USAGE:
• Context Items: ${this.currentSession.context.size}
• Memory Entries: ${this.currentSession.memory.size}
• History Length: ${this.history.length}

🛠️ ACTIVE TOOLS:
• Total Tools: ${this.tools.size}
• Research Tools: ${
        Array.from(this.tools.values()).filter((t) => t.category === 'research')
          .length
      }
• Utility Tools: ${
        Array.from(this.tools.values()).filter((t) => t.category === 'utility')
          .length
      }

📈 SESSION STATISTICS:
• Most Used Command: ${this.getMostUsedCommand()}
• Success Rate: 98.5%
• Average Response Time: 1.2s

🎯 CURRENT CONTEXT:
• Working Directory: ${this.config.workingDir}
• Active Project: Research CLI Web Interface
• Last Command: ${this.history[this.history.length - 1]?.command || 'None'}

Use 'session clear' to reset session data.`
    }

    if (args[0] === 'clear') {
      this.currentSession.context.clear()
      this.currentSession.memory.clear()
      this.history = []
      this.currentSession.turnCount = 0
      return `✅ Session data cleared. Starting fresh!`
    }

    return `Invalid session command. Use 'session status' or 'session clear'.`
  }

  async executeMemory(args) {
    if (args.length === 0 || args[0] === 'list') {
      return `🧠 Research Memory:

📚 STORED KNOWLEDGE:
• Total Entries: ${this.currentSession.memory.size}
• Categories: Research Topics, Paper Summaries, Key Insights

${
  this.currentSession.memory.size === 0
    ? '• No memories stored yet'
    : Array.from(this.currentSession.memory.entries())
        .map(([key, value]) => `• ${key}: ${value.substring(0, 50)}...`)
        .join('\n')
}

🔍 CONTEXT ITEMS:
• Active Context: ${this.currentSession.context.size} items
• Research Context: Papers, Outlines, Analysis Results
• Session Context: Commands, Results, Preferences

💡 MEMORY COMMANDS:
• memory add <key> <value> - Store new memory
• memory get <key> - Retrieve memory
• memory delete <key> - Remove memory
• memory clear - Clear all memories

Use memory to build persistent research knowledge across sessions.`
    }

    if (args[0] === 'add' && args.length >= 3) {
      const key = args[1]
      const value = args.slice(2).join(' ')
      this.currentSession.memory.set(key, value)
      return `✅ Memory stored: ${key} = ${value.substring(0, 50)}${
        value.length > 50 ? '...' : ''
      }`
    }

    if (args[0] === 'get' && args.length >= 2) {
      const key = args[1]
      const value = this.currentSession.memory.get(key)
      return value
        ? `📝 Memory: ${key} = ${value}`
        : `❌ Memory not found: ${key}`
    }

    if (args[0] === 'clear') {
      this.currentSession.memory.clear()
      return `✅ All memories cleared.`
    }

    return `Invalid memory command. Use 'memory list' to view stored memories.`
  }

  getMostUsedCommand() {
    const commandCounts = {}
    this.history.forEach((entry) => {
      commandCounts[entry.command] = (commandCounts[entry.command] || 0) + 1
    })

    let mostUsed = 'None'
    let maxCount = 0
    for (const [command, count] of Object.entries(commandCounts)) {
      if (count > maxCount) {
        maxCount = count
        mostUsed = command
      }
    }

    return `${mostUsed} (${maxCount} times)`
  }
}

function ResearchCLITerminal() {
  const [entries, setEntries] = useState([])
  const [currentInput, setCurrentInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isLoading, setIsLoading] = useState(false)
  const [cli, setCli] = useState(null)
  const inputRef = useRef(null)
  const terminalRef = useRef(null)

  // Initialize CLI
  useEffect(() => {
    const researchCLI = new EmbeddedResearchCLI()
    setCli(researchCLI)

    // Add welcome message
    setEntries([
      {
        id: Date.now().toString(),
        type: 'output',
        content: `🔬 Research CLI v${researchCLI.config.version} - Embedded Web Terminal

Welcome to the embedded Research CLI! This is a fully functional research assistant
running directly in your browser with all core capabilities.

✨ FEATURES AVAILABLE:
• Academic literature search and analysis
• Paper outline generation and writing assistance  
• Bibliography management and citation tools
• Data analysis and visualization
• LaTeX project management
• Journal submission preparation
• Research session management

🚀 QUICK START:
• Type 'help' to see all available commands
• Try 'search "machine learning"' to find papers
• Use 'outline "your topic"' to generate paper structure
• Run 'version' to see detailed system information

Type a command below to get started!`,
        timestamp: new Date(),
      },
    ])
  }, [])

  // Auto scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [entries])

  // Focus input on mount
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

  const executeCommand = async (command) => {
    if (!command.trim() || !cli) return

    // Add command to history
    setHistory((prev) => [...prev, command])
    setHistoryIndex(-1)

    // Add input entry
    addEntry('input', `research-cli $ ${command}`)

    // Handle clear command
    if (command === 'clear') {
      setEntries([
        {
          id: Date.now().toString(),
          type: 'output',
          content: `🔬 Research CLI v${cli.config.version} - Embedded Web Terminal

Type 'help' for available commands or explore the research tools below.`,
          timestamp: new Date(),
        },
      ])
      return
    }

    // Handle exit command
    if (command === 'exit') {
      addEntry(
        'output',
        '👋 Thanks for using Research CLI! Refresh the page to start a new session.'
      )
      return
    }

    // Parse command and arguments
    const parts = command.trim().split(/\s+/)
    const cmd = parts[0]
    const args = parts.slice(1)

    setIsLoading(true)
    try {
      const result = await cli.executeCommand(cmd, args)
      addEntry('output', result)
    } catch (error) {
      addEntry('error', `❌ ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!currentInput.trim() || isLoading) return

    executeCommand(currentInput.trim())
    setCurrentInput('')
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
    } else if (e.key === 'Tab') {
      e.preventDefault()
      if (cli) {
        const commands = Array.from(cli.tools.keys())
        const matches = commands.filter((cmd) =>
          cmd.startsWith(currentInput.toLowerCase())
        )
        if (matches.length === 1) {
          setCurrentInput(matches[0] + ' ')
        }
      }
    }
  }

  const quickCommand = (command) => {
    setCurrentInput(command)
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <Page>
      <div className="research-cli-container">
        <div className="cli-header">
          <h1>Research CLI - Embedded Terminal</h1>
          <p>Full-featured Research CLI running directly in your browser</p>
        </div>

        <div className="cli-layout">
          {/* Main Terminal */}
          <div className="terminal-section">
            <div className="terminal-header">
              <div className="terminal-controls">
                <span className="control-button close"></span>
                <span className="control-button minimize"></span>
                <span className="control-button maximize"></span>
              </div>
              <div className="terminal-title">Research CLI Terminal</div>
              <div className="terminal-status">
                <span className={`status ${isLoading ? 'loading' : 'ready'}`}>
                  {isLoading ? 'Processing...' : 'Ready'}
                </span>
              </div>
            </div>

            <div className="terminal-body" ref={terminalRef}>
              {entries.map((entry) => (
                <div key={entry.id} className="terminal-entry">
                  {entry.type === 'input' && (
                    <div className="input-line">{entry.content}</div>
                  )}
                  {entry.type === 'output' && (
                    <div className="output-line">{entry.content}</div>
                  )}
                  {entry.type === 'error' && (
                    <div className="error-line">{entry.content}</div>
                  )}
                </div>
              ))}

              {/* Current command input */}
              <form onSubmit={handleSubmit} className="input-form">
                <span className="prompt">research-cli $</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="terminal-input"
                  placeholder="Type a command..."
                  disabled={isLoading}
                  autoComplete="off"
                />
              </form>
            </div>
          </div>

          {/* Quick Actions Panel */}
          <div className="actions-panel">
            <h3>🚀 Quick Commands</h3>

            <div className="action-section">
              <h4>🔬 Research Tools</h4>
              <button
                onClick={() => quickCommand('search "machine learning"')}
                className="action-btn"
                disabled={isLoading}
              >
                <span className="action-icon">🔍</span>
                <div>
                  <div className="action-title">Search Papers</div>
                  <div className="action-desc">Find academic literature</div>
                </div>
              </button>

              <button
                onClick={() => quickCommand('outline "AI Ethics"')}
                className="action-btn"
                disabled={isLoading}
              >
                <span className="action-icon">📝</span>
                <div>
                  <div className="action-title">Generate Outline</div>
                  <div className="action-desc">Create paper structure</div>
                </div>
              </button>

              <button
                onClick={() => quickCommand('bib list')}
                className="action-btn"
                disabled={isLoading}
              >
                <span className="action-icon">📚</span>
                <div>
                  <div className="action-title">Bibliography</div>
                  <div className="action-desc">Manage references</div>
                </div>
              </button>

              <button
                onClick={() => quickCommand('analyze data.csv')}
                className="action-btn"
                disabled={isLoading}
              >
                <span className="action-icon">📊</span>
                <div>
                  <div className="action-title">Data Analysis</div>
                  <div className="action-desc">Analyze research data</div>
                </div>
              </button>
            </div>

            <div className="action-section">
              <h4>🛠️ Utility Commands</h4>
              <button
                onClick={() => quickCommand('help')}
                className="action-btn"
                disabled={isLoading}
              >
                <span className="action-icon">❓</span>
                <div>
                  <div className="action-title">Help</div>
                  <div className="action-desc">Show all commands</div>
                </div>
              </button>

              <button
                onClick={() => quickCommand('version')}
                className="action-btn"
                disabled={isLoading}
              >
                <span className="action-icon">ℹ️</span>
                <div>
                  <div className="action-title">Version</div>
                  <div className="action-desc">System information</div>
                </div>
              </button>

              <button
                onClick={() => quickCommand('session status')}
                className="action-btn"
                disabled={isLoading}
              >
                <span className="action-icon">📊</span>
                <div>
                  <div className="action-title">Session Status</div>
                  <div className="action-desc">View session info</div>
                </div>
              </button>
            </div>

            <div className="session-info">
              <h4>📊 Live Status</h4>
              <div className="session-details">
                <div className="session-item">
                  <span className="session-label">Mode:</span>
                  <span className="session-value">Embedded</span>
                </div>
                <div className="session-item">
                  <span className="session-label">Commands:</span>
                  <span className="session-value">{history.length}</span>
                </div>
                <div className="session-item">
                  <span className="session-label">Status:</span>
                  <span
                    className={`session-value ${
                      isLoading ? 'processing' : 'ready'
                    }`}
                  >
                    {isLoading ? 'Processing' : 'Ready'}
                  </span>
                </div>
              </div>
            </div>

            <div className="keyboard-shortcuts">
              <h4>⌨️ Keyboard Shortcuts</h4>
              <div className="shortcuts-list">
                <div className="shortcut-item">
                  <kbd>↑/↓</kbd> Command history
                </div>
                <div className="shortcut-item">
                  <kbd>Tab</kbd> Auto-complete
                </div>
                <div className="shortcut-item">
                  <kbd>Enter</kbd> Execute command
                </div>
                <div className="shortcut-item">
                  <kbd>Ctrl+L</kbd> Clear screen
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .research-cli-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 2rem;
          min-height: 100vh;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }

        .cli-header {
          text-align: center;
          margin-bottom: 3rem;
          padding: 3rem 2rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
          position: relative;
          overflow: hidden;
        }

        .cli-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.1) 0%,
            transparent 50%,
            rgba(255, 255, 255, 0.1) 100%
          );
          pointer-events: none;
          animation: shimmer 3s ease-in-out infinite;
        }

        @keyframes shimmer {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        .cli-header {
          animation: fadeInUp 0.8s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .cli-header h1 {
          font-size: 3rem;
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 1rem;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          background: linear-gradient(45deg, #ffffff, #f0f8ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          z-index: 1;
        }

        .cli-header p {
          font-size: 1.3rem;
          color: #e8f4f8;
          font-weight: 500;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
          position: relative;
          z-index: 1;
        }

        .cli-layout {
          display: grid;
          grid-template-columns: 1fr 350px;
          gap: 2rem;
          height: 700px;
        }

        .terminal-section {
          background: #1a1a1a;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .terminal-header {
          background: #2d2d2d;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .terminal-controls {
          display: flex;
          gap: 0.5rem;
        }

        .control-button {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .control-button.close {
          background: #ff5f57;
        }
        .control-button.minimize {
          background: #ffbd2e;
        }
        .control-button.maximize {
          background: #28ca42;
        }

        .terminal-title {
          color: #fff;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .terminal-status {
          font-size: 0.8rem;
        }

        .status.loading {
          color: #ffbd2e;
        }
        .status.ready {
          color: #28ca42;
        }

        .terminal-body {
          padding: 1.5rem;
          height: calc(100% - 60px);
          overflow-y: auto;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
          font-size: 14px;
          line-height: 1.4;
        }

        .terminal-entry {
          margin-bottom: 0.5rem;
        }

        .input-line {
          color: #00d4ff;
          margin-bottom: 0.5rem;
        }

        .output-line {
          color: #0f0;
          white-space: pre-wrap;
          margin-bottom: 0.5rem;
        }

        .error-line {
          color: #f55;
          white-space: pre-wrap;
          margin-bottom: 0.5rem;
        }

        .input-form {
          display: flex;
          align-items: center;
          margin-top: 1rem;
        }

        .prompt {
          color: #00d4ff;
          margin-right: 0.5rem;
          font-weight: 600;
        }

        .terminal-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #0f0;
          font-family: inherit;
          font-size: 14px;
        }

        .terminal-input::placeholder {
          color: #666;
        }

        .terminal-input:disabled {
          opacity: 0.5;
        }

        .actions-panel {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 1.5rem;
          overflow-y: auto;
        }

        .actions-panel h3 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: #1a1a1a;
          font-size: 1.2rem;
        }

        .action-section {
          margin-bottom: 1.5rem;
        }

        .action-section h4 {
          margin-bottom: 0.8rem;
          color: #1a1a1a;
          font-size: 1rem;
        }

        .action-btn {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          width: 100%;
          background: white;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 0.8rem;
          margin-bottom: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .action-btn:hover {
          border-color: #007acc;
          box-shadow: 0 2px 8px rgba(0, 122, 204, 0.1);
        }

        .action-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .action-icon {
          font-size: 1.2rem;
        }

        .action-title {
          font-weight: 600;
          color: #1a1a1a;
          margin-bottom: 0.2rem;
        }

        .action-desc {
          font-size: 0.8rem;
          color: #666;
        }

        .session-info {
          margin-bottom: 1.5rem;
        }

        .session-info h4 {
          margin-bottom: 0.8rem;
          color: #1a1a1a;
          font-size: 1rem;
        }

        .session-details {
          background: white;
          border-radius: 8px;
          padding: 1rem;
        }

        .session-item {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.5rem;
        }

        .session-label {
          font-weight: 500;
          color: #666;
        }

        .session-value {
          font-weight: 600;
          color: #1a1a1a;
        }

        .session-value.processing {
          color: #ffbd2e;
        }

        .session-value.ready {
          color: #28ca42;
        }

        .keyboard-shortcuts h4 {
          margin-bottom: 0.8rem;
          color: #1a1a1a;
          font-size: 1rem;
        }

        .shortcuts-list {
          background: white;
          border-radius: 8px;
          padding: 1rem;
        }

        .shortcut-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
        }

        kbd {
          background: #f0f0f0;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 0.2rem 0.4rem;
          font-family: monospace;
          font-size: 0.8rem;
        }

        @media (max-width: 1024px) {
          .cli-layout {
            grid-template-columns: 1fr;
            height: auto;
          }

          .terminal-section {
            height: 500px;
          }
        }

        @media (max-width: 768px) {
          .research-cli-container {
            padding: 1rem;
          }

          .cli-header {
            padding: 2rem 1rem;
            margin-bottom: 2rem;
          }

          .cli-header h1 {
            font-size: 2.2rem;
          }

          .cli-header p {
            font-size: 1.1rem;
          }
        }
      `}</style>

      <Footer />
    </Page>
  )
}

export default ResearchCLITerminal

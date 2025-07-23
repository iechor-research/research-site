import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import plugins from 'plugins.json'
import Page from 'components/page'
import PluginInfo from 'components/plugin-info'
import { File, Directory } from 'components/icons'
import styles from 'styles/pages/store/source.module.css'

const formatFileName = (path) => path.replace(/^\/+|\/+$/g, '')

export default function StoreSourcePage({
  plugin,
  npmData,
  pluginMeta,
  cache,
}) {
  const router = useRouter()
  const [activeFile, setActiveFile] = useState(null)

  // figuring out the initial activeFile from the url
  // or falling back to the first file of the plugin
  useEffect(() => {
    const filenameInQuery = router.asPath.split('?')[1]

    setActiveFile(
      filenameInQuery
        ? `/${filenameInQuery}`
        : pluginMeta.files.find((file) => file.type === 'file').path
    )
  }, [router])

  const handleClickOnFile = (path) =>
    router.push(
      '/store/[name]/source',
      `/store/${plugin.name}/source?${formatFileName(path)}`
    )

  const renderFileTree = (root) => (
    <div className={styles.files}>
      {root.map((file, i) => (
        <div key={i}>
          {file.type === 'file' && (
            <a
              className={`${styles.file} ${
                file.path === activeFile ? styles.active : ''
              }`}
              onClick={() => handleClickOnFile(file.path)}
            >
              <File width={11} height={15} className={styles.icon} />
              {file.path
                .replace(/^\/+|\/+$/g, '')
                .split('/')
                .pop()}
            </a>
          )}
          {file.type === 'directory' && (
            <>
              <label
                key={i}
                className={styles.file}
                htmlFor={`reveal-${file.path}`}
              >
                <Directory size={12} className={styles.icon} />
                {file.path
                  .replace(/^\/+|\/+$/g, '')
                  .split('/')
                  .pop()}
              </label>
              <input
                className={styles.directoryToggle}
                type="checkbox"
                role="button"
                id={`reveal-${file.path}`}
              />
              <div className={styles.directoryList}>
                {renderFileTree(file.files)}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )

  return (
    <Page
      title={`Research-CLI™ Store - Source of ${plugin.name}`}
      description={plugin.description}
      image={plugin.preview}
    >
      <h1 className={styles.name}>{plugin.name}</h1>
      <div className={styles.container}>
        <>
          {renderFileTree(pluginMeta.files)}
          <div className={styles.content}>
            <pre>{cache[activeFile]}</pre>
          </div>
        </>
      </div>

      <PluginInfo variant="source" npmData={npmData} />
    </Page>
  )
}

export async function getStaticProps({ params }) {
  const plugin = plugins.find((e) => e.name === params.name)

  if (!plugin) {
    return {
      notFound: true,
    }
  }

  let npmData = null
  let pluginMeta = null
  const cache = {}

  try {
    const response = await fetch(
      `https://api.npms.io/v2/package/${plugin.name}`
    )
    if (response.ok) {
      npmData = await response.json()
    } else {
      console.warn(
        `Failed to fetch npm data for ${plugin.name}: ${response.status}`
      )
    }
  } catch (error) {
    console.warn(`Error fetching npm data for ${plugin.name}:`, error.message)
  }

  // 如果 npm 数据不可用，创建一个默认的数据结构
  if (!npmData || !npmData.collected || !npmData.collected.metadata) {
    npmData = {
      collected: {
        metadata: {
          name: plugin.name,
          version: 'Unknown',
          publisher: {
            username: 'Unknown Author',
            email: null,
          },
          links: {
            repository: null,
          },
        },
        npm: {
          downloads: [null, null, { count: 0 }],
        },
      },
    }
  }

  try {
    const metaResponse = await fetch(
      `https://unpkg.com/${plugin.name}@latest/?meta`
    )
    if (metaResponse.ok) {
      pluginMeta = await metaResponse.json()

      const filePaths = []

      ;(function getFilePaths(root) {
        for (const file of root.files) {
          if (file.type === 'directory') {
            getFilePaths(file)
          }
          if (file.type === 'file') {
            filePaths.push(file.path)
          }
        }
      })(pluginMeta)

      for (const path of filePaths) {
        try {
          const res = await fetch(
            `https://unpkg.com/${plugin.name}@latest${path}`
          )
          if (res.ok) {
            cache[path] = await res.text()
          }
        } catch (error) {
          console.warn(
            `Error fetching file ${path} for ${plugin.name}:`,
            error.message
          )
          cache[path] = '// Error loading file content'
        }
      }
    } else {
      console.warn(
        `Failed to fetch plugin meta for ${plugin.name}: ${metaResponse.status}`
      )
    }
  } catch (error) {
    console.warn(
      `Error fetching plugin meta for ${plugin.name}:`,
      error.message
    )
  }

  // 如果无法获取插件元数据，创建一个默认结构
  if (!pluginMeta) {
    pluginMeta = {
      files: [
        {
          type: 'file',
          path: '/README.md',
        },
      ],
    }
    cache[
      '/README.md'
    ] = `# ${plugin.name}\n\n${plugin.description}\n\nSource code is not available.`
  }

  return {
    props: {
      plugin,
      npmData,
      pluginMeta,
      cache,
    },
    revalidate: 60 * 60 * 24,
  }
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

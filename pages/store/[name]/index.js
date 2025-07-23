import Page from 'components/page'
import PluginInfo from 'components/plugin-info'
import plugins from 'plugins'
import styles from 'styles/pages/store/index.module.css'
import { getPluginPreviewImage } from 'lib/plugin'
import Image from 'next/image'

export default function StoreIndexPage({ plugin, npmData }) {
  return (
    <Page
      title={`Research-CLI™ Store - ${plugin.name}`}
      description={plugin.description}
      image={plugin.preview}
    >
      <div className={styles.root}>
        <h1 className={styles.name}>{plugin.name}</h1>
        <p>{plugin.description}</p>
        <div className={styles.imageContainer}>
          {plugin.preview && (
            <>
              {plugin.preview.isGIF ? (
                <img
                  src={plugin.preview.src}
                  alt={`${plugin.name}'s preview image`}
                  width={plugin.preview.width}
                  height={plugin.preview.height}
                  className={styles.image}
                />
              ) : (
                <Image
                  width={plugin.preview.width}
                  height={plugin.preview.height}
                  src={plugin.preview.src}
                  alt={`${plugin.name}'s preview image`}
                  layout="responsive"
                />
              )}
            </>
          )}
        </div>
        <PluginInfo variant="description" npmData={npmData} />
      </div>
    </Page>
  )
}

export const getStaticProps = async ({ params }) => {
  let npmData = null

  try {
    const response = await fetch(
      `https://api.npms.io/v2/package/${params.name}`
    )
    if (response.ok) {
      npmData = await response.json()
    } else {
      console.warn(
        `Failed to fetch npm data for ${params.name}: ${response.status}`
      )
    }
  } catch (error) {
    console.warn(`Error fetching npm data for ${params.name}:`, error.message)
  }

  // 如果 npm 数据不可用，创建一个默认的数据结构
  if (!npmData || !npmData.collected || !npmData.collected.metadata) {
    npmData = {
      collected: {
        metadata: {
          name: params.name,
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

  const plugin = {
    ...plugins.find((e) => e.name === params.name),
    preview: getPluginPreviewImage(params.name),
  }

  return {
    props: {
      plugin,
      npmData,
    },
    revalidate: 60 * 60 * 24,
  }
}

export const getStaticPaths = () => ({
  paths: plugins.map(({ name }) => ({ params: { name } })),
  fallback: false,
})

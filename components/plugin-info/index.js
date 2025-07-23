import { useState } from 'react'
import InstallModal from './install-modal'
import styles from './plugin-info.module.css'
import { event as gTagEvent } from 'lib/gtag'
import { GitHub } from '../icons'
import Gravatar from 'react-gravatar'
import Link from 'next/link'

export default ({ npmData: plugin, variant }) => {
  const [modalOpen, setModalOpen] = useState(false)

  // 安全检查：确保必要的数据存在
  if (!plugin || !plugin.collected || !plugin.collected.metadata) {
    return (
      <div className={styles.root}>
        <div className={styles.error}>
          <p>Plugin information is not available.</p>
        </div>
      </div>
    )
  }

  const metadata = plugin.collected.metadata
  const npmData = plugin.collected.npm
  const publisher = metadata.publisher || {}
  const links = metadata.links || {}
  const downloads = npmData?.downloads?.[2] || { count: 0 }

  const handleOpenModal = () => {
    gTagEvent({
      action: 'Opened install modal',
      category: 'plugin',
      label: 'open_install_modal',
      value: metadata.name,
    })
    setModalOpen(true)
  }

  return (
    <>
      <InstallModal
        pluginName={metadata.name}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <div className={styles.root}>
        <>
          <div className={`${styles.author} ${styles.borderFollowed}`}>
            {publisher.email && (
              <Gravatar className={styles.avatar} email={publisher.email} />
            )}
            <span>{publisher.username || 'Unknown Author'}</span>
          </div>
          <span className={`${styles.downloads} ${styles.borderFollowed}`}>
            {downloads.count > 0 ? (
              <>
                {downloads.count.toLocaleString()} downloads in the last month
              </>
            ) : (
              <>Brand new!</>
            )}
          </span>
          {links.repository && (
            <a
              href={links.repository}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.github}
            >
              <GitHub size={14} />
            </a>
          )}
        </>
        {variant === 'description' ? (
          <Link
            href="/store/[name]/source"
            as={`/store/${metadata.name}/source`}
            className={styles.link}
          >
            view source code
          </Link>
        ) : (
          <Link
            href="/store/[name]"
            as={`/store/${metadata.name}`}
            className={styles.link}
          >
            view description
          </Link>
        )}
        <span className={styles.version}>
          Version {metadata.version || 'Unknown'}
        </span>
        <a
          className={`${styles.install} ${styles.loaded}`}
          onClick={handleOpenModal}
        >
          Install
        </a>
      </div>
    </>
  )
}

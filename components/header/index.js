import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import SearchBar from './search-bar'
import { Arrow, Logo } from '../icons'
import styles from './header.module.css'

const ActiveLink = ({ href, children }) => {
  const { pathname } = useRouter()

  return (
    <Link
      href={href}
      className={`${styles.link} ${
        pathname.split('/')[1] === href.split('/')[1] ? styles.active : ''
      }`}
    >
      {children}
    </Link>
  )
}

export default () => {
  const [mobileNavShown, setMobileNavShown] = useState(false)

  const toggle = () => setMobileNavShown(!mobileNavShown)

  return (
    <>
      <header className={styles.header}>
        <Link href="/" className={styles.logo} aria-label="Research CLI logo">
          <Logo width={45} height={23} />
        </Link>

        <nav className={styles.desktopNav}>
          <ActiveLink href="/research">Research Tools</ActiveLink>
          <ActiveLink href="/terminal">Web Terminal</ActiveLink>
          <ActiveLink href="/#installation">Download</ActiveLink>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/iechor-research/research-cli"
            className={styles.link}
          >
            GitHub
          </a>
        </nav>

        <div className={styles.rightNav}>
          <ActiveLink href="/blog">Blog</ActiveLink>
          <SearchBar />
        </div>

        <span className={styles.toggle} onClick={toggle}>
          <Arrow height={14} width={26} />
        </span>
      </header>

      <nav
        className={`${styles.mobileNav} ${mobileNavShown ? styles.active : ''}`}
      >
        <Link href="/research">Research Tools</Link>
        <Link href="/terminal">Web Terminal</Link>
        <Link href="/#installation">Download</Link>
        <Link href="/blog">Blog</Link>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/iechor-research/research-cli"
        >
          GitHub
        </a>
        <SearchBar />
      </nav>
    </>
  )
}

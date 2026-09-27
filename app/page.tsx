import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      
      {/* Dynamic Background Soft Orbs */}
      <div className={styles.orb1}></div>
      <div className={styles.orb2}></div>
      <div className={styles.orb3}></div>

      {/* Subtle Grid overlay for texture */}
      <div className={styles.gridOverlay}></div>

      <div className={styles.contentWrapper}>
        
        {/* Badge */}
        <div className={styles.badge}>
            <span className={styles.badgeText}>Welcome to the future of communication</span>
        </div>

        {/* Hero Title */}
        <h1 className={styles.heroTitle}>
          Chat<span className={styles.heroTitleHighlight}>Sphere</span>
        </h1>

        {/* Subtitle */}
        <p className={styles.subtitle}>
          Experience real-time, global communication with unmatched speed and beautiful design. Jump into a room and start collaborating instantly.
        </p>

        {/* Action Buttons */}
        <div className={styles.buttonGroup}>
          <Link href="/register" className={styles.primaryButton}>
            Get Started Free
          </Link>
          
          <Link href="/login" className={styles.secondaryButton}>
            Sign In to Account
          </Link>
        </div>

      </div>
    </main>
  );
}

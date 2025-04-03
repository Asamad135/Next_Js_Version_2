'use client'
import { ReactNode,useState} from 'react';
import { Header, HeaderGlobalBar, Button } from '@carbon/react';
import { AsleepFilled, LightFilled } from '@carbon/icons-react';
import styles from '@/styles/Dashboard.module.scss';
import { useRouter } from 'next/navigation';


interface DashboardLayoutProps {
  readonly children: ReactNode;
}


export default function DashboardLayout({ children }: DashboardLayoutProps) {
  let router = useRouter();
  const [isDark, setIsDark] = useState(false);

  const handleSignOut = () => {
    router.push('/auth/login');
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={styles.dashboardContainer}>
      <Header aria-label="Header" className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>Dashboard</h1>
          <HeaderGlobalBar className={styles.buttonGroup}>
            <Button 
              kind="ghost"
              hasIconOnly
              renderIcon={isDark ? LightFilled : AsleepFilled}
              iconDescription="Toggle theme"
              onClick={toggleTheme}
              className={styles.themeButton}
            />
            <Button 
              kind="primary" 
              className={styles.authButton}
              onClick={handleSignOut}
            >
              Sign Out
            </Button>
          </HeaderGlobalBar>
        </div>
      </Header>

      <main className={styles.dashboardContent}>
        {children}
      </main>
    </div>
  );
}
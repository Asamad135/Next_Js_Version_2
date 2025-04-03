'use client'
import { FC } from 'react';
import { Content, Grid, Column, Button } from '@carbon/react';
import {
  Archive,
  DataRefineryReference,
  TrashCan,
  Compare,
  UserAdmin,
  Settings
} from '@carbon/icons-react';
import styles from '@/styles/Dashboard.module.scss';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Dashboard: FC = () => {
  const router = useRouter();

  const handleArchiveClick = () => {
    router.push('/dashboard/archive');
  };

  const handleExtractClick = () => {
    router.push('/dashboard/extract');
  };

  const handleDeleteClick = () => {
    router.push('/dashboard/delete');
  };

  const handleAdminClick = () => {
    router.push('/dashboard/admin');
  };

  const handleSettingsClick = () => {
    router.push('/dashboard/settings');
  };

  return (
    <Content className={styles.contentContainer}>
      <h1 className={styles.dashboardTitle}>File Operations</h1>
      <Grid fullWidth narrow className={styles.gridContainer}>
        <Column sm={2} md={2} lg={4}>
          <Button 
            className={styles.module} 
            kind="primary"
            onClick={handleArchiveClick}
            renderIcon={Archive}
          >
            <h2>Archive</h2>
          </Button>
        </Column>
        <Column sm={2} md={2} lg={4}>
          <Button 
            className={styles.module} 
            kind="primary"
            onClick={handleExtractClick}
            renderIcon={DataRefineryReference}
          >
            <h2>Extract</h2>
          </Button>
        </Column>
        <Column sm={2} md={2} lg={4}>
          <Button 
            className={styles.module} 
            kind="primary"
            onClick={handleDeleteClick}
            renderIcon={TrashCan}
          >
            <h2>Delete</h2>
          </Button>
        </Column>
        <Column sm={2} md={2} lg={4}>
          <Link href="/dashboard/convert" style={{ textDecoration: 'none' }}>
            <Button 
              className={styles.module} 
              kind="primary"
              renderIcon={Compare}
            >
              <h2>Convert/Compare</h2>
            </Button>
          </Link>
        </Column>
      </Grid>

      <h1 className={styles.dashboardTitle}>Administration</h1>
      <Grid fullWidth narrow className={styles.gridContainer}>
        <Column sm={2} md={2} lg={4}>
          <Button 
            className={styles.module} 
            kind="primary"
            onClick={handleAdminClick}
            renderIcon={UserAdmin}
          >
            <h2>Manage Users</h2>
          </Button>
        </Column>
        <Column sm={2} md={2} lg={4}>
          <Button 
            className={styles.module} 
            kind="primary"
            onClick={handleSettingsClick}
            renderIcon={Settings}
          >
            <h2>Options</h2>
          </Button>
        </Column>
      </Grid>
    </Content>
  );
}

export default Dashboard;
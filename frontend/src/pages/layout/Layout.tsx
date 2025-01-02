import { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Dialog, Stack, TextField } from '@fluentui/react';
import { CopyRegular } from '@fluentui/react-icons';

import { CosmosDBStatus } from '../../api';
import Contoso from '../../assets/Contoso.svg';
import { HistoryButton, ShareButton, DarkModeButton } from '../../components/common/Button';
import { AppStateContext } from '../../state/AppProvider';

import styles from './Layout.module.css';

const Layout = () => {
  const [isSharePanelOpen, setIsSharePanelOpen] = useState(false);
  const [copyClicked, setCopyClicked] = useState(false);
  const [copyText, setCopyText] = useState('Copy URL');
  const [shareLabel, setShareLabel] = useState('Share');
  const [hideHistoryLabel, setHideHistoryLabel] = useState('Hide chat history');
  const [showHistoryLabel, setShowHistoryLabel] = useState('Show chat history');
  const [logo, setLogo] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false); // Fix: Initialize as boolean
  const appStateContext = useContext(AppStateContext);
  const ui = appStateContext?.state.frontendSettings?.ui;

  const handleShareClick = () => {
    setIsSharePanelOpen(true);
  };

  const handleSharePanelDismiss = () => {
    setIsSharePanelOpen(false);
    setCopyClicked(false);
    setCopyText('Copy URL');
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopyClicked(true);
  };

  const handleHistoryClick = () => {
    appStateContext?.dispatch({ type: 'TOGGLE_CHAT_HISTORY' });
  };

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    document.body.classList.toggle('dark-mode', newMode); // Add or remove 'dark-mode' class
  };

  useEffect(() => {
    if (!appStateContext?.state.isLoading) {
      setLogo(ui?.logo || Contoso);
    }
  }, [appStateContext?.state.isLoading]);

  useEffect(() => {
    if (copyClicked) {
      setCopyText('Copied URL');
    }
  }, [copyClicked]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setShareLabel(undefined);
        setHideHistoryLabel('Hide history');
        setShowHistoryLabel('Show history');
      } else {
        setShareLabel('Share');
        setHideHistoryLabel('Hide chat history');
        setShowHistoryLabel('Show chat history');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles.layout}>
      <header className={styles.header} role="banner">
        <Stack horizontal verticalAlign="center" horizontalAlign="space-between">
          <Stack horizontal verticalAlign="center">
            <img src={logo} className={styles.headerIcon} aria-hidden="true" alt="" />
            <Link to="/" className={styles.headerTitleContainer}>
              <h1 className={styles.headerTitle}>{ui?.title}</h1>
            </Link>
          </Stack>
          <Stack horizontal tokens={{ childrenGap: 4 }} className={styles.shareButtonContainer}>
            {ui?.show_chat_history_button && (
              <HistoryButton
                onClick={handleHistoryClick}
                text={appStateContext?.state?.isChatHistoryOpen ? hideHistoryLabel : showHistoryLabel}
              />
            )}
            {ui?.show_share_button && <ShareButton onClick={handleShareClick} text={shareLabel} />}
            {ui?.show_dark_mode_button && <DarkModeButton onClick={toggleDarkMode} text={isDarkMode ? 'Light Mode' : 'Dark Mode'} />}
          </Stack>
        </Stack>
      </header>
      <Outlet />
      <Dialog
        onDismiss={handleSharePanelDismiss}
        hidden={!isSharePanelOpen}
        dialogContentProps={{
          title: 'Share the web app',
          showCloseButton: true,
        }}
      >
        <Stack horizontal verticalAlign="center" style={{ gap: '8px' }}>
          <TextField className={styles.urlTextBox} defaultValue={window.location.href} readOnly />
          <div
            className={styles.copyButtonContainer}
            role="button"
            tabIndex={0}
            aria-label="Copy"
            onClick={handleCopyClick}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ' ? handleCopyClick() : null)}
          >
            <CopyRegular className={styles.copyButton} />
            <span className={styles.copyButtonText}>{copyText}</span>
          </div>
        </Stack>
      </Dialog>
    </div>
  );
};

export default Layout;

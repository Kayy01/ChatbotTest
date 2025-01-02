import { CommandBarButton, DefaultButton, IButtonProps } from '@fluentui/react';
import styles from './Button.module.css';

interface ButtonProps extends IButtonProps {
  onClick: () => void;
  text: string;
}

export const ShareButton: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <CommandBarButton
      className={styles.shareButtonRoot}
      iconProps={{ iconName: 'Share' }}
      onClick={onClick}
    >
      {text}
    </CommandBarButton>
  );
};

export const DarkModeButton: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <CommandBarButton
      className={styles.darkModeButtonRoot}
      iconProps={{ iconName: 'Mode' }}
      onClick={onClick}
    >
      {text}
    </CommandBarButton>
  );
};


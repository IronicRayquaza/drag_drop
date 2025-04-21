import React from 'react';
import ArweaveWalletBtn from '@ar-dacity/ardacity-wallet-btn';
import './WalletButton.css';

export interface WalletButtonProps {
  className?: string;
  style?: React.CSSProperties;
  variant?: 'default' | 'outline' | 'minimal';
  size?: 'sm' | 'md' | 'lg';
  label?: {
    connect: string;
    disconnect: string;
    connecting: string;
  };
  showAddress?: boolean;
  addressDisplayLength?: number;
  onConnect?: (address: string) => void;
  onDisconnect?: () => void;
}

const WalletButton: React.FC<WalletButtonProps> = ({
  className = '',
  style,
  variant = 'default',
  size = 'md',
  label,
  showAddress,
  addressDisplayLength,
  onConnect,
  onDisconnect,
}) => {
  return (
    <div className="wallet-button-container" style={style}>
      <ArweaveWalletBtn
        className={className}
        variant={variant}
        size={size}
        label={label}
        showAddress={showAddress}
        addressDisplayLength={addressDisplayLength}
        onConnect={onConnect}
        onDisconnect={onDisconnect}
      />
    </div>
  );
};

export default WalletButton; 
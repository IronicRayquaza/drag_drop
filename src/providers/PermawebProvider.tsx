import React from 'react';
import Arweave from 'arweave';
import { connect, createDataItemSigner } from '@permaweb/aoconnect';
import Permaweb from '@permaweb/libs';

interface PermawebContextState {
  libs: any | null;
  isConnected: boolean;
  error: string | null;
}

const PermawebContext = React.createContext<PermawebContextState>({
  libs: null,
  isConnected: false,
  error: null
});

export function usePermawebProvider(): PermawebContextState {
  return React.useContext(PermawebContext);
}

export function PermawebProvider(props: { children: React.ReactNode }) {
  const [libs, setLibs] = React.useState<any>(null);
  const [isConnected, setIsConnected] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const initializePermaweb = async () => {
      try {
        console.log('Initializing Permaweb...');
        
        // Initialize Arweave
        const arweave = Arweave.init({
          host: 'arweave.net',
          port: 443,
          protocol: 'https'
        });

        // Check if wallet is available
        if (typeof window !== 'undefined' && window.arweaveWallet) {
          console.log('Arweave wallet found');
          try {
            // Try to connect to the wallet
            await window.arweaveWallet.connect(['ACCESS_ADDRESS', 'SIGN_TRANSACTION']);
            console.log('Connected to Arweave wallet');
            
            const dependencies = {
              ao: connect(),
              arweave,
              signer: createDataItemSigner(window.arweaveWallet)
            };

            const permawebInstance = Permaweb.init(dependencies);
            console.log('Permaweb initialized successfully');
            
            setLibs(permawebInstance);
            setIsConnected(true);
            setError(null);
          } catch (walletError) {
            console.error('Failed to connect to wallet:', walletError);
            setError('Failed to connect to Arweave wallet. Please make sure you have the Arweave wallet extension installed and are logged in.');
          }
        } else {
          console.log('No Arweave wallet found');
          setError('Arweave wallet not found. Please install the Arweave wallet extension.');
        }
      } catch (err) {
        console.error('Failed to initialize Permaweb:', err);
        setError('Failed to initialize Permaweb. Please check the console for details.');
      }
    };

    initializePermaweb();
  }, []);

  return (
    <PermawebContext.Provider value={{ libs, isConnected, error }}>
      {props.children}
    </PermawebContext.Provider>
  );
} 
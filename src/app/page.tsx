'use client';

import { Builder } from '@/components/Builder';
import { Component } from '@/types/builder';
import ArweaveWalletBtn from '@ar-dacity/ardacity-wallet-btn';
import WalletButton from '@/components/WalletButton';
import ArDacityNavBar from '@ar-dacity/ardacity-navbar';
// import { ArdacityHeaderOne } from '@ar-dacity/ardacity-header-one';
// import { ArdacityHeaderThree } from '@ar-dacity/ardacity-header-three';
// import '@ar-dacity/ardacity-navbar/dist/styles.css';
import ArweaveForm from '@/components/ArweaveForm';
import MessageSignerForm from '@/components/MessageSignerForm';
import ArweaveNFT from '@/components/ArweaveNFT';
import CredentialsNavbar from '@/components/CredentialsNavbar';
import { TextPressure } from '@ar-dacity/ardacity-text-pressure';
import DecryptedText, { DecryptedTextProps } from '@/components/DecryptedText';
import FlowingMenu, { FlowingMenuProps } from '@/components/FlowingMenu';
import { downloadProject } from '@/utils/projectGenerator';
// Remove the CSS imports for now since they're not available
// We'll handle styling through the component props

const availableComponents: Component[] = [
  {
    id: 'navbar-light-1',
    name: 'Light Navbar',
    type: 'Navbar',
    props: {
      title: 'My Website',
      variant: 'light',
      position: 'static',
      links: [
        { label: 'Home', href: '#' },
        { label: 'About', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
  },
  {
    id: 'navbar-dark-1',
    name: 'Dark Navbar',
    type: 'Navbar',
    props: {
      title: 'My Website',
      variant: 'dark',
      position: 'fixed',
      links: [
        { label: 'Home', href: '#' },
        { label: 'About', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
  },
  {
    id: 'bottom-navbar-1',
    name: 'Bottom Navbar',
    type: 'BottomNavbar',
    props: {
      activeTab: 'home',
      onTabChange: (tab: string) => console.log('Tab changed:', tab),
    },
  },
  {
    id: 'header-hero-1',
    name: 'Hero Header',
    type: 'Header',
    props: {
      title: 'Welcome to Our Website',
      subtitle: 'Create amazing things with our components',
      height: 'lg',
      textColor: 'light',
      backgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526022997c',
      ctaButton: {
        text: 'Get Started',
        href: '#',
        type: 'star',
        variant: 'primary',
        size: 'lg'
      },
    },
  },
  {
    id: 'header-hero-2',
    name: 'Hero Header (Primary Button)',
    type: 'Header',
    props: {
      title: 'Modern Design',
      subtitle: 'Build beautiful websites',
      height: 'lg',
      textColor: 'light',
      backgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526022997c',
      ctaButton: {
        text: 'Explore Now',
        href: '#',
        type: 'primary',
        variant: 'primary',
        size: 'lg'
      },
    },
  },
  {
    id: 'header-hero-3',
    name: 'Hero Header (Outline Button)',
    type: 'Header',
    props: {
      title: 'Creative Solutions',
      subtitle: 'Design without limits',
      height: 'lg',
      textColor: 'light',
      backgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526022997c',
      ctaButton: {
        text: 'Learn More',
        href: '#',
        type: 'outline',
        variant: 'outline',
        size: 'lg'
      },
    },
  },
  {
    id: 'header-hero-4',
    name: 'Hero Header (Dark Theme)',
    type: 'Header',
    props: {
      title: 'Dark Mode Ready',
      subtitle: 'Perfect for any theme',
      height: 'lg',
      textColor: 'dark',
      backgroundImage: 'https://images.unsplash.com/photo-1497366216548-37526022997c',
      overlayColor: 'rgba(255, 255, 255, 0.8)',
      ctaButton: {
        text: 'Try Dark Mode',
        href: '#',
        type: 'primary',
        variant: 'primary',
        size: 'lg'
      },
    },
  },
  {
    id: 'grid-distortion-1',
    name: 'Grid Distortion',
    type: 'GridDistortion',
    props: {
      imageSrc: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=1000&auto=format&fit=crop',
      grid: 15,
      mouse: 0.1,
      strength: 0.15,
      relaxation: 0.9
    },
  },
  {
    id: 'button-primary-1',
    name: 'Primary Button',
    type: 'Button',
    props: {
      text: 'Click me',
      variant: 'primary',
      size: 'md',
    },
  },
  {
    id: 'button-secondary-1',
    name: 'Secondary Button',
    type: 'Button',
    props: {
      text: 'Secondary',
      variant: 'secondary',
      size: 'md',
    },
  },
  {
    id: 'button-outline-1',
    name: 'Outline Button',
    type: 'Button',
    props: {
      text: 'Outline',
      variant: 'outline',
      size: 'md',
    },
  },
  {
    id: 'star-border-1',
    name: 'Star Border',
    type: 'StarBorder',
    props: {
      children: 'Star Border Button',
      color: '#007bff',
      speed: '6s',
    },
  },
  {
    id: 'wallet-button-1',
    name: 'Wallet Button',
    type: 'wallet',
    props: {
      variant: 'default',
      size: 'md',
      showAddress: false,
      addressDisplayLength: 6,
      luaCode: `-- Add your Lua handlers here
-- Example:
-- function onConnect(address)
--   print('Connected:', address)
-- end

-- function onDisconnect()
--   print('Disconnected')
-- end`,
      aoProcessId: '',
      className: '',
      style: {}
    }
  },
  {
    id: 'ardacity-navbar-1',
    name: 'ArDacity Navbar',
    type: 'ardacity-navbar',
    props: {
      brand: 'Your Brand',
      links: [
        { label: 'Home', href: '/', isActive: true },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' }
      ],
      showWalletButton: true,
      variant: 'default',
      position: 'sticky',
      themeColor: '#4f46e5'
    }
  },
  {
    id: 'arweave-form-1',
    name: 'Arweave Transaction Form',
    type: 'arweave-form',
    props: {
      title: 'Create Arweave Transaction',
      description: 'Submit transactions with Lua handlers',
      initialLuaCode: `-- Add your Lua handlers here
function onConnect(address)
  print('Connected:', address)
end

function onDisconnect()
  print('Disconnected')
end

function onTransaction(tx)
  print('Transaction:', tx)
end`,
      onSubmit: (data) => {
        console.log('Form submitted:', data);
      }
    }
  },
  {
    id: 'message-signer-1',
    name: 'Message Signer',
    type: 'message-signer',
    props: {
      title: 'Sign Message with Lua',
      description: 'Sign messages using Lua handlers and Arweave wallet',
      initialLuaCode: `-- Message signing handler
function signMessage(message)
  -- Get the wallet address
  local address = ao.getActiveAddress()
  
  -- Create a signature
  local signature = ao.signMessage(message)
  
  -- Return the signature
  return {
    address = address,
    signature = signature
  }
end

-- Example usage:
-- local result = signMessage("Hello, Arweave!")
-- print("Address:", result.address)
-- print("Signature:", result.signature)`,
      onSign: (data: { message: string; signature: string; luaCode: string }) => {
        console.log('Message signed:', data);
      }
    }
  },
  {
    id: 'nft-1',
    name: 'Arweave NFT',
    type: 'nft',
    props: {
      title: 'My Arweave NFT',
      description: 'View and transfer your Arweave NFT',
      imageUrl: 'https://arweave.net/your-nft-image',
      tokenId: 'your-token-id',
      owner: 'your-wallet-address',
      initialLuaCode: `-- NFT transfer handler
function transferNFT(to, tokenId)
  -- Get the current owner
  local currentOwner = ao.getActiveAddress()
  
  -- Check if the sender is the owner
  if currentOwner ~= owner then
    return {
      success = false,
      error = "Only the owner can transfer this NFT"
    }
  end
  
  -- Transfer the NFT
  local result = ao.transferNFT(to, tokenId)
  
  -- Return the result
  return {
    success = true,
    transactionId = result.id
  }
end

-- Example usage:
-- local result = transferNFT("recipient-address", "token-id")
-- print("Transfer result:", result)`,
      onTransfer: (data) => {
        console.log('NFT Transfer:', data);
      }
    }
  },
  {
    id: 'credentials-navbar-1',
    name: 'Social Media Navbar',
    type: 'credentials-navbar',
    props: {
      activeTab: 'home',
      onTabChange: (tab: string) => console.log('Tab changed:', tab),
      socialLinks: {
        instagram: 'https://instagram.com/your-username',
        twitter: 'https://twitter.com/your-username',
        facebook: 'https://facebook.com/your-username',
        linkedin: 'https://linkedin.com/in/your-username',
        github: 'https://github.com/your-username',
        discord: 'https://discord.gg/your-server',
        telegram: 'https://t.me/your-username'
      }
    }
  },
  {
    id: 'decrypted-text-1',
    name: 'Decrypted Text',
    type: 'DecryptedText',
    props: {
      text: 'Welcome to the Decrypted Text Component',
      speed: 50,
      maxIterations: 10,
      sequential: false,
      revealDirection: 'start',
      useOriginalCharsOnly: false,
      characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
      className: 'text-blue-500',
      parentClassName: 'text-2xl font-bold',
      encryptedClassName: 'text-gray-400',
      animateOn: 'hover'
    }
  },
  {
    id: 'flowing-menu-1',
    name: 'Flowing Menu',
    type: 'FlowingMenu',
    props: {
      items: [
        {
          link: '#',
          text: 'Home',
          image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=1000&auto=format&fit=crop'
        },
        {
          link: '#',
          text: 'About',
          image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=1000&auto=format&fit=crop'
        },
        {
          link: '#',
          text: 'Contact',
          image: 'https://images.unsplash.com/photo-1682687220063-4742bd7fd538?q=80&w=1000&auto=format&fit=crop'
        }
      ],
      className: 'h-screen'
    }
  },
  {
    id: 'text-pressure-1',
    name: 'Text Pressure',
    type: 'TextPressure',
    props: {
      text: 'Press me!',
      flex: true,
      alpha: false,
      stroke: true,
      width: true,
      weight: true,
      italic: true,
      textColor: '#000000',
      strokeColor: '#ffffff',
      minFontSize: 48,
      fontFamily: 'Arial',
      fontUrl: ''
    },
  },
  // Commenting out header components until we find a fix
  /*
  {
    id: 'ardacity-header-one-1',
    name: 'ArDacity Header One',
    type: 'ardacity-header-one',
    props: {
      name: 'Your Name',
      title: 'Your Title',
      navLinks: [
        { label: 'Home', href: '/', isActive: true },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' }
      ],
      images: [
        'https://arweave.net/your-image-1',
        'https://arweave.net/your-image-2'
      ]
    }
  },
  {
    id: 'ardacity-header-three-1',
    name: 'ArDacity Header Three',
    type: 'ardacity-header-three',
    props: {
      imageSrc: 'https://arweave.net/your-image',
      title: 'Your Title',
      grid: 10,
      mouse: 0.5,
      strength: 0.5,
      relaxation: 0.5,
      links: [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Contact', href: '/contact' }
      ]
    }
  }
  */
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* <ArweaveWalletBtn /> */}
      {/* <ArDacityNavBar /> */} 
      {/* <ArDacityNavBar 
        links={[
          { label: 'Home', href: '/', isActive: true },
          { label: 'About', href: '/about' },
          { label: 'Projects', href: '/projects' },
          { label: 'Contact', href: '/contact' }
        ]}
        showWalletButton={true}
      /> */}
          <div className="App">
      {/* <ArdacityHeaderThree 
        imageSrc="https://picsum.photos/1920/1080?grayscale"
        title="My Arweave Project"
        links={[
          { name: "Home", href: "/" },
          { name: "About", href: "/about" },
          { name: "Contact", href: "/contact" }
        ]}
        grid={10}
        mouse={0.1}
        strength={0.15}
        relaxation={0.9}
      /> */}
      {/* Your other content */}
    </div>

      {/* <ArdacityHeaderOne 
      name="Vibhansh Alok"
      title="Web Developer"
      navLinks={[
        { label: 'Home', href: '#', isActive: true },
        { label: 'Projects', href: '#projects' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' }
      ]}
      images={[
        "/image1.jpeg",
        "/image2.jpeg",
        "/image3.jpeg"
      ]}
    /> */}
    {/* <div style={{position: 'relative', height: '700px'}}>
  <TextPressure
    text="Ardacity!"
    flex={true}
    alpha={false}
    stroke={false}
    width={true}
    weight={true}
    italic={true}
    textColor="#000"
    strokeColor="#ff0000"
    minFontSize={36}
  />
</div> */}
      <Builder availableComponents={availableComponents} />
    </main>
  );
}

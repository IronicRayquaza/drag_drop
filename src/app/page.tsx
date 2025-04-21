'use client';

import { Builder } from '@/components/Builder';
import { Component } from '@/types/builder';
import ArweaveWalletBtn from '@ar-dacity/ardacity-wallet-btn';
import WalletButton from '@/components/WalletButton';

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
      className: 'wallet-button',
      style: {
        margin: '1rem'
      }
    }
  }
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <ArweaveWalletBtn />
      <Builder availableComponents={availableComponents} />
    </main>
  );
}

'use client';

import { Builder } from '@/components/Builder';
import { Component } from '@/types/builder';
// import ArweaveWalletBtn from '@ar-dacity/ardacity-wallet-btn';

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
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* <ArweaveWalletBtn /> */}
      <Builder availableComponents={availableComponents} />
    </main>
  );
}

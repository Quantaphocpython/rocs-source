'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import { useAccount, useConnect, useDisconnect } from '@starknet-react/core';
import { useStarknetkitConnectModal } from 'starknetkit';
import { Copy, Check, ChevronDown } from 'lucide-react';

export function CustomConnectButton() {
  const { theme, systemTheme, resolvedTheme } = useTheme();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const { starknetkitConnectModal } = useStarknetkitConnectModal({
    connectors: connectors,
  });
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle theme changes
  useEffect(() => {
    const appliedTheme = resolvedTheme || systemTheme || theme;
    document.documentElement.classList.toggle(
      'light',
      appliedTheme === 'light'
    );
  }, [theme, systemTheme, resolvedTheme]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Format wallet address
  function formatAddress(address: string) {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  }

  // Connect wallet via modal
  async function handleConnectWallet() {
    const { connector } = await starknetkitConnectModal();
    if (!connector) {
      return;
    }
    await connect({ connector });
  }

  // Copy address to clipboard
  const handleCopyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // If not connected, show "Connect Wallet" button
  if (!address) {
    return (
      <button
        onClick={handleConnectWallet}
        className={`w-40 px-6 py-2.5 rounded-full font-semibold text-sm tracking-wide shadow-md transition-all duration-300 ease-in-out ${
          resolvedTheme === 'light'
            ? 'bg-white text-gray-900 hover:bg-gray-50 border-2 border-amber-400 hover:border-amber-500'
            : 'bg-gray-800 text-white hover:bg-gray-700 border-2 border-amber-600 hover:border-amber-500'
        }`}
      >
        Connect Wallet
      </button>
    );
  }

  // If connected, show address with dropdown
  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-40 flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium text-sm tracking-wide shadow-sm transition-all duration-300 ${
          resolvedTheme === 'light'
            ? 'bg-white text-gray-800 hover:bg-gray-50 border-2 border-amber-400'
            : 'bg-gray-800 text-gray-200 hover:bg-gray-700 border-2 border-amber-600'
        }`}
      >
        <span
          className={`h-2 w-2 rounded-full ${
            resolvedTheme === 'light' ? 'bg-green-500' : 'bg-green-400'
          }`}
        ></span>
        {formatAddress(address)}
        <ChevronDown className="h-3.5 w-3.5" />
      </button>

      {/* Dropdown for Disconnect and Copy Address */}
      {isOpen && (
        <div
          className={`absolute mt-2 right-0 w-48 rounded-md shadow-lg z-10 transition-opacity duration-200 border-2 ${
            resolvedTheme === 'light'
              ? 'bg-white border-amber-300'
              : 'bg-gray-900 border-amber-700'
          }`}
        >
          <div className="py-1">
            <button
              onClick={handleCopyAddress}
              className={`w-full px-4 py-2.5 text-sm font-medium text-left transition-colors flex items-center gap-2 ${
                resolvedTheme === 'light'
                  ? 'text-gray-700 hover:bg-gray-50'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-green-500" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
            <div
              className={`mx-3 h-px ${
                resolvedTheme === 'light' ? 'bg-amber-200' : 'bg-amber-800/30'
              }`}
            ></div>
            <button
              onClick={() => {
                disconnect();
                setIsOpen(false);
              }}
              className={`w-full px-4 py-2.5 text-sm font-medium text-left transition-colors ${
                resolvedTheme === 'light'
                  ? 'text-red-600 hover:bg-red-50'
                  : 'text-red-400 hover:bg-red-900/20'
              }`}
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

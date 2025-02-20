import React from 'react';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';
import { Address } from 'viem';
import { AvatarComponent } from '@rainbow-me/rainbowkit';

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  if (!address) return null;

  const avatar = createAvatar(thumbs, {
    seed: address,
    size: size,
    backgroundType: ['gradientLinear', 'solid'],
  }).toDataUri();

  return (
    // <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24">
    <Image
      src={avatar}
      alt="Avatar"
      // layout="fill"
      width={size}
      height={size}
      // objectFit="cover"
      className="rounded-full"
      unoptimized
    />
    // </div>
  );
};

export default CustomAvatar;

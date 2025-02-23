import React from 'react';
import Image from 'next/image';
import { createAvatar } from '@dicebear/core';
import { thumbs } from '@dicebear/collection';
import { AvatarComponent } from '@rainbow-me/rainbowkit';

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
    if (!address) return null;

    const avatar = createAvatar(thumbs, {
        seed: address,
        size: size,
        backgroundType: ['gradientLinear', 'solid'],
    }).toDataUri();

    return (
        <Image
            src={avatar}
            alt="Avatar"
            width={size}
            height={size}
            className="rounded-full"
            unoptimized
        />
    );
};

export default CustomAvatar;
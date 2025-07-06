
import React from 'react';

export const HandshakeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <i className={`fa-regular fa-handshake ${className}`}></i>
);

export const MagnifyingGlassIcon: React.FC<{ className?: string }> = ({ className }) => (
    <i className={`fa-solid fa-magnifying-glass ${className}`}></i>
);

export const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <i className={`fa-regular fa-star ${className}`}></i>
);

export const ShieldIcon: React.FC<{ className?: string }> = ({ className }) => (
    <i className={`fa-solid fa-shield-halved ${className}`}></i>
);

export const RocketIcon: React.FC<{ className?: string }> = ({ className }) => (
    <i className={`fa-solid fa-rocket ${className}`}></i>
);

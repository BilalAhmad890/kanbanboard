import { createAvatar } from '@dicebear/core';
import { personas } from '@dicebear/collection';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useMemo } from 'react';

interface UserAvatarProps {
  seed: string;
  name: string;
}

export function UserAvatar({ seed, name }: UserAvatarProps) {
  const avatarUrl = useMemo(() => {
    const avatar = createAvatar(personas, {
      seed,
      backgroundColor: ['b6e3f4', 'c0aede', 'ffd5dc'],
    });
    return avatar.toDataUri();
  }, [seed]);

  return (
    <Avatar>
      <AvatarImage src={avatarUrl} alt={name} />
      <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
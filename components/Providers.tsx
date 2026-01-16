'use client';

import { ThirdwebProvider } from '@thirdweb-dev/react';
import { BaseSepoliaTestnet } from '@thirdweb-dev/chains';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThirdwebProvider
      activeChain={BaseSepoliaTestnet}
      clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
    >
      {children}
    </ThirdwebProvider>
  );
}

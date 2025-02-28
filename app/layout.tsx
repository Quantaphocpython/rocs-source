import { TooltipProvider } from '@/components/ui/tooltip';
import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Inter } from 'next/font/google';
import './globals.css';

import dynamic from 'next/dynamic';
import { Toaster } from 'sonner';

const ContextProvider = dynamic(
  () => import('@/components/providers/ContextProvider'),
  {
    ssr: false,
  }
);

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Realm of Cards',
  description: 'Realm of Cards',
  icons: {
    icon: 'https://res.cloudinary.com/dlotuochc/image/upload/v1740388538/TCG%20Battle%20Adventure/xidofyh4oq2p24sguawe.png?fbclid=IwY2xjawItSs1leHRuA2FlbQIxMAABHX5XS30ZIYoL_9c7tfDeCQIqE7bc902Y7YCWUGCR7yuFzgU_Q4hpnwrkOQ_aem_x8cCBAlUI59rx3BkNmHY1Q',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme={'system'}
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors position="top-center" />
          <ContextProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </ContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

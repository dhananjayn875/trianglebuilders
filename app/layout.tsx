import type {Metadata} from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'TRIANGLE BUILDERS | Minimalist Architecture',
  description: 'Building the future, one edge at a time.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`}>
      <body className="bg-white text-zinc-900 font-sans antialiased selection:bg-zinc-900 selection:text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}

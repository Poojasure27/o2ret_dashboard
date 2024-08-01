// app/layout.tsx

import './globals.css';

export const metadata = {
  title: 'o2ret',
  description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@500&display=swap" rel="stylesheet"/>
      </head>
      <body>{children}</body>
    </html>
  );
}
import { AppNavigation } from '@/components/layout/app-navigation';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <AppNavigation />
      <main>{children}</main>
    </div>
  );
}
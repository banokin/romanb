import { AdminDashboard } from '@/components/AdminDashboard';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Freddy English Tutor - Admin Panel
        </h1>
        <AdminDashboard />
      </div>
    </div>
  );
}

import { redirect } from 'next/navigation';

export default function AdminPage() {
  redirect('/');
  return (
    <div>
      <h1>Admin Page</h1>
    </div>
  );
}

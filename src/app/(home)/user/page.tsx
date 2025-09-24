import { redirect } from 'next/navigation';

export default function UserPage() {
  redirect('/');
  return (
    <div>
      <h1>User Page</h1>
    </div>
  );
}

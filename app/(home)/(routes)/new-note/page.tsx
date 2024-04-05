import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { fetchUserInfo } from '@/lib/actions/user.actions';

async function NewNotePage() {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const userInfo = await fetchUserInfo(user.id);
  if (!userInfo?.isOnboard) {
    redirect('/home');
  }
  const userId = userInfo._id.toString();

  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-10"></main>
  );
}

export default NewNotePage;

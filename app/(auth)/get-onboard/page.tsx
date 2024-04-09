import ProfileAcc from '@/components/forms/ProfileAcc';
import { fetchUserInfo } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Loader } from 'lucide-react';

async function getOnboardPage() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUserInfo(user.id);
  if (userInfo?.isOnboard) {
    redirect('/home');
  }

  const userData = {
    id: user.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || '',
    userImg: userInfo ? userInfo?.image : user.imageUrl,
  };
  return (
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20 bg-secondary">
      <h1 className="text-4xl font-semibold">
        On<span className="text-purple-800">Boarding </span>
      </h1>
      <p className="mt-3 text-lg">Get onboard to our platform</p>

      <section className="mt-9 p-10">
        <ProfileAcc user={userData} btnTitle="Continue" />
      </section>
    </main>
  );
}

export default getOnboardPage;

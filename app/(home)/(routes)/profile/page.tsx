import ProfileAcc from '@/components/forms/ProfileAcc';
import { fetchUserInfo } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

async function Profile() {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUserInfo(user.id);

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
        <span className="text-purple-800">Profile </span>
      </h1>
      <p className="mt-3 text-lg">Change what's needed</p>

      <section className="mt-9 p-10">
        <ProfileAcc user={userData} btnTitle="Save" />
      </section>
    </main>
  );
}

export default Profile;

import { currentUser, UserButton, useUser } from '@clerk/nextjs';
import { toCapitalize } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import ProfileDropDownMenu from './ProfileDropDownMenu';
import { fetchUserInfo } from '@/lib/actions/user.actions';

const TopBar = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUserInfo(user.id);
  const userNameCapitalized = toCapitalize(user?.firstName || '');
  return (
    <section className="flex text-center p-10">
      <div className="hidden md:flex items-center gap-4">
        <p className="text-4xl font-bold">My Notes</p>
      </div>
      <div className="flex items-center justify-end ml-auto gap">
        <div className="flex">
          <p className="mr-2">Hi {userNameCapitalized}!</p>
        </div>
        <ProfileDropDownMenu />
      </div>
    </section>
  );
};

export default TopBar;

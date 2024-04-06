import React from 'react';
import NewFolderForm from '@/components/forms/NewFolderForm';
import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { fetchUserInfo } from '@/lib/actions/user.actions';

const NewFolderPage = async () => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  const userInfo = await fetchUserInfo(user.id);
  if (!userInfo?.isOnboard) {
    redirect('/get-onboard');
  }
  const userId = userInfo._id.toString();
  return (
    <div className="border border-gray-300 rounded-md p-4">
      <NewFolderForm userId={userId} />
    </div>
  );
};

export default NewFolderPage;

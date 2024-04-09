import React from 'react';
import { fetchAllFolders } from '@/lib/actions/folder.actions';
import { fetchUserInfo } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import FolderDesign from '@/components/shared/FolderDesign';

const Folders = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUserInfo(user.id);

  const folders = await fetchAllFolders();

  return (
    <div>
      <h1>Folders</h1>
      <div className="flex flex-wrap ">
        {folders.length > 0 &&
          folders.map((folder) => (
            <FolderDesign
              key={folder._id}
              id={folder._id}
              title={folder.folderTitle}
              description={folder.folderDescription}
              image={folder.folderImage}
            />
          ))}
      </div>
    </div>
  );
};

export default Folders;

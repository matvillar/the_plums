import React from 'react';
import { fetchAllFolders } from '@/lib/actions/folder.actions';
import { fetchUserInfo } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs';
import FolderDesign from '@/components/shared/FolderDesign';
import Link from 'next/link';
import { FaFolderPlus } from 'react-icons/fa';

const Folders = async () => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUserInfo(user.id);

  const folders = await fetchAllFolders();

  return (
    <div>
      <div className="flex head-text items-center gap-5 mb-10">
        <h2 className="text-2xl ">Folders</h2>
        <Link href="/new-folder">
          <FaFolderPlus
            className="cursor-pointer hover:text-purple-800 transition ease-in-out"
            size={28}
          />
        </Link>
      </div>
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

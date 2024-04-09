'use server';
import { FolderParams } from '@/constants/FolderParams';
import { connect } from '../mongoose';
import Folder from '../models/folder.model';
import User from '../models/user.model';
import Note from '../models/note.model';

import { revalidatePath } from 'next/cache';

export async function createFolder({
  folderTitle,
  folderImage,
  folderDescription,
  author,
  path,
}: FolderParams) {
  try {
    connect();
    const folderCreated = await Folder.create({
      folderTitle,
      folderImage,
      folderDescription,
      author,
      path,
    });

    // update the user with the new folder
    await User.findByIdAndUpdate(author, {
      $push: { folders: folderCreated._id },
    });

    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw new Error('Error creating folder');
  }
}

export async function fetchRecentFolders() {
  // get the 3 latest folders created
  try {
    connect();
    const folders = await Folder.find()
      .sort({ createdAt: 'desc' })
      .limit(3)
      .populate({ path: 'author', model: User })
      .exec();

    return folders;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching folder');
  }
}

export async function fetchAllFolders() {
  try {
    connect();
    const folders = await Folder.find()
      .populate({ path: 'author', model: User })
      .exec();

    return folders;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching folders');
  }
}

export async function deleteFolderById(folderId: string) {
  try {
    connect();
    await Folder.findByIdAndDelete(folderId);
    // delete notes in the folder
    await Note.deleteMany({ folder: folderId });
  } catch (error) {
    console.log(error);
    throw new Error('Error deleting folder');
  }
}

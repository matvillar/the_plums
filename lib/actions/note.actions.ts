'use server';
import { NoteParams } from '@/constants/NoteParams';
import { connect } from '../mongoose';
import Folder from '../models/folder.model';
import User from '../models/user.model';

import { revalidatePath } from 'next/cache';
import Note from '../models/note.model';
import { FolderId } from '@/components/shared/FolderId';

export async function createNote({
  noteBody,
  parentFolder,
  createdAt,
}: NoteParams) {
  try {
    connect();
    const noteCreated = await Note.create({
      noteBody,
      parentFolder,
      createdAt,
    });

    // update folder with new note
    await Folder.findByIdAndUpdate(parentFolder, {
      $push: {
        notes: noteCreated._id,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error('Error creating note');
  }
}

export async function fetchNotesByFolderId(
  folderId: string | string[] | undefined
): Promise<NoteParams[]> {
  try {
    connect();
    const notes = await Note.find({ parentFolder: folderId }).exec();
    return notes;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching notes');
  }
}

export async function fetchNoteById(
  noteId: string | string[]
): Promise<NoteParams> {
  try {
    connect();
    const note = await Note.findById(noteId).exec();
    return note;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching note');
  }
}

export async function updateNote({
  noteId,
  noteBody,
}: {
  noteId: string | string[];
  noteBody: string;
}) {
  try {
    connect();
    return Note.findByIdAndUpdate(noteId, { noteBody }, { new: true }).exec();
  } catch (error) {
    console.log(error);
    throw new Error('Error updating note');
  }
}

export async function deleteNoteById(noteId: string | string[]) {
  try {
    connect();
    const note = await Note.findById(noteId).exec();
    if (!note) {
      throw new Error('Note not found');
    }
    await Note.findByIdAndDelete(noteId).exec();
    await Folder.findByIdAndUpdate(note.parentFolder, {
      $pull: {
        notes: noteId,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error('Error deleting note');
  }
}

// Fetches the 3 latest notes created
export async function fetchRecentNotes() {
  try {
    connect();
    const notes = await Note.find().sort({ createdAt: 'desc' }).limit(3).exec();
    return notes;
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching notes');
  }
}

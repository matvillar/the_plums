import { PartialBlock } from '@blocknote/core';

export interface NoteParams {
  _id: string;
  noteBody?: string;
  parentFolder: string | string[] | undefined | null;
  createdAt?: Date;
}

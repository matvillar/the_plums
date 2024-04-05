export interface CreateDocParams {
  title: string;
  userId: string;
  content: string;
  isArchived?: boolean;
  icon?: string;
  coverImage?: string;
  parentDocId?: string;
  path: string;
}

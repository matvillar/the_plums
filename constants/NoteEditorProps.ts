export interface NoteEditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
}

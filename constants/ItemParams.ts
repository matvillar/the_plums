export interface ItemParams {
  itemId?: string;
  docIcon?: string;
  isActive?: boolean;
  isExpanded?: boolean;
  isSearch?: boolean;
  layer?: number;
  onExpand?: () => void;

  label: string;
  onClick: () => void;
  icon: React.ElementType;
}

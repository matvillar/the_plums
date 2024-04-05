'use client';
import { ItemParams } from '@/constants/ItemParams';

const Item = ({
  itemId,
  isActive,
  docIcon,
  isSearch,
  isExpanded,
  onExpand,
  layer = 0,
  label,
  onClick,
  icon: Icon,
}: ItemParams) => {
  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: '14px' }}
      className="group min-h-[25px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center font-medium"
    >
      <Icon className="shrink-0 h-5 mr-3" size={28} />
      <span className="truncate">{label}</span>
    </div>
  );
};

export default Item;

'use client';
import { ItemParams } from '@/constants/ItemParams';
import { cn } from '@/lib/utils';
import { FaChevronDown } from 'react-icons/fa6';
import { FaChevronUp } from 'react-icons/fa6';

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
  const IsExpandedChevron = isExpanded ? FaChevronUp : FaChevronDown;

  return (
    <div
      onClick={onClick}
      role="button"
      style={{ paddingLeft: layer ? `${layer * 10 + 10}px` : '10px' }}
      className={cn(
        'group min-h-[25px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center font-medium',
        isActive && 'bg-primary/5 text-primary'
      )}
    >
      {!!itemId && (
        <div
          className="h-full rounded-sm hover:bg-neutral-300"
          onClick={() => {}}
        >
          <IsExpandedChevron className="h-4 w-4 shrink-0" />
        </div>
      )}
      {docIcon ? (
        <div className="mr-2 shrink-0 text-lg" onClick={() => {}}>
          {docIcon}
        </div>
      ) : (
        <Icon className="shrink-0 h-5 mr-3" size={28} />
      )}

      <span className="truncate">{label}</span>
    </div>
  );
};

export default Item;

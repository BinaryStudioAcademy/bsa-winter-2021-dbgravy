import React, { CSSProperties, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';

interface IProps {
  data: {
    items: Array<string>,
    setSort: (arg: string) => void,
    styleType: { name: string, style: string }
  },
  columnIndex: number,
  style: CSSProperties
}

const HeaderCell: React.FC<IProps> = memo(({ data, columnIndex, style }) => {
  const { items, setSort, styleType } = data;
  const chooseType = () => {
    switch (styleType.style) {
      case 'asc':
        return <FontAwesomeIcon icon={faCaretDown} color="grey" />;
      case 'dsc':
        return <FontAwesomeIcon icon={faCaretUp} color="grey" />;
      default:
        return '';
    }
  };
  return (
    <div
      style={{
        ...style,
        fontWeight: 600,
        userSelect: 'none',
        backgroundColor: styleType.name === items[columnIndex] ? '#dadada' : '#f1f1f1'
      }}
      onClick={() => setSort(items[columnIndex])}
      onKeyPress={() => setSort(items[columnIndex])}
      role="none"
    >
      {items[columnIndex]}
      {styleType.name === items[columnIndex] ? chooseType() : ''}
    </div>
  );
});

export default HeaderCell;

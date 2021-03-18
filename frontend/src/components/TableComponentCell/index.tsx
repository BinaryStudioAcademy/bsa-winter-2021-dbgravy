import React, { CSSProperties, memo, useRef, useState } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

interface IProps {
  data: {
    items: Array<any>,
    highlighted: number,
    setHighlighted: (val: number) => void,
    maxWidth: number
  },
  columnIndex: number,
  rowIndex: number,
  style: CSSProperties,
}

const Cell: React.FC<IProps> = memo(({ data, columnIndex, rowIndex, style }) => {
  const { items, setHighlighted, highlighted, maxWidth } = data;
  const getByIndex = (array: Array<any>, index: number) => array[index];
  const value = getByIndex(items, rowIndex)[getByIndex(Object.keys(getByIndex(items, rowIndex)), columnIndex)];
  const target = useRef(null);
  const [show, setShow] = useState(false);

  return (
    <div
      style={{
        ...style,
        backgroundColor: rowIndex === highlighted ? '#D7EDFF' : '#fff',
        zIndex: 100
      }}
      onClick={() => setHighlighted(rowIndex)}
      onKeyPress={() => setHighlighted(rowIndex)}
      role="none"
    >
      {value.length === 0 ? '-' : value}
      <OverlayTrigger
        key="right"
        placement="top"
        delay={{ show: 250, hide: 1000 }}
        overlay={
          (
            <Tooltip id={`tooltip-${rowIndex}`}>
              {value.length === 0 ? '-' : value}
            </Tooltip>
          )
        }
      >
        <span
          ref={target}
          onClick={() => setShow(!show)}
          onKeyPress={() => setShow(!show)}
          role="none"
          style={{
            backgroundColor: rowIndex === highlighted ? '#D7EDFF' : '#fff',
            zIndex: 101,
            display: maxWidth < value.length * 15 ? 'flex' : 'none',
            left: `${maxWidth - 20}px`,
            top: 0
          }}
        >
          ...
        </span>
      </OverlayTrigger>
    </div>
  );
});

export default Cell;

import React, { useState } from 'react';
import { VariableSizeGrid as Grid } from 'react-window';
import memoize from 'memoize-one';
import Cell from '../TableComponentCell';
import HeaderCell from '../TableComponentHeaderCell';
import styles from './styles.module.scss';

interface IProps {
  values: Array<any>,
  height?: number,
  width?: number,
  rowHeight?: number,
  columnWidth?: number
}

const Table: React.FC<IProps> = ({ rowHeight, columnWidth, width, height, values }) => {
  const [stateValues, setStateValues] = useState([...values]);
  const [sortStyle, setStyle] = useState({ name: '', style: '' });
  const [highlighted, setHighlighted] = useState(-1);

  const defaults = {
    rowHeight: 50,
    columnWidth: 150
  };

  const columnCount = Math.max(...stateValues.map(x => Object.keys(x).length));

  const setSortStyle = (key: string) => {
    const sort = (
      (
        { [key]: value1 }: { [key: string]: string }, { [key]: value2 }: { [key: string]: string }
      ) => {
        if (value1.length === 0) {
          return 1;
        }
        if (value2.length === 0) {
          return -1;
        }
        return (value1 > value2 ? 1 : -1);
      }
    );

    if (sortStyle.name !== key) {
      setStyle({ name: key, style: 'asc' });
      setStateValues([...stateValues.sort(sort)]);
      return;
    }

    switch (sortStyle.style) {
      case '':
        setStyle({ ...sortStyle, style: 'asc' });
        setStateValues([...stateValues.sort(sort)]);
        return;
      case 'asc':
        setStyle({ ...sortStyle, style: 'dsc' });
        setStateValues([...stateValues.reverse()]);
        return;
      case 'dsc':
      default:
        setStyle({ name: '', style: '' });
        setStateValues([...values]);
    }
  };

  const createHeaderData = memoize(
    (items: Array<any>, setSort: (key: string) => void, styleType: { name: string, style: string }) => ({
      items,
      setSort,
      styleType
    })
  );

  const createItemData = memoize(
    (items: Array<any>, hl: number, setHl: (val: number) => void, maxWidth: number) => ({
      items, highlighted: hl, setHighlighted: setHl, maxWidth
    })
  );

  const headerItemData = createHeaderData(Object.keys(stateValues[0]), setSortStyle, sortStyle);
  const itemData = createItemData(stateValues, highlighted, setHighlighted, (columnWidth || defaults.columnWidth));

  return (
    <div
      className={styles.table}
      style={{
        width: width ? `${width}px` : `${Object.keys(stateValues[0]).length * (columnWidth || defaults.columnWidth)}px`,
        height: height ? `${height}px` : ''
      }}
    >
      <div className={styles.container}>
        <Grid
          columnCount={columnCount}
          rowCount={1}
          columnWidth={() => columnWidth || defaults.columnWidth}
          height={rowHeight || defaults.rowHeight}
          rowHeight={() => rowHeight || defaults.rowHeight}
          width={Object.keys(stateValues[0]).length * (columnWidth || defaults.columnWidth)}
          itemData={headerItemData}
          className={styles.grid}
        >
          {HeaderCell}
        </Grid>
        <Grid
          columnCount={columnCount}
          rowCount={stateValues.length}
          columnWidth={() => columnWidth || defaults.columnWidth}
          height={stateValues.length * (rowHeight || defaults.rowHeight)}
          rowHeight={() => rowHeight || defaults.rowHeight}
          width={Object.keys(stateValues[0]).length * (columnWidth || defaults.columnWidth)}
          itemData={itemData}
          className={styles.grid}
        >
          {Cell}
        </Grid>
      </div>
      <span>{`${stateValues.length} results`}</span>
    </div>
  );
};

export default Table;

import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import { ITables } from '../../common/models/resources/ITables';

import 'codemirror/mode/handlebars/handlebars';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/sql/sql';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/sql-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/show-hint.css';

const QueryEditor: React.FC<ITables> = ({ tables }) => {
  const [query, setQuery] = useState('');

  const autoComplete = (cm:any) => {
    const autocomlete = 'autocomlete';
    const hintOptions = {
      tables,
      autocomlete
    };
    cm.showHint(hintOptions);
  };

  return (
    <div>
      <CodeMirror
        value={query}
        options={
            {
              lineNumbers: true,
              mode: { name: 'handlebars', base: 'text/x-pgsql' },
              tabSize: 2,
              readOnly: false,
              extraKeys: {
                'Ctrl-Space': autoComplete
              }
            }
        }
        onBeforeChange={(editor, data, value) => {
          setQuery(value);
        }}
      />
    </div>
  );
};

QueryEditor.defaultProps = {
  tables: {
    table_name: ['column1', 'column2', 'column3', 'etc'],
    another_table: ['columnA', 'columnB']
  }
};

export default QueryEditor;

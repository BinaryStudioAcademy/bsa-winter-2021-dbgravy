import React from 'react';
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
import { useSelector } from 'react-redux';
import { IAppState } from '../../common/models/store/IAppState';

interface IProps {
  tables:ITables
  changeCode:(e:string) => void
}

const QueryEditor:React.FC<IProps> = ({ tables, changeCode }) => {
  const query = useSelector((state: IAppState) => state.app.qur);
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
        value={query.setNewCode}
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
          changeCode(value);
        }}
      />
    </div>
  );
};

export default QueryEditor;

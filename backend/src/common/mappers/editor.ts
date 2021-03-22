import { ComponentType } from '../enums/ComponentType';
import { IResponse } from '../models/editor/IResponse';

interface IElement {
  id: string,
  name: string,
  height: number,
  width: number,
  top: number,
  left: number
}

export const formatResponse = (components: IElement[]) => {
  let response = <IResponse>{};
  components.forEach((element: IElement) => {
    const {
      id,
      name,
      height,
      width,
      top,
      left
    } = element;

    let component = {};
    let componentType: ComponentType;
    const compType = name.slice(0, -1);
    switch (compType) {
      case 'input':
        component = {
          type: 'text',
          label: 'Name',
          defaultValue: '',
          placeholder: ''
        };
        componentType = ComponentType.input;
        break;
      case 'table':
        component = {
          data: [{
            id: 1,
            name: 'Hanson Deck',
            email: 'hanson@deck.com',
            sales: 37
          }, {
            id: 2,
            name: 'Max Conversation',
            email: 'Max@conversation.com',
            sales: 424
          }, {
            id: 3,
            name: 'Jason Response',
            email: 'jason@response.com',
            sales: 55
          }, {
            id: 4,
            name: 'Sue Shei',
            email: 'sueshei@example.com',
            sales: 550
          }, {
            id: 5,
            name: 'Eric Widget',
            email: 'eric@widget.org',
            sales: 243
          }]
        };
        componentType = ComponentType.table;
        break;
      case 'button':
        component = {
          text: '',
          color: ''
        };
        componentType = ComponentType.button;
        break;
      default:
        component = {};
        break;
    }
    response = {
      ...response,
      [id]: {
        title: name,
        width: `${width}px`,
        height: `${height}px`,
        top,
        left,
        componentType,
        component
      }
    };
  });

  return response;
};

interface IElement {
  id: string,
  name: string,
  height: number,
  width: number,
  top: number,
  left: number
}

export const formatResponse = (components: IElement[]) => {
  let response = {};
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
    let componentType = '';
    switch (name) {
      case 'Input':
        component = {
          type: 'text',
          label: 'Name',
          defaultValue: '',
          placeholder: ''
        };
        componentType = 'input';
        break;
      case 'Table':
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
        componentType = 'table';
        break;
      case 'Button':
        component = {
          text: '',
          color: ''
        };
        componentType = 'button';
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

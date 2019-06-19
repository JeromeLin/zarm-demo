import React, { useEffect, useReducer } from 'react';
import { withRouter } from 'react-router-dom';
import { Panel, SearchBar, Cell, Input, Button } from 'zarm';
import './style.scss';

const initialState = { input1: '', input2: '222' };

const reducer = (state, action) => {
  switch (action.type) {
    case 'setInput1':
      return { ...state, input1: action.data };
    case 'setInput2':
      return { ...state, input2: action.data };
    default:
      throw new Error();
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    state.input1 && dispatch({
      type: 'setInput2',
      data: state.input1,
    });
  }, [state.input1]);

  return (
    <>
      <SearchBar />
      <Panel title="表单">
        <Cell title="字段一">
          <Input
            value={state.input1}
            onChange={(value) => {
              dispatch({
                type: 'setInput1',
                data: value,
              });
            }}
          />
        </Cell>
        <Cell title="字段二">
          <Input
            value={state.input2}
            onChange={(value) => {
              dispatch({
                type: 'setInput2',
                data: value,
              });
            }}
          />
        </Cell>
      </Panel>
      <div style={{ padding: 15 }}>
        <Button
          block
          theme="primary"
          onClick={() => {
            dispatch({
              type: 'setInput1',
              data: '11111111',
            });
          }}
        >设置字段一的值
        </Button>
      </div>
    </>
  );
};

export default withRouter(App);

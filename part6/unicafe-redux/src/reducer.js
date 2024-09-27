const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case 'GOOD':
      return { ...initialState, good: ++initialState.good };
    case 'OK':
      return { ...initialState, ok: ++initialState.ok };
    case 'BAD':
      return { ...initialState, bad: ++initialState.bad };
    case 'ZERO': {
      initialState.good = 0;
      initialState.ok = 0;
      initialState.bad = 0;
      return initialState;
    }
    default:
      return state;
  }
};

export default counterReducer;

import Immutable from 'seamless-immutable'

export default Immutable({
  testStateKey: 'TestStateValue',
  immutableArray: [
    "tim",
    "is",
    {
      is: "is is immutable"
    },
  ],
  immutableObject: {
    tim: 'tim',
    is: 'is',
    immutable: 'immutable',
  }
})

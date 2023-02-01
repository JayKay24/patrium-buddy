import React, { useEffect, useReducer } from 'react';
import { InitialState, IBuddy } from './interfaces';
import './App.css';
import { ReducerType, rootReducer } from './reducers';
import { ActionNames } from './actions';

const initialState: InitialState = {
  buddy: null,
  department: 'Engineering',
  fetching: false,
  success: false,
  error: true,
  team: []
};

function App() {
  const [state, dispatch] = useReducer<ReducerType>(rootReducer, initialState);

  useEffect(() => {
    const fetchTeam = () => {
      dispatch({ type: ActionNames.SET_FETCHING });
      fetch('./team.json')
      .then((response) => {
        return response.json();
      }).then((team: IBuddy[]) => {
        dispatch({ 
          type: ActionNames.SET_TEAM,
          payload: {
            team
          }
        });
        dispatch({ type: ActionNames.SET_SUCCESS });
      }).catch((e: Error) => {
        dispatch({ type: ActionNames.SET_ERROR });
      })
    };
    fetchTeam();
  }, []);

  function getABuddy(): any {
    const randomBuddy = state.team[Math.floor(Math.random() * state.team.length)] as IBuddy;
    if (randomBuddy.department === state.department) {
      return dispatch({ 
        type: ActionNames.SET_BUDDY, 
        payload: { 
          buddy: randomBuddy 
        }
      });
    } else {
      return getABuddy();
    }
  }

  function handleSelect(e: any) {
    dispatch({ 
      type: ActionNames.SET_DEPARTMENT, 
      payload: { 
        department: e.target.value
      }
    });
  }

  return (
    <div className="App">
      <section>
        <div className="form-group">
          <label htmlFor="department">Department</label>
          <select id="department" value={state.department} onChange={handleSelect}>
            <option value="Engineering">Engineering</option>
            <option value="Finance">Finance</option>
            <option value="Research">Research</option>
            <option value="Marketing">Marketing</option>
            <option value="Legal">Legal</option>
            <option value="Administration">Administration</option>
          </select>
        </div>
        <button onClick={getABuddy}>Get a buddy</button>

        {state.buddy &&
          <div className="buddy">
            <div className="buddy-title">Your Patrium buddy is:</div>
            <div className="buddy-details">
              <h3 className="buddy-name">{state.buddy.name}</h3>
              <p className="buddy-email">{state.buddy.email}</p>
              <p className="buddy-department">{state.buddy.department}</p>
            </div>
          </div>
        }
        {
          state.fetching && (
            <div className='loading'>
              Loading data...
            </div>
          )
        }
        {
          state.error && (
            <div className="error">
              There was an error in loading the data
            </div>
          )
        }
      </section>
    </div>
  );
}

export default App;

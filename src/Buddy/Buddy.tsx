import React, { useEffect, useReducer } from 'react';
import { InitialState, IBuddy } from '../interfaces';
import { ActionNames } from '../actions';
import { ReducerType, rootReducer } from '../reducers';
import './Buddy.css';

interface PropTypes {
  department: string;
}

const initialState: InitialState = {
  buddy: null,
  fetching: false,
  success: false,
  error: true,
  team: []
};

export function Buddy({ department }: PropTypes) {
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
  }, [dispatch]);

  function getABuddy(): any {
    const randomBuddy = state.team[Math.floor(Math.random() * state.team.length)] as IBuddy;
    if (randomBuddy.department === department) {
      return dispatch({ 
        type: ActionNames.SET_BUDDY, 
        payload: { 
          buddy: randomBuddy 
        }
      });
    }
    return getABuddy();
  }

  return (
    <>
      <button onClick={getABuddy}>Get a buddy</button>
      {
        state.buddy &&
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
    </>
  );
}
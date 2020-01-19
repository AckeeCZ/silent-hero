import { UserSnapshot, KudoSnapshot } from './services/firestoreService'

export interface User extends UserSnapshot {
  kudos: Kudo[];
  kudosSentThisPeriod: number;
  kudosReceivedThisPeriod: number;
  kudosReceivedLastPeriod: number;
};

export interface Kudo extends Omit<KudoSnapshot, 'createdAt'> {
  createdAt: Date | string;
};

export interface State {
  user?: User;
  users?: User[];
}

const emptyState: State = { user: undefined, users: [] };

export const initialState: State = (() => {
  const cached = window.localStorage.getItem("x");
  return cached ? JSON.parse(cached) : emptyState;
})();

export type Action =
  | { type: "login"; user: User }
  | { type: "logout" }
  | { type: "createdKudo"; kudo: Kudo }
  | { type: "setUsers"; users: User[] };

type ActionDispatcher = React.Dispatch<Action>;
export interface Dispatcher {
  dispatch: ActionDispatcher;
}

export interface Connected extends Dispatcher, State {
  state: State;
}

export const reducer = (state: State, action: Action): State => {
  const newState = (() => {
    switch (action.type) {
      case "login":
        return { ...state, user: action.user };
      case "logout":
        return emptyState;
      case "createdKudo":
        return {
          ...state,
          user: { ...(state.user!), kudos: [...(state.user?.kudos || []), action.kudo] }
        };
      case "setUsers":
        return { ...state, users: action.users };
      default:
        throw new Error();
    }
  })();
  window.localStorage.setItem("x", JSON.stringify(newState));
  return newState;
};

export type User = {
  email?: string;
  avatar?: string;
  displayName?: string;
  uid: string;
  kudos: Kudo[];
  kudosSentThisPeriod: number;
  kudosReceivedThisPeriod: number;
  kudosReceivedLastPeriod: number;
};

export type Kudo = {
  id: string;
  createdAt: Date;
  message: string;
  senderUid: string;
  receiverUid: string;
  senderAnonymous: boolean;
  senderAgreesWithPublish: boolean;
  receiverAgreesWithPublish: boolean;
};

export interface State {
  user?: User;
  users?: User[];
}
export const initialState: State = (() => {
  const cached = window.localStorage.getItem("x");
  return cached ? JSON.parse(cached) : { user: null, users: [] };
})();

export type Action =
  | { type: "login"; user: State["user"] }
  | { type: "logout" }
  | { type: "createdKudo"; kudo: Kudo }
  | { type: "setUsers"; users: State["user"][] };

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
        return {};
      case "createdKudo":
        return {
          ...state,
          user: { ...state.user, kudos: [...(state.user?.kudos || []), action.kudo] }
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

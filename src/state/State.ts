import { createContainer } from "unstated-next"
import { useState } from "react"
import { loginUser, getUsers, addKudo, UserSnapshot, KudoSnapshot, updateKudos } from '../services/firestoreService'
import { compose, keys, tap, uniq, sortBy, prop } from "ramda"

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
    users: User[];
    loggedUser?: User;
}

const emptyState: State = {
    users: [],
    loggedUser: undefined
}

export const initialState: State = keys(emptyState).reduce((res, key) => {
    const cached = window.localStorage.getItem(key);
    console.log({ key, cached })
    if (cached) res[key] = JSON.parse(cached)
    return res;
}, {} as State);

const wrap = <K extends keyof State>(key: K) => (<T = State[K]>() => ([val, setter]: [T, React.Dispatch<React.SetStateAction<T>>]) => [
    val,
    compose(setter, tap(x => {
        console.debug(`[${key}] -> ${x}`, x)
        if (x) {
            window.localStorage.setItem(key, JSON.stringify(x))
        } else {
            window.localStorage.removeItem(key)
        }
    }))
] as const)();

const replaceKudos = (kudos: Kudo[], fish: Kudo) => [...kudos.filter(k => k.id !== fish.id), fish]

export const State = createContainer((initState: State = initialState) => {
    const [users, setUsers] = wrap('users')(useState(initState.users))
    const [refreshed, setRefreshed] = useState(false)
    const [loggedUser, setLoggedUser] = wrap('loggedUser')(useState(initState.loggedUser))
    if (!refreshed) {
        setRefreshed(true);
        getUsers().then(setUsers)
    }
    const login = async () => {
        setLoggedUser(await loginUser());
        setUsers(await getUsers());
    }
    const logout = async () => {
        setLoggedUser(emptyState.loggedUser);
        setUsers(emptyState.users);
        console.log({ emptyState, loggedUser, users })
    }
    // TODO
    const createKudos = async (kudoData: any) => {
        if (!loggedUser) throw new Error('Must have user to create kudos');
        const kudo = await addKudo(
            // TODO
            kudoData,
            loggedUser,
        )
        const kudos = replaceKudos(loggedUser.kudos, kudo);
        setLoggedUser({ ...loggedUser, kudosSentThisPeriod: loggedUser.kudosSentThisPeriod + 1, kudos })
    }
    const editKudos = async (id: string, kudosData: any) => {
        if (!loggedUser) throw new Error('Must have user to create kudos');
        const kudo = await updateKudos(id, kudosData)
        const kudos = replaceKudos(loggedUser.kudos, kudo);
        setLoggedUser({ ...loggedUser, kudos })
    }
    return { users, loggedUser, login, logout, createKudos, editKudos }
})
import { localhostUserToModel } from '../mappers/localhost-user.mapper';
import { User } from '../models/user';

/**
 * 
 * @param {Number} page 
 * @returns { Promise<User[]> }
 */
export const loadUsersByPage = async( page = 1 ) => {

    const url = `${ import.meta.env.VITE_BASE_URL }/users?_page=${ page }`;
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Error fetching data: ${res.status}`);
    }

    const data = await res.json();

    // Verificar si data es un array antes de usar map
    if (!Array.isArray(data)) {
        throw new Error('Data is not an array');
    }

    const users = data.map(localhostUserToModel);

    return users;
}

import { axiosPrivate } from '../../form/Authentication/axios'

export const groups = async (user_id) => {

  try {
    response = await axiosPrivate.get(`/api/users/${user_id}/groups`)
    const {groups} = response.data
    return groups
  } catch (error) {
    console.error('error while fetching users groups', error);
  }
}

export const addGroup = async () => {

}

export const updateGroup = async () => {

}

export const deleteGroup = async () => {

}

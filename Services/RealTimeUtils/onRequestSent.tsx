import {IUser} from '../../context/DashboardContext';

interface userPayload {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  image: string;
  isOnline: boolean;
  friendShipId: string;
}

const onRequestSent = (
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>,
  user: userPayload,
) => {
  setUser(prevData => {
    if (!prevData) return null;
    return {
      ...prevData,
      friends: [
        ...prevData.friends,
        {
          friendShipId: user.friendShipId,
          userId: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          isOnline: user.isOnline,
          image: user.image,
        },
      ],
    };
  });
};

export default onRequestSent;

import {IUser,IRequest} from '../../context/DashboardContext';

const onRecieveRequest = (
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>,
  request: IRequest,
) => {
  setUser(prevData => {
    if (!prevData) return null;
    return {...prevData,
        requests:[...prevData.requests,request]
        
    };
  });
};

export default onRecieveRequest;

import {useEffect} from 'react';
import {useHistory} from 'react-router-native';
import {useSelector} from 'react-redux';

const useReduxHistory = () => {
  const history = useHistory();
  const {newPath} = useSelector(state => state);
  useEffect(() => {
    if (newPath === '') {
      return;
    }
    history.push(newPath);
  }, [history, newPath]);
};
export default useReduxHistory;

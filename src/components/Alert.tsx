import { Alert } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { useSelector } from 'react-redux';
import { IState } from '@/app/GRAPHQL/interfaces';

export default function Alerts() {
  const error = useSelector((state: IState) => state.main.error);

  return (
    <>
      {error !== '' && (
        <div className="alert-wrapper-absolute">
          <div className="alert-wrapper-sticky">
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
              {error}
            </Alert>
          </div>
        </div>
      )}
    </>
  );
}

import { AppDispatch } from '@/reducers/root/rootReduces';
import { Input } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { updateSDL } from '@/reducers/actions/actions';
import { IState } from '@/app/GRAPHQL/interfaces';

export default function SDLUrlInput() {
  const dispatch = useDispatch<AppDispatch>();
  const sdlUrl = useSelector((state: IState) => state.main.sdlUrlInput);
  
  // useEffect(() => {
  //   const currentUrl = window.location.href;
  //   const partialData: IResults | boolean = dataFromUrl(currentUrl, false);
  //   if (partialData && partialData.endpointUrl !== '') {
  //     dispatch(updateSDL(`${partialData.endpointUrl}?sdl`));
  //   }
  // }, []);

  return (
    <>
      <div className="graphiql-input-wrapper">
        <h3 className="h3-width">SDL URL</h3>
        <Input
          type="text"
          value={sdlUrl}
          onChange={(e) => {
            dispatch(updateSDL(e.target.value));
          }}
        />
      </div>
    </>
  );
}

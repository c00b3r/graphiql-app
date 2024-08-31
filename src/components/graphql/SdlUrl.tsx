import { dataFromUrl } from '@/methods/graphql/urlConverter';
import { AppDispatch } from '@/reducers/root/rootReduces';
import { Input } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { IResults } from '@/methods/interfaces';
import { updateSDL } from '@/reducers/actions/actions';

export default function SDLUrlInput() {
  const [sdlUrl, setSdlUrl] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  // const sdlUrlInput = useSelector((state: IState) => state.main.sdlUrlInput);

  useEffect(() => {
    const currentUrl = window.location.href;
    const partialData: IResults | boolean = dataFromUrl(currentUrl, false);
    if (partialData && partialData.endpointUrl !== '') {
      setSdlUrl(`${partialData.endpointUrl}?sdl`);
    }
  }, []);

  return (
    <>
      <div className="graphiql-input-wrapper">
        <h3 className="h3-width">SDL URL</h3>
        <Input
          type="text"
          value={sdlUrl}
          onChange={(e) => {
            dispatch(updateSDL(e.target.value));
            setSdlUrl(e.target.value);
          }}
        />
      </div>
    </>
  );
}

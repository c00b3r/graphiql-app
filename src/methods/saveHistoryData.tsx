export const saveHistory = (url: string, client: string, sdlUrl: string) => {
  if (typeof window !== 'undefined') {
    const savedState = localStorage.getItem('history_data');
    if (savedState) {
      try {
        const historyArray = JSON.parse(savedState);
        const newData = {
          url,
          client,
          sdlUrl,
        };
        const mergedArray = [newData].concat(historyArray);
        localStorage.setItem('history_data', JSON.stringify(mergedArray));
      } catch {
        console.error('invalid data in local storage');
      }
    } else {
      localStorage.setItem('history_data', JSON.stringify([{ url, client }]));
    }
  }
};

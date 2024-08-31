import React from 'react';
import './jsonViewer.css';

interface CleanObject {
  [key: string]: string | number | object | null | undefined;
}

function cleanObject(obj: string | null | undefined | object | number): string | object | null | undefined | number {
  if (obj === null || obj === undefined) {
    return obj;
  } else if (Array.isArray(obj)) {
    return obj.map(cleanObject);
  } else if (typeof obj === 'object') {
    const newObj: CleanObject = {};
    for (const key in obj) {
      if (key.startsWith('__')) {
        continue;
      }
      const copyObject = obj as CleanObject;
      const objValue = copyObject[key];
      newObj[key] = cleanObject(objValue);
    }
    return newObj;
  }
  return obj;
}

const JsonViewer = (dirtyData: string | object | CleanObject | null | undefined) => {
  const data = cleanObject(dirtyData);

  const formatJson = (obj: object) => {
    const entries = Object.entries(obj);
    return entries
      .map(([key, value], index) => {
        if (key.startsWith('__')) {
          return null;
        }

        const isLastEntry = index === entries.length - 1;

        if (Array.isArray(value)) {
          return (
            <div key={key}>
              <div>
                <span className={'key_text_color'}>{key}:</span>
                <span className="black-text"> [</span>
              </div>
              <div className={'left-20'}>
                {value.map((item, itemIndex) => (
                  <React.Fragment key={itemIndex}>
                    <div>
                      <span className={'left-0'}>&#123;</span>
                    </div>
                    <div className={'left-10'}>{formatJson(item)}</div>
                    <div>
                      <span className="black-text curly-black left-0">&#125;</span>
                      {itemIndex === value.length - 1 ? '' : ','}
                    </div>
                  </React.Fragment>
                ))}
              </div>
              <span className="black-text">]</span>
            </div>
          );
        } else if (typeof value === 'object') {
          return (
            <div key={key}>
              <span className={'key_text_color left-15'}>{key}:</span>
              <span className="black-text"> &#123;</span>
              <div className={'left-25'}>{formatJson(value)}</div>
              <div>
                <span className="black-text left-15">&#125;</span>
                {!isLastEntry ? ',' : ''}
              </div>
            </div>
          );
        } else {
          let valueColor;
          if (typeof value === 'string') {
            valueColor = { color: 'green' };
          } else if (/\d/.test(value! as string)) {
            valueColor = { color: 'orange' };
          } else {
            valueColor = { color: 'pink' };
          }
          return (
            <div key={key}>
              <span className={'key_text_color'}>{key}:</span>
              <span style={valueColor}> {JSON.stringify(value)}</span>
              {!isLastEntry ? ',' : ''}
            </div>
          );
        }
      })
      .filter(Boolean);
  };

  return <div>{formatJson(data as object)}</div>;
};
export default JsonViewer;

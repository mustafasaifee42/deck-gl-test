import { useContext } from 'react';
import { ChevronsLeft, Settings } from 'lucide-react';
import { Select } from 'antd';
import Context from '../Context/MultiBoxContext';
import { MULTI_BOX_MINERAL_OPTIONS } from '../../Constants';

export default function MainMenu() {
  const { updateMenuCollapsed, menuCollapsed, updateElements, elements } =
    useContext(Context);

  return (
    <div>
      {!menuCollapsed ? (
        <div
          style={{
            position: 'fixed',
            zIndex: 100,
            width: '280px',
            top: '12px',
            margin: '0',
            left: '12px',
            backgroundColor: 'rgba(22, 27, 34, 0.95)',
            color: 'rgb(230, 237, 243)',
            borderRadius: '8px',
            fontFamily: 'Roboto, sans-serif',
            maxHeight: 'calc(100vh - 32px)',
            overflow: 'auto',
          }}
        >
          <div
            style={{
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
            }}
          >
            <button
              type='button'
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.5rem',
                border: 0,
                padding: 0,
                backgroundColor: 'transparent',
                cursor: 'pointer',
              }}
              onClick={() => {
                updateMenuCollapsed(true);
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'center',
                }}
              >
                <Settings color='#e6edf3' strokeWidth={1.5} size={20} />
                <h5
                  style={{
                    fontWeight: 'normal',
                    fontSize: '1rem',
                    margin: '0',
                    textTransform: 'uppercase',
                    color: 'rgb(230, 237, 243)',
                  }}
                >
                  Settings
                </h5>
              </div>
              <ChevronsLeft
                color='#e6edf3'
                strokeWidth={1}
                style={{ cursor: 'pointer' }}
                size={20}
              />
            </button>
            <div>
              <Select
                style={{ width: '100%' }}
                placeholder='Add element view'
                allowClear
                options={MULTI_BOX_MINERAL_OPTIONS}
                onChange={d => {
                  updateElements(d);
                }}
                value={elements}
                mode='multiple'
                dropdownStyle={{
                  borderRadius: 0,
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <button
          type='button'
          style={{
            position: 'fixed',
            zIndex: 100,
            padding: 0,
            top: '12px',
            margin: '0',
            left: '12px',
            backgroundColor: 'rgba(22, 27, 34, 0.9)',
            color: 'rgb(230, 237, 243)',
            borderRadius: '8px',
            border: 0,
          }}
          onClick={() => {
            updateMenuCollapsed(false);
          }}
        >
          <div
            style={{
              padding: '1rem',
            }}
          >
            <Settings
              color='#e6edf3'
              strokeWidth={1.5}
              style={{ cursor: 'pointer' }}
              size={20}
            />
          </div>
        </button>
      )}
    </div>
  );
}

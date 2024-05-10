// DetailsPageView.tsx

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { useParams } from 'react-router-dom';
import { fetchPersonData } from './detailsSlice';


const DetailsPageView: React.FC = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { personData, films, loading, error } = useAppSelector((state) => state.details);

  useEffect(() => {if(id)
    dispatch(fetchPersonData(id));
  }, [dispatch, id]);

  return (
    <div>
      <h1 style={{ textDecoration: 'underline' }}>Details Page</h1>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {personData && (
        <table>
          <tbody>
            <tr>
              <td>
                <div style={{ float: 'left' }}>
                  <p><strong>Id:</strong> {id}</p>
                  <p><strong>Name:</strong> {personData.name}</p>
                  <p><strong>Gender:</strong> {personData.gender}</p>
                  <p><strong>Height:</strong> {personData.height}</p>
                  <p><strong>Hair Color:</strong> {personData.hair_color}</p>
                  <p><strong>Created Date:</strong> {personData.created}</p>
                </div>
              </td>
              <td style={{ position: 'relative' }}>
                <h2 style={{ textDecoration: 'underline', position: 'absolute', top: 0, left: 0, margin: 0 }}>Person's films</h2>
                <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                  <thead>
                    <tr>
                      <th style={{ border: '1px solid black', padding: '8px' }}>Title</th>
                      <th style={{ border: '1px solid black', padding: '8px' }}>Director</th>
                      <th style={{ border: '1px solid black', padding: '8px' }}>Release Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {films.map((film: { title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; director: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; release_date: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: React.Key | null | undefined) => (
                      <tr key={index}>
                        <td>{film.title}</td>
                        <td>{film.director}</td>
                        <td>{film.release_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DetailsPageView;

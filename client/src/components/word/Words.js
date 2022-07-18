import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWords } from '../../app/features/words/wordsSlice';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { TiDelete } from 'react-icons/ti';
import { RiAddLine } from 'react-icons/ri';

const Words = () => {
  const [isInput, setIsInput] = React.useState(false);
  const [search, setSearch] = React.useState('');

  const { loading, error, words } = useSelector((state) => state.word);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchWords(search));
  }, [dispatch, search]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}...</h1>;
  }

  const handleInput = () => setIsInput(true);

  const closeInput = () => {
    setSearch('');
    setIsInput(false);
  };

  return (
    <>
      {isInput ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            position: 'fixed',
            top: 0,
          }}
        >
          <input
            type='text'
            style={{
              width: '500px',
              height: '25px',
              marginTop: '27px',
              border: 'none',
              outline: 'none',
            }}
            value={search}
            autoFocus='autoFocus'
            onChange={(e) => setSearch(e.target.value)}
          />
          <TiDelete
            size={25}
            style={{
              marginRight: '35px',
              marginTop: '26px',
              cursor: 'pointer',
              fontWeight: 'normal',
            }}
            onClick={closeInput}
          />
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <h1 style={{ marginLeft: '8px', position: 'fixed' }}>Vocubalary</h1>
          <FiSearch
            size={35}
            style={{
              marginRight: '35px',
              marginTop: '26px',
              cursor: 'pointer',
              fontWeight: 'bolder',
              position: 'fixed',
              right: 20,
            }}
            onClick={handleInput}
          />
        </div>
      )}
      <h2 style={{ textAlign: 'center' }}>Words List:</h2>

      {words?.map((word) => (
        <div key={word._id} className='card'>
          <Link
            to={`/${word._id}`}
            style={{ textDecoration: 'none', color: 'black' }}
          >
            <h4>{word.name}</h4>
            <div className='card-content'>
              <p style={{ marginRight: '5px' }}>{word.partsOfSpeech[0]}</p>
              <p>({word.definition[0]})</p>
            </div>
          </Link>
        </div>
      ))}

      <Link to={`/name`} style={{ textDecoration: 'none', color: 'black' }}>
        <RiAddLine className='add-btn' />
      </Link>
    </>
  );
};

export default Words;

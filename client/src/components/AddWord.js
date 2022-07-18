import * as React from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router-dom';
import { addWord } from '../app/features/words/wordsSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  //   height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const AddWord = () => {
  const navigate = useNavigate();
  const nameUrl = window.location.href;
  const [open, setOpen] = React.useState(nameUrl ? true : false);
  const [name, setName] = React.useState('');

  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.word);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}...</h1>;
  }

  const wordAddToDictionary = () => {
    dispatch(addWord({ name }));
    navigate('/');
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography
            id='modal-modal-title'
            variant='h4'
            component='h2'
            sx={{ mt: 2 }}
          >
            Add to Dictionary
          </Typography>
          <Typography variant='h6' component='h2' sx={{ mt: 1 }}>
            New Word
          </Typography>

          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ outline: 'none', border: 'none', marginTop: '2px' }}
          />
          <hr />

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <p
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={handleClose}
            >
              Cancel
            </p>
            <p
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={wordAddToDictionary}
            >
              Add
            </p>
          </div>
        </Box>
      </Modal>
    </>
  );
};

import * as React from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSingleWord } from '../app/features/words/wordsSlice';
import { RiDeleteBack2Fill } from 'react-icons/ri';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  height: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const BasicModal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(id ? true : false);
  const handleClose = () => {
    setOpen(false);
    navigate('/');
  };

  const dispatch = useDispatch();

  const { loading, error, data } = useSelector((state) => state.word);

  React.useEffect(() => {
    dispatch(fetchSingleWord(id));
  }, [dispatch, id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}...</h1>;
  }
  console.log(data);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <RiDeleteBack2Fill
            size={20}
            style={{ marginLeft: '650px', cursor: 'pointer' }}
            onClick={handleClose}
          />
          <Typography id='modal-modal-title' variant='h4' component='h2'>
            {data?.name}
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            {data?.partsOfSpeech[0]}
          </Typography>
          <Typography
            id='modal-modal-description'
            sx={{ mt: 2 }}
            variant='h6'
            component='h2'
          >
            &#10687; {data?.definition[0]}
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            &#8226; {data?.shortDefinitions[0]}
          </Typography>
          <Typography sx={{ mt: 2 }}>Examples:</Typography>
          {data?.examples.map(({ text }) => (
            <Typography
              id='modal-modal-description'
              sx={{ mt: 2, ml: 4 }}
              key={text}
            >
              &#8226; {text}
            </Typography>
          ))}
        </Box>
      </Modal>
    </>
  );
};

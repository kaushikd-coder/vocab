import axios from 'axios';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// to fetch all words from the backend
export const fetchWords = createAsyncThunk(
  'fetch/words',
  async (search, ThunkApi) => {
    try {
      let url = '/words';
      if (search) {
        url = url + `?search=${search}`;
      }
      const { data } = await axios(url);

      return data;
    } catch (error) {
      return error?.response;
    }
  }
);

//  to fetch a single word from the backend
export const fetchSingleWord = createAsyncThunk(
  'get/word',
  async (id, ThunkApi) => {
    try {
      const { data } = await axios(`/words/${id}`);

      return data;
    } catch (error) {
      return error?.response;
    }
  }
);

// to add a word
export const addWord = createAsyncThunk('add/word', async (name, ThunkApi) => {
  try {
    const { data } = await axios.post(`/words`, name);
    return data;
  } catch (error) {
    return error?.response;
  }
});

const wordSlice = createSlice({
  name: 'words',
  initialState: {},
  extraReducers: (builders) => {
    builders.addCase(fetchWords.pending, (state, action) => {
      state.loading = true;
      state.words = [];
      state.error = '';
    });
    builders.addCase(fetchWords.fulfilled, (state, action) => {
      state.loading = false;
      state.words = action.payload;
      state.error = '';
    });
    builders.addCase(fetchWords.rejected, (state, action) => {
      state.loading = false;
      state.words = [];
      state.error = action.payload;
    });
    // get Single word
    builders.addCase(fetchSingleWord.pending, (state, action) => {
      state.loading = true;
      state.data = {};
      state.error = '';
    });
    builders.addCase(fetchSingleWord.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    });
    builders.addCase(fetchSingleWord.rejected, (state, action) => {
      state.loading = false;
      state.data = {};
      state.error = action.payload;
    });
    // add word
    builders.addCase(addWord.pending, (state, action) => {
      state.loading = true;
      state.word = {};
      state.error = '';
    });
    builders.addCase(addWord.fulfilled, (state, action) => {
      state.loading = false;
      state.word = action.payload;
      state.error = '';
    });
    builders.addCase(addWord.rejected, (state, action) => {
      state.loading = false;
      state.word = {};
      state.error = action.payload;
    });
  },
});

export default wordSlice.reducer;

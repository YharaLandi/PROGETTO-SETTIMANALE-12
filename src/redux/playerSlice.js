import { createSlice } from '@reduxjs/toolkit'

// Un solo slice per tutto lo stato "musicale" dell'app, invece di due
// reducer separati con action type in stile Redux classico.
const playerSlice = createSlice({
  name: 'player',
  initialState: {
    nowPlaying: null, // brano attualmente selezionato nel player
    favourites: [], // array di id dei brani con il cuoricino attivo
  },
  reducers: {
    playTrack: (state, action) => {
      state.nowPlaying = action.payload
    },
    toggleFavourite: (state, action) => {
      const trackId = action.payload
      state.favourites = state.favourites.includes(trackId)
        ? state.favourites.filter((id) => id !== trackId)
        : [...state.favourites, trackId]
    },
  },
})

export const { playTrack, toggleFavourite } = playerSlice.actions
export default playerSlice.reducer

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    selectedCampaign: {
        start_time: null
    },
};

const campaignSlice = createSlice({
    name: 'campaign',
    initialState,
    reducers: {
        setSelectedCampaign: (state, action) => {
            state.selectedCampaign = action.payload;
        },
    },
});

export const { setSelectedCampaign } = campaignSlice.actions;
export default campaignSlice.reducer;
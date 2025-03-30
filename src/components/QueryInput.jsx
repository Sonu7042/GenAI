import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemText,
  Paper
} from '@mui/material';
import { setCurrentQuery, addToHistory, setLoading, setResults, setError } from '../store/querySlice';

const mockApiCall = async (query) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    type: 'bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      values: [65, 59, 80, 81, 56, 55],
    }
  };
};

function QueryInput() {
  const dispatch = useDispatch();
  const { currentQuery, suggestions } = useSelector((state) => state.query);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    if (!currentQuery.trim()) return;

    dispatch(setLoading(true));
    dispatch(setError(null));
    dispatch(addToHistory(currentQuery));

    try {
      const results = await mockApiCall(currentQuery);
      dispatch(setResults(results));
    } catch (error) {
      dispatch(setError('Failed to process query'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Box component="form" onSubmit={handleQuerySubmit} sx={{ position: 'relative' }}>
      <TextField
        fullWidth
        value={currentQuery}
        onChange={(e) => dispatch(setCurrentQuery(e.target.value))}
        onFocus={() => setShowSuggestions(true)}
        placeholder="Ask your data question here..."
        variant="outlined"
        sx={{ mb: 2 }}
      />
      {showSuggestions && (
        <Paper 
          sx={{ 
            position: 'absolute', 
            width: '100%', 
            zIndex: 1,
            maxHeight: 200,
            overflow: 'auto'
          }}
        >
          <List>
            {suggestions.map((suggestion, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton 
                  onClick={() => {
                    dispatch(setCurrentQuery(suggestion));
                    setShowSuggestions(false);
                  }}
                >
                  <ListItemText primary={suggestion} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      <Button 
        type="submit" 
        variant="contained" 
        fullWidth
      >
        Analyze
      </Button>
    </Box>
  );
}

export default QueryInput;
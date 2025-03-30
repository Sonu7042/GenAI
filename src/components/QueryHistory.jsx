import { useSelector } from 'react-redux';
import { Paper, List, ListItem, ListItemText, Typography } from '@mui/material';

function QueryHistory() {
  const { queryHistory } = useSelector((state) => state.query);

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Query History
      </Typography>
      <List>
        {queryHistory.map((query, index) => (
          <ListItem key={index}>
            <ListItemText primary={query} />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default QueryHistory;
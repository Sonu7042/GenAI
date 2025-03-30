import { useSelector } from 'react-redux';
import { Paper, Typography, CircularProgress, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function ResultsDisplay() {
  const { results, loading, error } = useSelector((state) => state.query);

  if (loading) {
    return (
      <Paper sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 4 }}>
        <Typography color="error">{error}</Typography>
      </Paper>
    );
  }

  if (!results) {
    return (
      <Paper sx={{ p: 4 }}>
        <Typography>Enter a query to see results</Typography>
      </Paper>
    );
  }

  const chartData = results.data.labels.map((label, index) => ({
    name: label,
    value: results.data.values[index],
  }));

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Results
      </Typography>
      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#646cff" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}

export default ResultsDisplay;
import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '70%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box >
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value,
        )} ${props.dayView === 'daily' ? 'hours' : 'days'}  Left`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function LinearTimer({daysLeft, dayView}) {
  const [progress, setProgress] = React.useState(daysLeft+0);

  React.useEffect(() => {
      setProgress((prevProgress) => (prevProgress >= daysLeft +0 ? 0 : daysLeft + 0));
    
  }, [daysLeft]);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} dayView={dayView}  />
    </Box>
  );
}

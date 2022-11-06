import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    position: 'fixed',
    bottom: 96,
    right: 16,

    '& .MuiSpeedDialAction-fab': {
      // backgroundColor: 'var(--bg-color-accent)',
      backgroundColor: 'transparent',
    },

    '& .MuiFab-label': {
      // color: 'var(--label-color)',
      color: 'var(--label-color)',
    },

    '& .MuiSpeedDialIcon-icon': {
      // color: 'var(--light-grey)',
      color: 'var(--light-grey)',
    },
  },

  fab: {
    width: '3rem',
    height: '3rem',
    // backgroundColor: 'var(--accent-color)',
    backgroundColor: 'white',
    color: 'black',

    '&:hover, &:active': {
      backgroundColor: 'var(--accent-color)',
    },
  },
}));
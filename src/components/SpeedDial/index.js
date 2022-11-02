// eslint-disable-next-line no-unused-vars
import VideoCall from '@material-ui/icons/VideoCall';
import School from '@material-ui/icons/School';
import BurstMode from '@material-ui/icons/BurstMode';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import HomeIcon from '@material-ui/icons/Home';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import { LINKS } from '../../constant';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { Link } from 'react-scroll';
// eslint-disable-next-line no-unused-vars
import SettingButton from './Settings/SettingButton';
import useStyle from './style';
// eslint-disable-next-line no-unused-vars
import { DarkModeToggle } from '../ToggleDarkMode';

// function ScrollTop() {
//   return (
//     <Link to="scrollTop" spy={true} smooth={true} duration={500}>
//       <ArrowUpIcon style={{ transform: 'translateY(20%)' }} />
//     </Link>
//   );
// }

const actions = [
  { icon: <HomeIcon style={{color: "red"}}/>, name: 'Trang chủ', to: '/', isBlank: false },
  {
    icon: <BurstMode style={{color: "lightgreen"}}/>,
    name: 'Darkmode',
    to: null,
    isBlank: false,
  },
  { icon: <School style={{color: "yellow"}}/>, name: 'Lớp học', to: null, isBlank: false },
  { icon: <VideoCall style={{color: "pink"}}/>, name: 'Gọi video', to: null, isBlank: false },
  // { icon: <SettingButton />, name: 'Cài đặt', to: null, isBlank: false },
  {
    icon: <ContactMailIcon style={{color: "#cb43fc"}}/>,
    name: 'Liên hệ Snap',
    to: LINKS.WEBSITE,
    isBlank: true,
  },
];

function SpeedDials() {
  const classes = useStyle();
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const handleClose = (to, isBlank = false) => {
    setOpen(false);
    if (to && to !== '') {
      if (isBlank) {
        window.open(to);
      } else {
        history.push(to);
      }
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <SpeedDial
      classes={{
        root: classes.root,
        fab: classes.fab,
        actions: classes.actions,
      }}
      hidden={false}
      ariaLabel="Speed Dial"
      icon={<SpeedDialIcon />}
      onOpen={handleOpen}
      onClose={() => setOpen(false)}
      open={open}
      direction="up">
      {actions.map((action, index) => (
        <SpeedDialAction
          key={index}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => handleClose(action.to, action.isBlank)}
        />
      ))}
    </SpeedDial>
  );
}

export default SpeedDials;
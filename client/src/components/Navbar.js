import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import ViewDayIcon from "@mui/icons-material/ViewDay";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { selectView } from "../redux/generalSlice";
import HistoryIcon from "@mui/icons-material/History";
import {
  Divider,
  FormControl,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { fetchData } from "../redux/goalSlice";
import { getTodos, updateTodo } from "../Apis";
import moment from "moment";
export default function Navbar() {
  const general = useSelector((state) => state.general);
  const goal = useSelector((state) => state.goal);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchtxt, setSearchtxt] = React.useState("");
  const [Notifications, setNotifications] = React.useState([]);
  const { dayView } = useSelector((state) => state.general);

  React.useEffect(() => {
    dispatch(fetchData({ searchtxt: searchtxt }));
  }, [searchtxt]);
  React.useEffect(() => {
    getNotifications();
  }, [goal]);

  const getNotifications = () => {
    getTodos({ viewed: "NO" }).then((res) => setNotifications(res.data));
  };

  const isMenuOpen = Boolean(anchorEl);
  const isNotificationOpen = Boolean(anchorEl2);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleNotificationsOpen = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handlenotificationClose = () => {
    setAnchorEl2(null);
    handleMobileMenuClose();
    updateNotification();
  };
  const updateNotification = () => {
    Notifications.map((x) => {
      updateTodo({ ...x, viewed: "Yes" }).then(() => {
        getNotifications();
      });
    });
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  console.log("nots", Notifications);
  const notificationId = "primary-notification-account-menu";
  const renderNotificationMenu = (
    <Menu
      anchorEl={anchorEl2}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={notificationId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      open={isNotificationOpen}
      onClose={handlenotificationClose}
    >
      {Notifications.map((x) => (
        <>
          <MenuItem>
            <Stack
              display={"flex"}
              direction={"row"}
              width={"200px"}
              justifyContent={"space-between"}
            >
              <Typography fontSize={"14px"}>{x.title}</Typography>
              <Typography fontSize={"14px"}>
                {moment(x.dueDate).format("DD-MM-YYYY")}
              </Typography>
            </Stack>
          </MenuItem>
          <Divider />
        </>
      ))}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link to={"/calendar"} style={{ textDecoration: "none" }}>
        <MenuItem>
          <IconButton
            sx={{ margin: "0px 4px" }}
            size="large"
            aria-label="show 4 new mails"
            color="white"
          >
            <Badge badgeContent={4} color="error">
              <CalendarMonthIcon />
            </Badge>
          </IconButton>
          <p style={{ color: "white" }}>Calendar</p>
        </MenuItem>
      </Link>
      <Link to={"/"}>
        <MenuItem>
          <IconButton
            sx={{ margin: "0px 4px" }}
            size="large"
            aria-label="show 4 new mails"
            color="white"
          >
            <Badge badgeContent={4} color="error">
              <ViewDayIcon />
            </Badge>
          </IconButton>
          <p style={{ color: "white" }}>Events</p>
        </MenuItem>
      </Link>
      <MenuItem onClick={handleNotificationsOpen}>
        <IconButton
          sx={{ margin: "0px 4px" }}
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={Notifications.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          sx={{ margin: "0px 4px" }}
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            sx={{ margin: "0px 4px", mr: 2 }}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Goal Tracker
          </Typography>
          <TextField
            sx={{ marginLeft: "28px", width: "400px" }}
            placeholder="Search..."
            id="input-with-icon-textfield"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="standard"
            onChange={(e) => {
              setSearchtxt(e.target.value);
            }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              sx={{ margin: "0px 4px" }}
              size="large"
              aria-label="show 4 new mails"
            >
              <Link to={"/calendar"}>
                <Badge badgeContent={4} color="error">
                  <CalendarMonthIcon sx={{ color: "white" }} />
                </Badge>
              </Link>
            </IconButton>
            <IconButton
              sx={{ margin: "0px 4px" }}
              size="large"
              aria-label="show 17 new notifications"
            >
              <Link to="/">
                <Badge badgeContent={17} color="error">
                  <ViewDayIcon sx={{ color: "white" }} />
                </Badge>
              </Link>
            </IconButton>
            <IconButton
              sx={{ margin: "0px 4px" }}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleNotificationsOpen}
            >
              <Badge badgeContent={Notifications.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              sx={{ margin: "0px 4px" }}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleNotificationsOpen}
            >
              <Link to="/timeLine">
                <Badge badgeContent={2} color="error">
                  <HistoryIcon sx={{ color: "white" }} />{" "}
                </Badge>
              </Link>
            </IconButton>
            <IconButton
              sx={{ margin: "0px 4px" }}
              size="large"
              aria-label="account of current user"
              color="inherit"
            >
              <IconButton
                sx={{ margin: "0px 4px", ml: 1 }}
                onClick={() =>
                  dispatch(selectView({ ...general, theme: !general.theme }))
                }
                color="inherit"
              >
                {general.theme ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </IconButton>
            <IconButton
              sx={{ margin: "0px 8px" }}
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              sx={{ margin: "0px 4px" }}
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotificationMenu}
    </Box>
  );
}

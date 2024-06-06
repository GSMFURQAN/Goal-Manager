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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { selectView } from "../redux/generalSlice";
import HistoryIcon from "@mui/icons-material/History";
import {
  CircularProgress,
  Divider,
  FormControl,
  Icon,
  InputAdornment,
  Stack,
  TextField,
} from "@mui/material";
import { fetchData } from "../redux/goalSlice";
import {
  getPreferences,
  getTodos,
  savePreferences,
  updateTodo,
} from "../Apis/Apis";
import moment from "moment";
import LogoutIcon from "@mui/icons-material/Logout";
import WallpaperIcon from "@mui/icons-material/Wallpaper";
import { uploadFile } from "./imageFolder/MediaUploader";
export default function Navbar() {
  const general = useSelector((state) => state.general);
  const goal = useSelector((state) => state.goal);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [searchtxt, setSearchtxt] = React.useState(null);
  const [Notifications, setNotifications] = React.useState([]);
  const { dayView } = useSelector((state) => state.general);
  const [fileUploadProgress, setFileUploadProgress] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  let account = JSON?.parse(sessionStorage?.getItem("account"));

  React.useEffect(() => {
    searchtxt && dispatch(fetchData({ searchtxt: searchtxt }));
  }, [searchtxt]);

  const getNotifications = () => {
    getTodos({ viewed: "NO" }).then((res) => setNotifications(res?.data));
  };
  // React.useMemo(() => {
  //   getNotifications();
  // }, [goal]);

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
    sessionStorage.clear("account");
    window.location.reload();
  };
  const handlenotificationClose = () => {
    setAnchorEl2(null);
    handleMobileMenuClose();
    updateNotification();
  };
  const updateNotification = () => {
    Notifications?.map((x) => {
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
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={() => setAnchorEl(null)}
    >
      <MenuItem>
        <IconButton
          onClick={() =>
            dispatch(
              selectView({ ...general, theme: !general.theme, bgImg: " " })
            )
          }
          color="inherit"
        >
          {general.theme ? <Brightness7Icon /> : <Brightness4Icon />} &nbsp;
        </IconButton>
        <label
          htmlFor="file-upload"
          style={{ display: "flex", alignItems: "center" }}
        >
          <input
            id="file-upload"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
          <IconButton color="inherit" component="span">
            {fileUploadProgress ? <CircularProgress size={24}/> : <WallpaperIcon />}
          </IconButton>
          &nbsp; Theme
        </label>
      </MenuItem>
      <MenuItem sx={{ margin: "24px" }} onClick={handleMenuClose}>
        <LogoutIcon /> &nbsp; Logout
      </MenuItem>
    </Menu>
  );
  const handleFileUpload = async (file) => {
    setFileUploadProgress(true);
    try {
      const downloadURL = await uploadFile(file);
      console.log("File uploaded successfully:", downloadURL);
      // downloadURL && setGoalData({ ...goalData, image: downloadURL });
      downloadURL &&
        (await savePreferences({
          userId: account?.userId,
          bgImg: downloadURL,
        }).then(async () => {

          sessionStorage.setItem('account', JSON.stringify({...account, bgImg:downloadURL}) )
         
        }));
      // You can now use the downloadURL, e.g., set it in your state or send it to your backend
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
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
      {Notifications?.length > 1 ? (
        Notifications?.map((x) => (
          <>
            <MenuItem>
              <Stack
                display={"flex"}
                direction={"row"}
                width={"200px"}
                justifyContent={"space-between"}
              >
                <Typography fontSize={"14px"}>{x?.title}</Typography>
                <Typography fontSize={"14px"}>
                  {moment(x.dueDate).format("DD-MM-YYYY")}
                </Typography>
              </Stack>
            </MenuItem>
            <Divider />
          </>
        ))
      ) : (
        <Typography fontSize={"14px"} px={1}>
          {"No New Notifications"}
        </Typography>
      )}
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
      <MenuItem>
        <IconButton size="large" >
          <Link to="/">
            <Badge color="error">
              <ViewDayIcon
                style={
                  location.pathname === "/"
                    ? { color: "cyan", boxShadow: "0 0 30px 3px cyan" }
                    : {  color: general.theme ? "white" :'black'}
                }
                // style={{
                //   color: location.pathname === "/" ? "cyan" : "white",
                //   boxShadow:
                //     location.pathname === "/" && "0 0 30px 3px cyan",
                // }}
              />
            </Badge>
          </Link>
        </IconButton>
        <p>Goals List</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="calendar">
          <Link to={"/calendar"}>
            <Badge color="error">
              <CalendarMonthIcon
                style={
                  location.pathname === "/calendar"
                    ? { color: "cyan", boxShadow: "0 0 30px 6px cyan" }
                    : { color: general.theme ? "white" :'black'}
                }
              />
            </Badge>
          </Link>
        </IconButton>
        <p>Calendar</p>{" "}
      </MenuItem>

      <MenuItem onClick={handleNotificationsOpen}>
        <IconButton
          size="large"
          aria-label="new notifications"
          color="inherit"
          onClick={handleNotificationsOpen}
        >
          <Badge badgeContent={Notifications?.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          color="inherit"
        >
          <Link to="/timeLine">
            <Badge color="error">
              <HistoryIcon
                style={
                  location.pathname === "/timeLine"
                    ? { color: "cyan", boxShadow: "0 0 30px 3px cyan" }
                    : {  color: general.theme ? "white" :'black'}
                }
              />{" "}
            </Badge>
          </Link>
        </IconButton>
        <p>Time Line</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
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
          <img
            src="goal.png"
            width={"28px"}
            height={"28px"}
            style={{ margin: "12px", cursor: "pointer" }}
            onClick={() => navigate("/")}
            alt="logo"
          />{" "}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Goal Tracker
          </Typography>
          {account && (
            <>
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
                  sx={{ margin: "0px 4px", color: "primary" }}
                  color="primary"
                  size="large"
                  aria-label="show 17 new notifications"
                >
                  <Link to="/">
                    <Badge color="error">
                      <ViewDayIcon
                        style={
                          location.pathname === "/"
                            ? { color: "cyan", boxShadow: "0 0 30px 3px cyan" }
                            : { color: "white" }
                        }
                        // style={{
                        //   color: location.pathname === "/" ? "cyan" : "white",
                        //   boxShadow:
                        //     location.pathname === "/" && "0 0 30px 3px cyan",
                        // }}
                      />
                    </Badge>
                  </Link>
                </IconButton>

                <IconButton
                  sx={{ margin: "0px 4px" }}
                  size="large"
                  aria-label="show 4 new mails"
                >
                  <Link to={"/calendar"}>
                    <Badge color="error">
                      <CalendarMonthIcon
                        style={
                          location.pathname === "/calendar"
                            ? { color: "cyan", boxShadow: "0 0 30px 6px cyan" }
                            : { color: "white" }
                        }
                      />
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
                  <Badge badgeContent={Notifications?.length} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>

                <IconButton
                  sx={{ margin: "0px 4px" }}
                  size="large"
                  aria-label="show 17 new notifications"
                  color="inherit"
                  // onClick={handleNotificationsOpen}
                >
                  <Link to="/timeLine">
                    <Badge color="error">
                      <HistoryIcon
                        style={
                          location.pathname === "/timeLine"
                            ? { color: "cyan", boxShadow: "0 0 30px 3px cyan" }
                            : { color: "white" }
                        }
                      />{" "}
                    </Badge>
                  </Link>
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
            </>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotificationMenu}
    </Box>
  );
}

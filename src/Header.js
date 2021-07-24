import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import HeaderOption from "./HeaderOption";
import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import BusinessCenterOutlinedIcon from "@material-ui/icons/BusinessCenterOutlined";
import SmsIcon from "@material-ui/icons/Sms";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { logout, selectUser } from "./features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";

function Header() {
  const dispatch = useDispatch();
  const logoutOfApp = () => {
    dispatch(logout());
    auth.signOut();
  };

  return (
    <div className="header">
      <div className="header__left">
        <img
          src="https://www.flaticon.com/svg/static/icons/svg/174/174857.svg"
          alt="icon"
        ></img>

        <div className="header__search">
          <SearchIcon />
          <input placeholder="Search" type="text" />
        </div>
      </div>

      <div className="header__right">
        <HeaderOption Icon={HomeIcon} title="ホーム" />
        <HeaderOption Icon={SupervisorAccountIcon} title="つながり" />
        <HeaderOption Icon={BusinessCenterOutlinedIcon} title="求人" />
        <HeaderOption Icon={SmsIcon} title="メッセージ" />
        <HeaderOption Icon={NotificationsIcon} title="お知らせ" />
        <HeaderOption
          avatar={true}
          title="プロフィール"
          onClick={logoutOfApp}
        />
      </div>
    </div>
  );
}

export default Header;

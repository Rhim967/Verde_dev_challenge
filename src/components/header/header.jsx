import logo from "../../assets/react.svg";
import user from "../../assets/png-user.png";

import { userLogged } from "../../actions/userActions";

import { Badge } from "../ui/badge";
import { Bell, IconApps } from "../../icons/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const Header = ({ authorized }) => {
  const { total } = useSelector((state) => state.postsReducer);

  const dispatch = useDispatch();

  const onLoginTrigger = () => {
    dispatch(userLogged(!authorized));
  };
  return (
    <div className="wraper">
      <div className="logo-box flex items-center">
        <Link className="header-link text-sm" to="/">
          <img className="h-6" src={logo} alt=""></img>
          <h2 className="ml-2 font-bold">Arbit Blog</h2>
        </Link>
      </div>
      <div className="header-links grid grid-rows-1 grid-flow-col gap-4">
        {authorized ? (
          <Link className="header-link text-sm mr-3" to="/posts">
            <div className="box relative flex">
              <span> Posts </span>
              <Badge
                value={total}
                classNames={
                  "absolute bottom-2 left-8 bg-red-500 w-6 flex text-xs text-white rounded-full justify-center items-center"
                }
              ></Badge>
            </div>
          </Link>
        ) : null}
        <a href="#" className="header-link">
          <Bell />
        </a>
        <a href="#" className="header-link">
          <IconApps />
        </a>
        {!authorized ? (
          <button onClick={onLoginTrigger}>Log in</button>
        ) : (
          <Link onClick={onLoginTrigger} to="/">
            <img
              className="w-7 h-7 rounded-full"
              src={user}
              alt="profile photo"
            ></img>
            logout
          </Link>
        )}
      </div>
    </div>
  );
};

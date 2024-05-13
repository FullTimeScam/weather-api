import Button from "./Button";
import Logo from "./Logo";
import NavBar from "./NavBar";
import WeatherIcon from "./WeatherIcon";

const Header = () => {
  return (
    <header className="bg-blue-100 px-2 py-4 flex justify-between">
      <Logo />
      <div className="flex items-center gap-4">
        <NavBar />
        <Button name="..." isMoreButton={true} />
        <WeatherIcon />
      </div>
    </header>
  );
};

export default Header;

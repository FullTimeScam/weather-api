import Button from "./Button";

const NavBar = () => {
  return (
    <nav className="hidden md:flex gap-4">
      <Button name="메뉴1" />
      <Button name="메뉴2" />
      <Button name="로그인" />
    </nav>
  );
};

export default NavBar;

import Button from "../Button";
import MinimizeIcon from "../../../assets/icons/Minimize.svg";

const MinimizeButton = ({ onClick }) => {
  return (
    <Button onClick={onClick} className="shadow-window w-4 h-4 bg-window-background justify-center items-end flex">
      <img src={MinimizeIcon} className="mb-1" />
    </Button>
  );
};

export default MinimizeButton;

import Button from "../Button";
import CloseIcon from "../../../assets/icons/Close.svg";

const CloseButton = ({ onClick }) => {
  return (
    <Button onClick={onClick} className="shadow-window w-4 h-4 bg-window-background justify-center items-center flex">
      <img src={CloseIcon} alt="Close" />
    </Button>
  );
};

export default CloseButton;

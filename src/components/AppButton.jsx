const AppButton = ({ icon, textContent, link }) => {
  return (
    <a href={link}>
      <div className="button-primary cursor-pointer hover:scale-105 transition-all ease-in gap-2">
        {textContent}
      </div>
    </a>
  );
};

export default AppButton;

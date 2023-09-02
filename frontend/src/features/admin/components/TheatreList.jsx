import TheatreItem from "./TheatreItem";

const TheatreList = ({ isLoading,theatreList,onDeleteTheatre }) => {
  return (
    <>
      {theatreList.map((theatre) => (
        <TheatreItem
          key={theatre.id}
          isLoading={isLoading}
          theatre={theatre}
          onDeleteTheatre={onDeleteTheatre}
        ></TheatreItem>
      ))}
    </>
  );
};


export default TheatreList;

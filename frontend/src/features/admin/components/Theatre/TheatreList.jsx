import TheatreItem from "./TheatreItem";

const TheatreList = ({ isLoading,theatreList,onDeleteTheatre,onEditTheatre }) => {
  return (
    <>
      {theatreList.map((theatre) => (
        <TheatreItem
          key={theatre.id}
          isLoading={isLoading}
          theatre={theatre}
          onDeleteTheatre={onDeleteTheatre}
          onEditTheatre={onEditTheatre}
        ></TheatreItem>
      ))}
    </>
  );
};


export default TheatreList;

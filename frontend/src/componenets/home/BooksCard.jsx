import BookSingleCard from "./BookSingleCard.jsx";

const BooksCard = ({ books }) => {
  return (
    <div className="grid sm:grid-col-2 lg:grid-col-3 xl:grid-col-4">
      {books.map((item) => (
        <BookSingleCard key={item._id} book={item} />
      ))}
    </div>
  );
};

export default BooksCard;

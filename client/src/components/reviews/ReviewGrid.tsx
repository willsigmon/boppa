import ReviewCard from "./ReviewCard";

type Review = {
  quote: string;
  author: string;
  stars?: number;
};

const reviews: Review[] = [
  {
    quote: "Boppa Golf has given me an outlook on golf that I thought I'd never be able to experience. My custom fitting was an 11/10!",
    author: "Austin Oller",
    stars: 5
  },
  {
    quote: "My Taylormade M4 irons turned out GREAT! I couldn't believe how having the correct shaft flex improved my game.",
    author: "Zach Vessoni",
    stars: 5
  },
  {
    quote: "Doing local business with Boppa Golf has been so good! They provide the best club-work in a timely manner.",
    author: "Mark",
    stars: 5
  },
  {
    quote: "The grip replacement service was quick and professional. My clubs feel like new again!",
    author: "Sarah Johnson",
    stars: 5
  },
  {
    quote: "After Boppa Golf adjusted my driver, I've added 15 yards to my drives. Amazing service!",
    author: "Mike Peterson",
    stars: 5
  },
  {
    quote: "Their attention to detail is incredible. Every club was perfectly fitted to my height and swing.",
    author: "Jennifer Lee",
    stars: 5
  }
];

const ReviewGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {reviews.map((review, index) => (
        <ReviewCard 
          key={index}
          quote={review.quote}
          author={review.author}
          stars={review.stars}
        />
      ))}
    </div>
  );
};

export default ReviewGrid;

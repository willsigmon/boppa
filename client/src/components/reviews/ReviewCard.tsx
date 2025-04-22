import { Star } from "lucide-react";

type ReviewCardProps = {
  quote: string;
  author: string;
  stars?: number;
};

const ReviewCard = ({ quote, author, stars = 5 }: ReviewCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-100 p-6">
      <div className="mb-4">
        <div className="flex text-yellow-400">
          {[...Array(stars)].map((_, i) => (
            <Star key={i} className="w-5 h-5" fill="currentColor" />
          ))}
        </div>
      </div>
      <blockquote className="italic text-gray-700 mb-4">
        "{quote}"
      </blockquote>
      <div className="text-sm text-gray-600">
        - {author}
      </div>
    </div>
  );
};

export default ReviewCard;

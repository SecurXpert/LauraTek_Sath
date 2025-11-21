import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

interface CourseCardProps {
  id: string;
  title: string;
  image: string;
  description: string;
  duration: string;
  level: string;
}

const CourseCard = ({ id, title, image, description, duration, level }: CourseCardProps) => {
  return (
    <Card className="
      group overflow-hidden border border-[#001BB7] rounded-2xl 
      hover:shadow-xl hover:-translate-y-1 transition-all duration-300
      w-full max-w-sm mx-auto
    ">

      {/* Image with 5px Margin */}
<div className="relative overflow-hidden rounded-t-2xl bg-white">
  <div className="m-[5px]">
    <img 
      src={image} 
      alt={title}
      className="w-full h-48 font-mulish object-cover rounded-t-[calc(2rem-5px)] rounded-b-[calc(2rem-5px)] group-hover:scale-105 transition-transform duration-300"
    />
  </div>
  
  {/* Level Badge - Top Left (adjusted for margin) */}
  <div className="absolute top-[13px] left-[13px]">
    <span className="bg-purple-600 text-white text-xs font-medium px-2 py-1 rounded-full">
      {level}
    </span>
  </div>
</div>

      <CardContent className="p-5 space-y-3">
        {/* Title + Duration */}
        <div className="flex items-center justify-between">
          <h3 className="
            text-lg font-semibold text-blue-900 line-clamp-1
            group-hover:text-[#001BB7] transition-colors
          ">
            {title}
          </h3>
          <div className="flex items-center gap-1 text-sm text-[#001BB7]">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
          {description}
        </p>
      </CardContent>

      <CardFooter className="px-5 pb-5 pt-0">
        <Button 
          asChild 
          className="
            w-full bg-[#001BB7] hover:bg-[#0018a0] text-white 
            font-medium text-sm py-5 rounded-xl
            transition-colors
          "
        >
          <Link to={`/course/${id}`}>
            Explore Course
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
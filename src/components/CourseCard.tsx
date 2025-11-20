// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Link } from "react-router-dom";

// interface CourseCardProps {
//   id: string;
//   title: string;
//   image: string;
//   description: string;
//   duration: string;
//   level: string;
// }

// const CourseCard = ({ id, title, image, description, duration, level }: CourseCardProps) => {
//   return (
//     <Card className="
//       group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1
//       w-full max-w-[320px] sm:max-w-[360px] md:max-w-[400px] lg:max-w-[440px] xl:max-w-[480px] 2xl:max-w-[520px] 3xl:max-w-[560px]
//       mx-auto
//     ">
//       <div className="relative overflow-hidden">
//         <img 
//           src={image} 
//           alt={title}
//           className="
//             w-full 
//             h-36 sm:h-40 md:h-44 lg:h-48 xl:h-52 2xl:h-56 3xl:h-60 
//             object-cover group-hover:scale-105 transition-transform duration-300
//           "
//         />
//         <div className="
//           absolute top-1 sm:top-2 md:top-2 lg:top-3 xl:top-3 2xl:top-4 3xl:top-4
//           left-1 sm:left-2 md:left-2 lg:left-3 xl:left-3 2xl:left-4 3xl:left-4
//         ">
//           <span className="
//             bg-course-hero text-white 
//             px-1 sm:px-2 md:px-2 lg:px-2.5 xl:px-3 2xl:px-3.5 3xl:px-4
//             py-0.5 sm:py-1 md:py-1 lg:py-1 xl:py-1.5 2xl:py-1.5 3xl:py-2
//             rounded 
//             text-[0.65rem] sm:text-xs md:text-xs lg:text-sm xl:text-sm 2xl:text-base 3xl:text-lg
//             font-medium
//           ">
//             {level}
//           </span>
//         </div>
//       </div>
      
//       <CardContent className="
//         p-3 sm:p-4 md:p-5 lg:p-6 xl:p-7 2xl:p-8 3xl:p-9
//       ">
//         <h3 className="
//           text-base sm:text-lg md:text-xl lg:text-[1rem] xl:text-[1.625rem] 2xl:text-2xl 3xl:text-3xl
//           font-semibold mb-1 sm:mb-2 md:mb-2 lg:mb-3 xl:mb-3 2xl:mb-4 3xl:mb-4
//           text-foreground group-hover:text-primary transition-colors line-clamp-2
//         ">
//           {title}
//         </h3>
//         <p className="
//           text-muted-foreground 
//           text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl
//           mb-2 sm:mb-3 md:mb-3 lg:mb-4 xl:mb-4 2xl:mb-5 3xl:mb-5
//           line-clamp-3 leading-relaxed
//         ">
//           {description}
//         </p>
//         <div className="
//           flex items-center 
//           text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl
//           text-muted-foreground
//         ">
//           <span>{duration}</span>
//         </div>
//       </CardContent>
      
//       <CardFooter className="
//         px-3 sm:px-4 md:px-5 lg:px-6 xl:px-7 2xl:px-8 3xl:px-9
//         pb-3 sm:pb-4 md:pb-5 lg:pb-6 xl:pb-7 2xl:pb-8 3xl:pb-9
//       ">
//         <Button 
//           asChild 
//           variant="explore" 
//           className="
//             w-full 
//             text-xs sm:text-sm md:text-sm lg:text-base xl:text-lg 2xl:text-xl 3xl:text-2xl
//             py-1 sm:py-2 md:py-2 lg:py-2.5 xl:py-3 2xl:py-3.5 3xl:py-4
//           "
//         >
//           <Link to={`/course/${id}`}>
//             Explore Course
//           </Link>
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };

// export default CourseCard;


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
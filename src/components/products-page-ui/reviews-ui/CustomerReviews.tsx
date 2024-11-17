import { Avatar, AvatarImage } from "@/components/ui/avatar";
import moment from "moment";
import { BsStar, BsStarFill } from "react-icons/bs";

type Props = {
  userProfilePic: string;
  userUsername: string;
  rating: number;
  review: string;
  reviewTitle: string;
  createdAt: Date;
};

const CustomerReviews = (props: Props) => {
  const stars = Array(5).fill(0);

  return (
    <div className="flex items-start font-review mx-1 sm:mx-3 my-10 border-y-[1px] border-gray-400 py-5">
      <div className="w-[40px] h-[40px] rounded-[50%] overflow-hidden">
        <Avatar>
          <AvatarImage src={props.userProfilePic} />
        </Avatar>
      </div>
      <div className="flex flex-col items-start ms-2">
        <div className="flex gap-x-4 items-center ms-2">
          <p className="text-lg font-review font-medium">
            {props.userUsername}
          </p>
          <p className=" text-sm text-gray-500">
            &#x2022; {moment(new Date(props.createdAt)).fromNow()}
          </p>
        </div>
        <div className="flex text-lg my-1 ms-1 text-yellow-500">
          {stars.map((_, index) => {
            return (
              <div>
                {props.rating >= index + 1 ? <BsStarFill /> : <BsStar />}
              </div>
            );
          })}
        </div>
        <div className="mt-2 ms-1 max-w-[80vw] md:max-w-[60vw] flex flex-col items-start">
          <h3 className="text-xl text-gray-800 ">{props.reviewTitle}</h3>
          <p className="text-lg text-gray-600">{props.review}</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerReviews;
// <div className="flex flex-col items-start font-review mx-1 sm:mx-3 my-10 border-y-[1px] border-gray-400 py-5">
//     <div className="flex text-lg my-3 text-yellow-500">
//         {
//             stars.map((_, index) => {
//                 return (
//                     <div>
//                         {props.rating >= index + 1 ? <BsStarFill /> : <BsStar />}
//                     </div>
//                 )
//             })
//         }
//     </div>
//     <div className="flex gap-x-2 items-center">
//         <div className="w-[40px] h-[40px] rounded-[50%] overflow-hidden">
//             <Avatar>
//                 <AvatarImage src={props.userProfilePic} />
//             </Avatar>
//         </div>
//         <div className="flex gap-x-4 items-center ms-2">
//             <p className="text-lg font-review font-medium">{props.userUsername}</p>
//             <p className=" text-sm text-gray-500">&#x2022; {'now'}</p>
//         </div>
//     </div>
//     <div className="mt-2 ms-1 max-w-[80%] md:max-w-[60%] flex flex-col items-start">
//         <h3 className="text-xl text-gray-800 ">{props.reviewTitle}</h3>
//         <p className="text-lg text-gray-600">{props.review}</p>
//     </div>
// </div>


import type{QueryFilter} from "mongoose"
import Course,{type ICourse} from "../models/Course.js";



export type CourseQueryParams = {
  page?: string
  limit?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
  search?: string
}


// Icourse passed as array[] bcz we look for entire doc/col here i mean we use find() when we have one lookup like findOne() we jst pass ICourse 
type PaginatedCourseResult ={
  courses : ICourse[];
  pagination:{
    currentPage : number
    totalPages : number
    totalCourses : number
  }
}


export const getPaginatedCourses = async (baseQuery: QueryFilter<ICourse> = {}, queryParams: CourseQueryParams): Promise<PaginatedCourseResult> => {

  // here we do "1" to make sure if there is ntg bydefault it shld be one 
  const page = Math.max(1, parseInt(queryParams.page || "1") || 1);
  const limit = Math.max(1, parseInt(queryParams.limit || "4") || 4);

  const skip = (page - 1) * limit;

  const sortBy = queryParams.sortBy || "createdAt";
  const sortOrder = queryParams.sortOrder === "asc" ? 1 : -1;

  const sortObj: Record<string, 1 |-1 > = {};

  sortObj[sortBy] = sortOrder;

  let queryObj : QueryFilter<ICourse> = {...baseQuery};

  if (queryParams.search) {
    queryObj.title = {
      $regex: queryParams.search,
      $options: "i", // i makes the search case-insensitive
    };
  }

  const totalCourses = await Course.countDocuments(queryObj);

  const totalPages = Math.ceil(totalCourses / limit);

  let actualPage = page;
  let actualSkip = skip;

  if (page > totalPages && totalPages > 0) {
    actualPage = 1;
    actualSkip = 0;
  }

  const courses = await Course.find(queryObj)
    .populate("author", "username")
    .sort(sortObj)
    .skip(actualSkip)
    .limit(limit);

  return{
    courses,
    pagination:{
        currentPage : actualPage,
        totalPages,
        totalCourses
    }
  }
    
};



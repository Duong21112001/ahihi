import { StaticImageData } from "next/image";

export interface Course {
  id: number;
  name: string;
  thumbnail: string;
  intro_video: string;
  youtube_link: string;
  vimeo_link: string;
  price_vnd: number;
  price_jp: number;
  course_id: string;
  expired_at: number;
  description: string;
  detail: string;
  is_show: string;
  status: number;
  image: string;
  cat_id: string;
  cou_price: number;
  discount_value: number;
  teacher_name: string;
  start_date: string;
  end_date: string;
  teacher_id: string;
  cou_summary: string;
  star: number;
  total_rate: number;
}

export interface RegisterCourseParams {
  fullname: string;
  mobile: string;
  email: string;
  promo_code: string;
  payment_method: string;
  note: string;
  course_id: string;
  combo_id: string;
}
export interface AchievementResponse {
  id: number;
  userId: number;
  fullname: string;
  content: string;
  status: number;
  created_at: string;
  updated_at: string;
  avatar: string;
  score: string;
}

export interface SocialsResponse {
  id: number;
  title: string;
  platform: string;
  icon: string;
  status: number;
  banner: null;
  created_at: string;
  updated_at: string;
}
export interface CoursePayment {
  id: number;
  name: string;
  type: number;
  country: string;
  description: string;
  account_holder: string;
  account_number: string;
}

export interface Lectures {
  id: number;
  lec_title: string;
  lec_part_id: number;
  lec_active: number;
  video_titile: string;
  video_status: number;
  source_type: string;
  video_id: string;
  youtube_id: string;
  free: number;
  learned: number;
}
export interface CourseLessons {
  id: number;
  course_id: number;
  type: string;
  content_id: number;
  part_title: string;
  has_parent: number;
  parent_id: number;
  has_child: number;
  total_learned: number;
  list_lectures: Lectures[];
}
export interface CourseCats {
  id: number;
  course_id: number;
  type: string;
  content_id: number;
  part_title: string;
  has_parent: number;
  parent_id: number;
  has_child: number;
  total_learned: number;
  lessons: CourseLessons[];
}
export interface CourseContent {
  id: number;
  course_id: number;
  type: string;
  content_id: number;
  part_title: string;
  has_parent: number;
  parent_id: number;
  has_child: number;
  total_learned: number;
  cats: CourseCats[];
}

export interface Questions {
  id: number;
  parent_id: number;
  course_id: number;
  exam_id: number;
  lecture_id: number;
  ctype: string;
  name: string;
  point: number;
  question_limit: number;
  question: string;
  attachment: string;
  image: string;
  video_id: string;
  translate: string;
  answer_a: string;
  answer_b: string;
  answer_c: string;
  answer_d: string;
  correct_answer: string;
  lang_code: string;
  active: number;
  created_at: string;
  updated_at: string;
  trial_test_id: string;
  test_id: string;
  questions: SubSubQuestions[];
}
export interface SubSubQuestions {
  index: number;
  id: number;
  parent_id: number;
  course_id: number;
  exam_id: number;
  lecture_id: number;
  ctype: string;
  name: string;
  point: number;
  question_limit: number;
  question: string;
  attachment: string;
  image: string;
  video_id: string;
  translate: string;
  answer_a: string;
  answer_b: string;
  answer_c: string;
  answer_d: string;
  correct_answer: string;
  lang_code: string;
  active: number;
  created_at: string;
  updated_at: string;
  trial_test_id: string;
  test_id: string;
  questions: SubSubQuestions[];
}
export interface Exam {
  name: string;
  point: number;
  questions: Questions[];
}

export interface QuestionsResponse {
  data: Questions[];
}
export interface ListCourseContent {
  courses: CourseContent[];
}

export interface CoursePayments {
  data: CoursePayment[];
}

export interface CourseReponse {
  cat_id: number;
  name: string;
  cou_summary: string;
  detail: string;
  cou_price: number;
  price_jp: 2326;
  image: string;
  start: number;
  updated_at: string;
  intro_video_path: null;
  youtube_link: string;
  vimeo_link: string;
  curriculum: null;
  expired_at: number;
  teacher_id: number;
  hot: number;
  status: number;
  trans_state: null;
  teacher_name: string;
  teacher_desc: string;
  teacher_image: string;
  promo_title: null;
  discount_type: null;
  promotion_desc: null;
  start_date: null;
  end_date: null;
  num_students: 0;
  total_rate: 0;
  cover_path: string;
  state_name: string;
}

export interface TrialTests {
  id: number;
  name: string;
  slug: string;
  image: string;
  des: null;
  lang_code: string;
  start_date: string;
  end_date: string;
  is_online: number;
  created_at: string;
  updated_at: string;
  level: string;
  test: Test[];
  point: number;
}
export interface Test {
  id: number;
  tt_id: number;
  level_id: number;
  name: string;
  slug: string;
  image: string;
  pass_score: number;
  des: string;
  lang: string;
  is_online: number;
  created_at: string;
  updated_at: string;
}
export interface CategoriesProp {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  is_new: number;
}
export interface DocumentProps {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  category: number;
  created_by: string;
  status: number;
  meta_title: null;
  meta_description: null;
  meta_keywords: null;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  views: number;
}

export interface OnePaymentResponse {
  id: number;
  name: string;
  type: number;
  country: string;
  description: string;
  account_holder: string;
  account_number: string;
}

export interface CoursesOrderParams {
  fullname: string;
  mobile: string;
  email: string;
  promo_code?: string;
  payment_method: string;
  note: string;
  course_id: string;
}

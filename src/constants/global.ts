export const statusOptions = [
  {
    label: "Active",
    value: "active",
  },
  {
    label: "InActive",
    value: "inActive",
  },
];

export const locationOptions = [
  { label: "Dhaka", value: "Dhaka" },
  { label: "Rangpur", value: "Rangpur" },
  { label: "Rajshahi", value: "Rajshahi" },
  { label: "Khulna", value: "Khulna" },
  { label: "Barishal", value: "Barishal" },
  { label: "Chittagong", value: "Chittagong" },
  { label: "Chattagram", value: "Chattagram" },
  { label: "Sylhet", value: "Sylhet" },
  { label: "Mymensingh", value: "Mymensingh" },
];

export const StockOptions = [
  {
    label: "In Stock",
    value: "inStock",
  },
  {
    label: "Our Of Stock",
    value: "outOfStock",
  },
];

export const Stock = {
  inStock: "",
  outOfStock: "",
};

export const bloodGroupOptions = [
  {
    label: "A+",
    value: "A+",
  },
  {
    label: "A-",
    value: "A-",
  },
  {
    label: "B+",
    value: "B+",
  },
  {
    label: "B-",
    value: "B-",
  },
  {
    label: "AB+",
    value: "AB+",
  },
  {
    label: "AB-",
    value: "AB-",
  },
  {
    label: "O+",
    value: "O+",
  },
  {
    label: "O-",
    value: "O-",
  },
];

export const facultyOptions = [
  {
    label: "Engineering",
    value: "engineering",
  },
  {
    label: "Faculty of science and engineering",
    value: "Faculty of science and engineering",
  },
];
export const acDepartmentOptions = [
  {
    label: "CSE",
    value: "cse",
  },
  {
    label: "Software Engineering",
    value: "software engineering",
  },
];
export const acSemesterOptions = [
  {
    label: "Fall 2023",
    value: "fall23",
  },
  {
    label: "Autumn 2023",
    value: "autumn2023",
  },
  {
    label: "Summer 2023",
    value: "summer23",
  },
];

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const monthOptions = months.map((month: string) => {
  return {
    label: month,
    value: month,
  };
});

export const days = [
  "SATURDAY",
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
];
export const daysOptions = days.map((day: string) => {
  return {
    label: day,
    value: day,
  };
});

export const semesterRegistrationStatus = ["UPCOMING", "ONGOING", "ENDED"];

export enum ExamType {
  FINAL = "FINAL",
  MIDTERM = "MIDTERM",
}

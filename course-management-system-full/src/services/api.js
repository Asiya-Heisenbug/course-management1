import { supabase } from "./supabase";

function fromCourseRecord(record) {
  return {
    id: record.id,
    courseName: record.course_name,
    courseCode: record.course_code,
    instructor: record.instructor,
    duration: record.duration,
    level: record.level,
    category: record.category,
    image: record.image,
    status: record.status,
    overview: record.overview,
    description: record.description,
    learningOutcomes: record.learning_outcomes,
    modules: record.modules
  };
}

function toCourseRecord(course) {
  return {
    course_name: course.courseName,
    course_code: course.courseCode,
    instructor: course.instructor,
    duration: course.duration,
    level: course.level,
    category: course.category,
    image: course.image,
    status: course.status,
    overview: course.overview,
    description: course.description,
    learning_outcomes: course.learningOutcomes || [],
    modules: course.modules || []
  };
}

function unwrap({ data, error }) {
  if (error) throw error;
  return { data: data ? fromCourseRecord(data) : null };
}

export async function getCourses() {
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("id");
  if (error) throw error;
  return { data: data.map(fromCourseRecord) };
}

export async function createCourse(course) {
  return unwrap(await supabase
    .from("courses")
    .insert(toCourseRecord(course))
    .select()
    .single());
}

export async function updateCourse(id, course) {
  return unwrap(await supabase
    .from("courses")
    .update(toCourseRecord(course))
    .eq("id", id)
    .select()
    .single());
}

export async function removeCourse(id) {
  const { error } = await supabase.from("courses").delete().eq("id", id);
  if (error) throw error;
}

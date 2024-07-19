import { Question } from "@/types";
import SidebarItem from "@/components/SidebarItem";

async function getQuestions() {
  const res = await fetch(`${process.env.FETCH_URL}/question/findAll`);
  // 相当于 const res = fetch(`https://...`, { cache: 'force-cache' })
  const questions = await res.json();

  return questions;
}

export default async function Sidebar() {
  const questions: Question[] = await getQuestions();
  return (
    <>
      <div className="sidebar bg-pink-50 px-3 py-5">
        <div className="sidebar-content">
          <div className="sidebar-header">
            <h1>Sidebar</h1>
          </div>
          <div className="sidebar-body">
            {questions.map((question) => (
              <SidebarItem key={question.id} questionId={question.id} question={question} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

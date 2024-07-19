import { Question } from "@/types";
import Eventloop from "@/components/eventloop";
import Programming from "@/components/programming";

const getQuestions = async (questionId: number) => {
  const res = await fetch(`${process.env.FETCH_URL}/question/findOne?id=${questionId}`);
  // 相当于 const res = fetch(`https://...`, { cache: 'force-cache' })
  const question: Question = await res.json();

  return question;
};

export default async function Page({ params }: any) {
  const questionId = params.id;
  const question = await getQuestions(questionId);
  
  return (
    <>
        <div>{question.title}</div>
        {/* <div>{question.description}</div> */}

        <div className="mt-10">
          {/* 如果 question.type 为 EVENTLOOP 则显示 Eventloop 组件 */}
          {question.type==="EVENTLOOP" && <Eventloop key={question.id} question={question} />}

          {/* 如果 question.type 为 PROGRAMMING 则显示 Programming 组件 */}
          {question.type==="PROGRAMMING" && <Programming key={question.id} question={question} />}
        </div>
    </>
  )
}

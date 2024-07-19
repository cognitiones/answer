"use client";

import { Question } from "@/types";
import { useRouter } from "next/navigation";

interface Props {
  questionId: number;
  question: Question;
}

export default function SidebarItem({ questionId, question }: Props) {
  const router = useRouter();
  return (
    <div className="sidebar-item">
      <h2
        onClick={(e) => {
          router.push(`/questions/${questionId}`);
        }}
      >
        {question.title}
      </h2>
    </div>
  );
}

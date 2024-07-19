"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Question, Choice } from "@/types";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  question: Question;
}

export default function Programming({ question }: Props) {
  const { toast } = useToast();
  const [answer, setAnswer] = useState(`${question.programming!.stem}`);
  console.log(question);
  
  const handleSubmit = () => {
    const func = new Function(`
        ${question.programming!.stem} 

        return toSet(array);
    `);
    console.log(func,'func')
    const result = func();
    const resultStr = JSON.stringify(result);
    const solution = question.programming?.solution;
    console.log(resultStr);
    console.log(solution);

    if (resultStr === solution) {
      toast({
        title: "答对了。",
      });
    }else{
      toast({
        variant: "destructive",
        title: "答错了。",
      });
    }
  };
  return (
    <>
      <div>
        <pre className="code-block overflow-y-auto">
          {question.description.trim()}
        </pre>
        <div className="grid w-full gap-2 mt-10">
          <Textarea
            className="min-h-40"
            placeholder="请输入你的答案"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />

          <Button onClick={handleSubmit}>Send message</Button>
        </div>
      </div>
    </>
  );
}

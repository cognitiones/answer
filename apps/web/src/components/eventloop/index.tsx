"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Question, Choice } from "@/types";
import { useState } from "react";

interface Props {
  question: Question;
}

export default function Eventloop({ question }: Props) {
  const { toast } = useToast();
  const choices = question.eventloop!.choices;
  const [selectedValues, setSelectedValues] = useState<string[]>(
    Array(choices.length).fill("")
  );

  const handleSelectChoice = (value: string, index: number) => {
    setSelectedValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
      return newValues;
    });
  };

  const handleSubmit = () => {
    //判断都不为空
    if (selectedValues.every((value) => value)) {
      const correctAnswer = question.eventloop!.correctAnswer;
      const answer = selectedValues.join(",");


      if (answer === question.eventloop!.correctAnswer) {
        toast({
          title: "答对了。",
        });
      } else {
        toast({
          variant: "destructive",
          title: "答错了。",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "答错了。",
      });
    }
  };

  return (
    <>
      <div className="flex">
        <pre className="code-block overflow-y-auto h-[85vh]">
          {question.description.trim()}
        </pre>
        <div className="ml-20">
          {choices.map((choice, index) => (
            <div key={index} className="mb-2 w-[120px]">
              <Select
                onValueChange={(value) => handleSelectChoice(value, index)}
              >
                <SelectTrigger id={`framework-${index}`}>
                  <SelectValue placeholder="请选择..." />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem key="" value=" ">
                    请选择...
                  </SelectItem>
                  {choices
                    .filter(
                      (option) =>
                        !selectedValues.includes(option.value) ||
                        selectedValues[index] === option.value
                    )
                    .map((filteredChoice, idx) => (
                      <SelectItem key={idx} value={filteredChoice.value}>
                        {filteredChoice.label}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          ))}
          <Button className="w-[120px] mt-5" onClick={handleSubmit}>
            提交
          </Button>
        </div>
      </div>
    </>
  );
}

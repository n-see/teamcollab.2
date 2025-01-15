"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import z from 'zod'
import dynamic from "next/dynamic";


// interface IssueForm {
//   title: string;
//   description: string;
// }

const SimpleMDE = dynamic(() => import ("react-simplemde-editor"),
{ssr:false})


 type  IssueForm = z.infer<typeof createIssueSchema>


const NewIssuePage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema),
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
 
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error has occurred");
    }
  });
  return (
    <>
      <div className="max-w-xl">
        {error && (
          <Callout.Root color="red" className="mb-5">
            <Callout.Text>{error}</Callout.Text>
          </Callout.Root>
        )}
        <form className=" space-y-3" onSubmit={onSubmit}>
          <TextField.Root size="2" placeholder="title" {...register("title")} />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="description" {...field} />
            )}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
          <Button disabled={isSubmitting}>
            Submit New Issue{isSubmitting && <Spinner />}
          </Button>
        </form>
      </div>
    </>
  );
};

export default NewIssuePage;

"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { getBaseUrlClient } from "../../constants/server"
import { z } from "zod"
import axios from "axios"
import { useState, useEffect } from "react";

import { useSubmit } from "./useSubmit"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const FormSchema = z.object({
  courseId: z
    .string({
      required_error: "Por favor selecione uma opção",
    }),
  userId: z
    .string({
      required_error: "Por favor selecione uma opção",
    })
})

export function CreateEnrollmentForm() {
  const { onSubmit } = useSubmit("enrollments");

  const getApiData = async () => {
    const { data: usersData } = await axios.get(`${getBaseUrlClient()}/users`);
    const { data: coursesData } = await axios.get(`${getBaseUrlClient()}/courses`);
    
    return [usersData, coursesData]
  }
  

  const form = useForm({
    resolver: zodResolver(FormSchema) 
  })

  
  let [users, setUsers] = useState([]);
  let [courses, setCourses] = useState([]);

  useEffect(() => {
    getApiData()
    .then(data => {
      setUsers(data[0]);
      setCourses(data[1]);
    });
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="userId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuário</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um usuário" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    users.map(user => {
                      return <SelectItem key={user.id} value={user.id}>{user.name}</SelectItem>
                    })
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="courseId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Curso</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um curso" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    courses.map(course => {
                      return <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>
                    })
                  }
                </SelectContent>
              </Select>
              <FormMessage />  
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

import axios from "axios";
import { getBaseUrlClient } from "../../constants/server";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function GenericForm({ requiredFields, requestPath, entityTitle }) {
  const { toast } = useToast();

  const zoidObjectForm = {};

  // Criar o esquema Zod com conversão para números
  requiredFields.forEach((field) => {
    if (field.type === "number") {
      zoidObjectForm[field.accessorKey] = z
        .string()
        .nonempty({ message: "O campo não pode ser vazio" })
        .transform((val) => (val ? Number(val) : undefined)) // Converter para número
        .refine((val) => !isNaN(val), { message: "Deve ser um número válido" });
    } else {
      zoidObjectForm[field.accessorKey] = z.string().nonempty({
        message: "O campo não pode ser vazio",
      });
    }
  });

  const formSchema = z.object(zoidObjectForm);

  // Definir valores padrão
  const defaultValues = requiredFields.reduce((acc, field) => {
    acc[field.accessorKey] = field.type === "number" ? "" : "";
    return acc;
  }, {});

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  async function onSubmit(values) {
    let message = "Criado com sucesso";
    let hasFailed = false;

    try {
      await axios.post(`${getBaseUrlClient()}/${requestPath}`, values);
    } catch (e) {
      if (e?.response?.data?.message) {
        message = e.response.data.message;
      } else {
        message = "Falha ao criar";
      }
      hasFailed = true;
    } finally {
      toast({
        title: `${hasFailed ? "Erro" : "Sucesso"}`,
        description: message,
        variant: hasFailed ? "destructive" : "default",
      });
    }
  }

  return (
    <Form {...form}>
      <h2 className="font-bold">Criar {entityTitle}</h2>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 w-full">
        {requiredFields.map((fieldItem) => (
          <FormField
            key={fieldItem.accessorKey}
            control={form.control}
            name={fieldItem.accessorKey}
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel>{fieldItem.header}</FormLabel>
                <FormControl>
                  <Input
                    type={fieldItem.type}
                    placeholder={`Digite seu ${fieldItem.header}`}
                    {...field}
                    value={field.value ?? ""} // Prevenir undefined
                    aria-invalid={fieldState.invalid ? "true" : "false"}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit" aria-label="Enviar formulário">
          Enviar
        </Button>
      </form>
    </Form>
  );
}

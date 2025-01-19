"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { getBaseUrlClient } from "../../constants/server";

export function useSubmit(requestPath) {
  const router = useRouter(); // Inicializando o router
  const { toast } = useToast(); // Inicializando o toast

  async function onSubmit(values) {
    let message = "Criado com sucesso";
    let hasFailed = false;

    try {
      await axios.post(`${getBaseUrlClient()}/${requestPath}`, values);

      router.push(`/${requestPath}`); // Redirecionando o usuário
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

  return { onSubmit }; // Retornando a função onSubmit para ser usada
}
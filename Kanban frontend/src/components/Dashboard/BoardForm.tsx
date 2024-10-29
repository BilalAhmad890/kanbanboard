import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BoardDto as BoardDtoSchema, boardSchema } from "@/lib/zod";

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
import { Textarea } from "@/components/ui/textarea";
import { BoardDto } from "@/Types/types";
import ErrorMessage from "@/lib/error-message";
import { Loader2 } from "lucide-react";

export interface BoardFormProps {
  onSubmit: (data: BoardDto) => void;
  onCancel: () => void;
  globalError: string;
  isPending: boolean;
}

export function BoardForm({ onSubmit, onCancel, globalError, isPending}: BoardFormProps) {
  const form = useForm<BoardDtoSchema>({
    resolver: zodResolver(boardSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  return (
    <>
      {globalError && <ErrorMessage error={globalError} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">{isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
            )}Create</Button>
          </div>
        </form>
      </Form>
    </>
  );
}

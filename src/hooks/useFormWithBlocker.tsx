import { useForm, FormOptions } from "@tanstack/react-form";
import { useBlocker } from "@tanstack/react-router";

function useFormWithBlocker<T>({ ...formOptions }: FormOptions<T>) {
  const form = useForm<T>(formOptions);

  const isDirty = form.useStore((state) => state.isDirty);
  const isSubmitting = form.useStore((state) => state.isSubmitting);

  const blocker = useBlocker({
    condition: isDirty && !isSubmitting,
  });

  return {
    form,
    blocker,
    isBlocked: blocker.status === "blocked" && !isSubmitting,
  };
}

export default useFormWithBlocker;

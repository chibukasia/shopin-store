"use client"
import FileDropzone from "@/components/molecules/forms/FileDropzone";
import FormInput from "@/components/molecules/forms/FormInput";
import FormSelect from "@/components/molecules/forms/FormSelect";
import FormTextarea from "@/components/molecules/forms/FormTextArea";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

const CreateStoreScreen = () => {
  const form = useForm();
  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="gap-3">
          <FormInput
            name="store_name"
            label="Store Name"
            control={form.control}
            placeholder="Enter store name"
          />
          <FormSelect
            name="country"
            label="Country"
            control={form.control}
            placeholder="Select country..."
            items={[
              { label: "Kenya", value: "Kenya" },
              { label: "Uganda", value: "Uganda" },
              { label: "Tanzania", value: "Tanzania" },
              { label: "Rwanda", value: "Rwanda" },
            ]}
          />
          <FormTextarea
            control={form.control}
            name="description"
            label="Store description"
            placeholder="Describe your store"
          />
          <FileDropzone control={form.control} name="logo" label="Store Logo"/>
          <FileDropzone control={form.control} name="documents" label="Other Documents"/>
        </form>
      </Form>
    </div>
  );
};

export default CreateStoreScreen;

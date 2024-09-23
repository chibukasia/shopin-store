"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputProps } from "@/components/ui/input";
import Dropzone from "react-dropzone";
import { Control } from "react-hook-form";
import { MdCloudUpload } from "react-icons/md";

interface FDropzoneProps extends InputProps {
  control: Control;
  label: string;
  name: string;
  description?: string;
}
const FileDropzone = (props: FDropzoneProps) => {
  const { name, control, label, description } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Dropzone onDrop={(acceptedFiles) => console.log(acceptedFiles)}>
              {({ getRootProps, getInputProps }) => (
                <section {...getRootProps()} className="flex bg-muted rounded-xl p-4 items-center justify-center border-4 border-dashed">
                  <div>
                    <div className="flex justify-center">
                      <MdCloudUpload
                        size={64}
                        className="bg-muted text-gray-300"
                      />
                    </div>
                    <div >
                      <input {...getInputProps()} {...field} />
                      <p>
                        Drag &apos;n&apos; drop some files here, or click to
                        select files
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </Dropzone>
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FileDropzone;

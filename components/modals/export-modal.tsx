/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import exportFromJSON from "export-from-json";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Form, FormField, FormItem } from "../ui/form";
import { useModalStore } from "@/hooks/use-modal-store";
function generateCSVArray(mockDetailData: any) {
  const labels = mockDetailData.labels;
  const emotions = Object.keys(mockDetailData).filter(
    (key) => key !== "labels"
  );

  const csvArray = [];

  // Add header row
  const headerRow = ["timestamp", ...emotions];
  csvArray.push(headerRow);

  // Add data rows
  for (let i = 0; i < labels.length; i++) {
    const row = [labels[i]];
    for (let j = 0; j < emotions.length; j++) {
      row.push(mockDetailData[emotions[j]][i]);
    }
    csvArray.push(row);
  }

  return csvArray;
}
const ExportModal = () => {
  const {
    isOpen,
    modalType,
    onClose,
    data: meetingDataDetail,
  } = useModalStore();
  const isModalOpen = isOpen && modalType === "exportMeetingData";

  const formSchema = z.object({
    format: z.string().min(1, {
      message: "Please select a format.",
    }),

   
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      format: "",
    },
  });

  const handleExport = async (values: z.infer<typeof formSchema>) => {
    switch (values.format) {
      case "csv":
        const dataCsv = generateCSVArray(meetingDataDetail);
        exportFromJSON({
          data: dataCsv,
          fileName: "meeting",
          exportType: "csv",
        });
        break;
      case "xls":
        const data = generateCSVArray(meetingDataDetail);
        exportFromJSON({ data: data, fileName: "meeting", exportType: "xls" });
        break;
      default:
        break;
    }

  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden dark:bg-gray-800 dark:text-white">
        <Form {...form}>
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Export Data
            </DialogTitle>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(handleExport)}
            className="flex flex-col"
          >
            <div className="w-full p-5">
              <label>Select export format: </label>
              <FormField
                control={form.control}
                name="format"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Format</SelectLabel>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="xls">Excel</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              variant="default"
              className="mx-auto  mb-3 w-full md:w-1/2 text-white bg-cyan-950 hover:bg-cyan-900 dark:bg-cyan-900 dark:hover:bg-cyan-950"
            >
              Export
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ExportModal;

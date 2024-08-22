"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { city, industry, service, speciality } from "@prisma/client";
import { isSea } from "node:sea";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { searchValidation, SearchValidation } from "../validation";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppState } from "@/lib/state";
import qs from "qs";
import { useRouter } from "next/navigation";

interface FiltersProps {
  city: city[];
  specialty: speciality[];
  industry: industry[];
  service: service[];
  filters: SearchValidation;
}

function filterNonNull(obj: any) {
  return Object.fromEntries(Object.entries(obj).filter(([k, v]) => v));
}

const Filters = ({
  city,
  specialty,
  industry,
  service,
  filters,
}: FiltersProps) => {
  const setFilters = useAppState((state) => state.setFilters);

  const form = useForm<SearchValidation>({
    values: {
      search: filters.search ?? "",
      specialities: filters.specialities ?? [],
      industry: filters.industry ?? [],
      services: filters.services ?? [],
      city: filters.city ?? [],
      page: filters.page,
    },
    resolver: zodResolver(searchValidation),
  });

  const [open, setOpen] = useState<string[]>([]);

  const handleSubmit = (data: SearchValidation) => {
    setFilters(data);
    window.history.pushState(
      null,
      "",
      "?" +
        qs.stringify(filterNonNull(data), {
          arrayFormat: "repeat",
        }),
    );
  };

  return (
    <div className="grid gap-4">
      <p className="font-bold">Filter Companies</p>
      <Form {...form}>
        <form onChange={form.handleSubmit(handleSubmit)} className="grid gap-2">
          <Input placeholder="Search..." {...form.register("search")} />
          <div>
            <Accordion type="multiple" value={open} onValueChange={setOpen}>
              <AccordionItem value="cities">
                <AccordionTrigger>{`Headquarters`}</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-1 max-h-[350px] overflow-y-auto">
                    {city.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.slug)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        item.slug,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.slug,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.name}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="speciality">
                <AccordionTrigger>Speciality</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-1 max-h-[350px] overflow-y-auto">
                    {specialty.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="specialities"
                        render={({ field }) => (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.slug)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        item.slug,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.slug,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="industry">
                <AccordionTrigger>Industry</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-1 max-h-[350px] overflow-y-auto">
                    {industry.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.slug)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        item.slug,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.slug,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="services">
                <AccordionTrigger>Services</AccordionTrigger>
                <AccordionContent>
                  <div className="grid gap-1 max-h-[350px] overflow-y-auto">
                    {service.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="services"
                        render={({ field }) => (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.slug)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
                                        item.slug,
                                      ])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.slug,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Filters;

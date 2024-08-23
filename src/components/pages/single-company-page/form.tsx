import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Prisma } from "@prisma/client";
import { useForm } from "react-hook-form";
import { claimValidation, ClaimValidation } from "./validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { submitClaim } from "./action";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type FullCompany = Prisma.companyGetPayload<{
  include: {
    industry_on_company: {
      include: {
        industry: true;
      };
    };
    services_on_company: {
      include: {
        service: true;
      };
    };
    speciality_on_company: {
      include: {
        speciality: true;
      };
    };
    city: true;
    claim: true;
  };
}>;

interface ClaimFormProps {
  data: FullCompany;
}

const ClaimForm = ({ data }: ClaimFormProps) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);

  const form = useForm<ClaimValidation>({
    values: {
      first: "",
      last: "",
      email: "",
      phone: "",
      message: "",
    },
    resolver: zodResolver(claimValidation),
  });

  const claimMutation = useMutation({
    mutationKey: ["claim-submit", data.id],
    mutationFn: (info: ClaimValidation) => submitClaim(data.id, info),
    onSuccess: () => {
      setDone(true);
      setOpen(false);
    },
  });

  const handleSubmit = (info: ClaimValidation) => {
    claimMutation.mutate(info);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button disabled={!!data.claim.length} onClick={() => setOpen(true)}>
            {data.claim.length ? "Claimed" : "Claim"}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Claim the company</DialogTitle>
            <DialogDescription>
              Enter your information to claim the company
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="grid gap-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <FormItem>
                  <FormLabel>First name</FormLabel>
                  <FormControl>
                    <Input {...form.register("first")} placeholder="Tim" />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.first?.message}
                  </FormMessage>
                </FormItem>
                <FormItem>
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input {...form.register("last")} placeholder="de Vries" />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.last?.message}
                  </FormMessage>
                </FormItem>
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register("email")}
                      type="email"
                      placeholder="mail@example.com"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.email?.message}
                  </FormMessage>
                </FormItem>
                <FormItem>
                  <FormLabel>Phone number</FormLabel>
                  <FormControl>
                    <Input
                      {...form.register("phone")}
                      placeholder="+994 51 649 29 12"
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.phone?.message}
                  </FormMessage>
                </FormItem>
                <FormItem className="md:col-span-2">
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      {...form.register("message")}
                      placeholder="Enter your message..."
                    />
                  </FormControl>
                  <FormMessage>
                    {form.formState.errors.message?.message}
                  </FormMessage>
                </FormItem>
              </div>
              <DialogFooter>
                <Button
                  onClick={() => setOpen(false)}
                  disabled={claimMutation.isPending}
                  type="button"
                  variant={"outline"}
                >
                  Cancel
                </Button>
                <Button disabled={claimMutation.isPending}>Submit</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <AlertDialog
        open={done}
        onOpenChange={() => {
          queryClient.invalidateQueries({ queryKey: ["company", data.slug] });
          setDone(false);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Success!</AlertDialogTitle>
            <AlertDialogDescription>
              {`We will contact you about your claim. Don't worry, nobody else will be able to claim while you wait`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ClaimForm;

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "./components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {useForm} from 'react-hook-form';
import './index.css';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  company: z.string(),
  email: z.string().email(),
  dateOfBirth: z.object({
    month: z.string(),
    day: z.string(),
    year: z.string(),
  })
})

type FormData = z.infer<typeof schema>;

export function App() {

  const { handleSubmit, register, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <div className='flex items-center justify-center h-screen w-full bg-zinc-100'>
      <div className='w-full max-w-2xl bg-white shadow rounded-md p-8'>
        <h1 className='text-xl font-bold text-center'>Registration</h1>
        <form className='flex gap-4 flex-col mt-8' onSubmit={handleSubmit(onSubmit)}>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <Label>First Name</Label>
              <Input className="mt-2" type="text" {...register('firstName')} />
              <span className="text-red-500 text-xs">Input Error</span>
            </div>
            <div>
              <Label>Last Name</Label>
              <Input className="mt-2" type="text" {...register('lasttName')} />
            </div>
          </div>
          <div className='grid  grid-cols-2 gap-4'>
            <div>
              <Label>Email</Label>
              <Input className="mt-2" type="email" {...register('email')} />
            </div>
            <div>
              <Label>Company</Label>
              <Input className="mt-2" type="text" {...register('company')} />
            </div>
          </div>
          <div className='grid  grid-cols-3 gap-4 items-end'>
            <div>
              <Label>Date of Birth</Label>
              <Select {...register('DateOfBirth.month')} >
                <SelectTrigger className="w-full mt-2">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {Array(12).fill(1).map((_, index) => {
                    const value = String(index + 1).padStart(2, '0');
                    return (
                      <SelectItem id={String(index)} value={value}>{value}</SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select {...register('DateOfBirth.day')}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  {Array(31).fill(1).map((_, index) => {
                    const value = String(index + 1).padStart(2, '0');
                    return (
                      <SelectItem id={String(index)} value={value}>{value}</SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select {...register('DateOfBirth.year')}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array(151).fill(1).map((_, index) => {
                    const value = String(index + 1950).padStart(4, '0');
                    return (
                      <SelectItem id={String(index)} value={value}>{value}</SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button className="mt-2" type="submit">Register</Button>
        </form>
      </div>
    </div>
  )
};
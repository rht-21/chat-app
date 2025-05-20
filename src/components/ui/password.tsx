"use client";

import { cn } from "@/lib/utils";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";
import { useState } from "react";

function Password({ className, ...props }: React.ComponentProps<"input">) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <label htmlFor="password" className="sr-only">
        Password
      </label>
      <input
        id="password"
        type={show ? "text" : "password"}
        placeholder="Enter your password"
        data-slot="input"
        className={cn(
          "!bg-transparent file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full sm:min-w-72 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="px-2 absolute right-3 sm:right-2 top-2 cursor-pointer"
        aria-label={show ? "Hide password" : "Show password"}
        aria-pressed={show}
      >
        {show ? (
          <IconEye
            stroke={1.5}
            size={20}
            className="text-foreground/70 hover:text-foreground duration-150 group-hover:text-foreground"
          />
        ) : (
          <IconEyeClosed
            stroke={1.5}
            size={20}
            className="text-foreground/70 hover:text-foreground duration-150 group-hover:text-foreground"
          />
        )}
      </button>
    </div>
  );
}

export { Password };

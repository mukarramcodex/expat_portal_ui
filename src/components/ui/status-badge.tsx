import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const statusBadgeVariants = cva(
  "inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      variant: {
        pending: "bg-warning-light text-warning border border-warning/20",
        approved: "bg-success-light text-success border border-success/20",
        rejected: "bg-destructive-light text-destructive border border-destructive/20",
        active: "bg-info-light text-info border border-info/20",
        inactive: "bg-muted-dark text-muted-foreground border border-border",
        processing: "bg-primary-light text-primary border border-primary/20",
      },
    },
    defaultVariants: {
      variant: "pending",
    },
  }
);

export interface StatusBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusBadgeVariants> {
  status?: string;
}

const StatusBadge = ({ className, variant, status, ...props }: StatusBadgeProps) => {
  // Auto-detect variant from status string if not provided
  const autoVariant = React.useMemo(() => {
    if (variant) return variant;
    if (!status) return "pending";
    
    const statusLower = status.toLowerCase();
    if (statusLower.includes("approved") || statusLower.includes("complete")) return "approved";
    if (statusLower.includes("reject") || statusLower.includes("fail")) return "rejected";
    if (statusLower.includes("active")) return "active";
    if (statusLower.includes("inactive")) return "inactive";
    if (statusLower.includes("process")) return "processing";
    
    return "pending";
  }, [variant, status]);

  return (
    <span 
      className={cn(statusBadgeVariants({ variant: autoVariant }), className)} 
      {...props}
    >
      {status || "Pending"}
    </span>
  );
};

export { StatusBadge, statusBadgeVariants };
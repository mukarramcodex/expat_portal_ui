import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, XCircle, Clock, AlertTriangle } from "lucide-react"

interface BulkActionsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedItems?: any[]
  itemType?: "workers" | "clinics" | "payments" | "documents"
}

export function BulkActionsDialog({ 
  open, 
  onOpenChange, 
  selectedItems = [], 
  itemType = "workers" 
}: BulkActionsDialogProps) {
  const [action, setAction] = useState("")
  const [reason, setReason] = useState("")
  const [comments, setComments] = useState("")

  const getActionsForType = (type: string) => {
    switch (type) {
      case "workers":
        return [
          { value: "approve", label: "Approve Selected", icon: CheckCircle, color: "success" },
          { value: "reject", label: "Reject Selected", icon: XCircle, color: "destructive" },
          { value: "pending", label: "Mark as Pending", icon: Clock, color: "warning" },
          { value: "request_documents", label: "Request Documents", icon: AlertTriangle, color: "default" }
        ]
      case "clinics":
        return [
          { value: "approve_license", label: "Approve License", icon: CheckCircle, color: "success" },
          { value: "reject_license", label: "Reject License", icon: XCircle, color: "destructive" },
          { value: "schedule_audit", label: "Schedule Audit", icon: Clock, color: "warning" },
          { value: "request_revision", label: "Request Revision", icon: AlertTriangle, color: "default" }
        ]
      case "payments":
        return [
          { value: "approve_payment", label: "Approve Payment", icon: CheckCircle, color: "success" },
          { value: "reject_payment", label: "Reject Payment", icon: XCircle, color: "destructive" },
          { value: "request_verification", label: "Request Verification", icon: AlertTriangle, color: "default" }
        ]
      default:
        return [
          { value: "approve", label: "Approve", icon: CheckCircle, color: "success" },
          { value: "reject", label: "Reject", icon: XCircle, color: "destructive" }
        ]
    }
  }

  const actions = getActionsForType(itemType)

  const requiresReason = ["reject", "reject_license", "reject_payment", "request_documents", "request_revision", "request_verification"].includes(action)

  const handleSubmit = () => {
    // Handle bulk action
    console.log({ 
      action, 
      reason, 
      comments, 
      selectedItems: selectedItems.map(item => item.id) 
    })
    onOpenChange(false)
  }

  const selectedAction = actions.find(a => a.value === action)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Bulk Actions</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          {/* Selected Items Summary */}
          <div className="space-y-2">
            <Label>Selected Items</Label>
            <div className="p-3 bg-muted rounded-md">
              <p className="text-sm font-medium">
                {selectedItems.length} {itemType} selected
              </p>
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedItems.slice(0, 3).map((item, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {item.name || item.passport || item.id}
                  </Badge>
                ))}
                {selectedItems.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{selectedItems.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Action Selection */}
          <div className="space-y-2">
            <Label htmlFor="action">Select Action</Label>
            <Select value={action} onValueChange={setAction}>
              <SelectTrigger>
                <SelectValue placeholder="Choose an action" />
              </SelectTrigger>
              <SelectContent>
                {actions.map((actionItem) => {
                  const Icon = actionItem.icon
                  return (
                    <SelectItem key={actionItem.value} value={actionItem.value}>
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {actionItem.label}
                      </div>
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Action Preview */}
          {selectedAction && (
            <div className="p-3 border rounded-md">
              <div className="flex items-center gap-2 mb-2">
                <selectedAction.icon className="h-4 w-4" />
                <span className="font-medium">{selectedAction.label}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                This action will be applied to {selectedItems.length} selected {itemType}.
              </p>
            </div>
          )}

          {/* Reason (if required) */}
          {requiresReason && (
            <div className="space-y-2">
              <Label htmlFor="reason">Reason *</Label>
              <Select value={reason} onValueChange={setReason}>
                <SelectTrigger>
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="incomplete_documents">Incomplete Documents</SelectItem>
                  <SelectItem value="invalid_information">Invalid Information</SelectItem>
                  <SelectItem value="failed_verification">Failed Verification</SelectItem>
                  <SelectItem value="policy_violation">Policy Violation</SelectItem>
                  <SelectItem value="technical_issues">Technical Issues</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Comments */}
          <div className="space-y-2">
            <Label htmlFor="comments">
              Comments {requiresReason && "*"}
            </Label>
            <Textarea 
              id="comments"
              placeholder={
                requiresReason 
                  ? "Please provide detailed comments explaining the reason..."
                  : "Optional comments..."
              }
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows={3}
            />
          </div>

          {/* Warning */}
          {action && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-yellow-800">Confirm Bulk Action</p>
                  <p className="text-yellow-700">
                    This action will be applied to all selected items and cannot be undone.
                    Please review your selection carefully.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!action || (requiresReason && (!reason || !comments.trim()))}
            variant={selectedAction?.color === "destructive" ? "destructive" : "default"}
          >
            Apply to {selectedItems.length} Items
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}